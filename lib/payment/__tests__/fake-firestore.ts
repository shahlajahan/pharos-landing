/**
 * Minimal in-memory Firestore test double implementing exactly the surface
 * lib/payment/repository.ts and lib/payment/payment-links.ts use:
 * collection().doc().get()/.set(), collection().where().where().limit().get(),
 * and runTransaction(). Not a general-purpose Firestore emulator — just
 * enough to test our own idempotency/query logic deterministically without
 * a real Firebase project.
 */

export class FakeTimestamp {
    constructor(public readonly millis: number) {}

    toDate() {
        return new Date(this.millis);
    }

    static now() {
        return new FakeTimestamp(Date.now());
    }

    static fromMillis(millis: number) {
        return new FakeTimestamp(millis);
    }
}

const SERVER_TIMESTAMP = Symbol("serverTimestamp");

function resolveWriteValue(value: unknown): unknown {
    if (value === SERVER_TIMESTAMP) {
        return FakeTimestamp.now();
    }

    return value;
}

function resolveWriteData(data: Record<string, unknown>): Record<string, unknown> {
    const resolved: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
        resolved[key] = resolveWriteValue(value);
    }

    return resolved;
}

export class FakeFirestore {
    private readonly collections = new Map<string, Map<string, Record<string, unknown>>>();

    private getCollection(name: string): Map<string, Record<string, unknown>> {
        if (!this.collections.has(name)) {
            this.collections.set(name, new Map());
        }

        return this.collections.get(name)!;
    }

    /** Test-only helper to seed a document directly. */
    seed(collectionName: string, id: string, data: Record<string, unknown>) {
        this.getCollection(collectionName).set(id, resolveWriteData(data));
    }

    /** Test-only helper to inspect a document directly. */
    peek(collectionName: string, id: string): Record<string, unknown> | undefined {
        return this.getCollection(collectionName).get(id);
    }

    collection(name: string) {
        const store = this.getCollection(name);

        const makeDocRef = (id: string) => ({
            id,
            async get() {
                const data = store.get(id);
                return {
                    exists: data !== undefined,
                    data: () => (data ? { ...data } : undefined),
                };
            },
            async set(data: Record<string, unknown>) {
                store.set(id, resolveWriteData(data));
            },
            async update(data: Record<string, unknown>) {
                const existing = store.get(id) ?? {};
                store.set(id, { ...existing, ...resolveWriteData(data) });
            },
        });

        const makeQuery = (filters: Array<(doc: Record<string, unknown>) => boolean>, limitCount?: number) => ({
            where(field: string, op: string, value: unknown) {
                const filterFn = (doc: Record<string, unknown>) => {
                    const docValue = doc[field];

                    if (op === "==") return docValue === value;
                    if (op === "<=") {
                        const a = docValue instanceof FakeTimestamp ? docValue.millis : docValue;
                        const b = value instanceof FakeTimestamp ? value.millis : value;
                        return typeof a === "number" && typeof b === "number" && a <= b;
                    }

                    throw new Error(`Unsupported operator in fake firestore: ${op}`);
                };

                return makeQuery([...filters, filterFn], limitCount);
            },
            limit(n: number) {
                return makeQuery(filters, n);
            },
            async get() {
                let docs = Array.from(store.entries())
                    .filter(([, data]) => filters.every((f) => f(data)))
                    .map(([id, data]) => ({ id, data: () => ({ ...data }) }));

                if (limitCount !== undefined) {
                    docs = docs.slice(0, limitCount);
                }

                return { empty: docs.length === 0, docs };
            },
        });

        return {
            doc: makeDocRef,
            where(field: string, op: string, value: unknown) {
                return makeQuery([], undefined).where(field, op, value);
            },
        };
    }

    async runTransaction<T>(fn: (tx: FakeTransaction) => Promise<T>): Promise<T> {
        const tx: FakeTransaction = {
            get: async (ref) => ref.get(),
            update: (ref, data) => {
                // Synchronous-looking but backed by the same async doc store;
                // safe because our fake store's writes are synchronous under the hood.
                void ref.update(data);
            },
            set: (ref, data) => {
                void ref.set(data);
            },
        };

        return fn(tx);
    }
}

export interface FakeTransaction {
    get(ref: ReturnType<FakeFirestore["collection"]>["doc"] extends (id: string) => infer R ? R : never): Promise<{
        exists: boolean;
        data: () => Record<string, unknown> | undefined;
    }>;
    update(ref: ReturnType<ReturnType<FakeFirestore["collection"]>["doc"]>, data: Record<string, unknown>): void;
    set(ref: ReturnType<ReturnType<FakeFirestore["collection"]>["doc"]>, data: Record<string, unknown>): void;
}

/** Fake replacement for the `admin` export of lib/firebase-admin.ts. */
export function createFakeAdmin() {
    return {
        firestore: Object.assign(() => {}, {
            FieldValue: { serverTimestamp: () => SERVER_TIMESTAMP },
            Timestamp: FakeTimestamp,
        }),
    };
}
