import admin from "firebase-admin";
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

let initError: Error | null = null;

function getDefaultAdcPath(): string | null {
    if (process.platform === "win32") {
        return process.env.APPDATA ? join(process.env.APPDATA, "gcloud", "application_default_credentials.json") : null;
    }

    return join(homedir(), ".config", "gcloud", "application_default_credentials.json");
}

function readCredentialFileType(path: string): string | null {
    try {
        const parsed = JSON.parse(readFileSync(path, "utf8")) as { type?: string };
        return typeof parsed.type === "string" ? parsed.type : null;
    } catch {
        return null;
    }
}

/**
 * Best-effort, secret-free description of which credential applicationDefault()
 * will actually use — reads only the non-secret "type" field of a credential
 * file, never its contents. For the startup log only; never used for
 * authorization decisions.
 */
function describeCredentialSource(): string {
    const explicitPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (explicitPath) {
        const type = existsSync(explicitPath) ? readCredentialFileType(explicitPath) : null;
        return type ? `${type} (GOOGLE_APPLICATION_CREDENTIALS)` : "GOOGLE_APPLICATION_CREDENTIALS (unreadable)";
    }

    const adcPath = getDefaultAdcPath();

    if (adcPath && existsSync(adcPath)) {
        const type = readCredentialFileType(adcPath);
        return type ? `${type} (gcloud application-default login)` : "gcloud ADC file (unknown type)";
    }

    return "metadata server / workload identity (implicit compute credentials)";
}

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId) {
        // Fail fast: never fall back to whatever project the ambient
        // credential/gcloud CLI happens to be scoped to (see memory:
        // firestore-graceful-degradation — this was a real incident where
        // payments were silently persisted to an unrelated GCP project).
        initError = new Error(
            "FIREBASE_PROJECT_ID is not set. Refusing to initialize Firebase Admin against an implicit/ambient GCP project.",
        );
    } else {
        try {
            let credential: admin.credential.Credential;
            let credentialSource: string;

            if (clientEmail && rawPrivateKey) {
                // Prefer an explicit service account whenever one is fully
                // configured — this gives the Firestore client a real,
                // directly-usable credential instead of deferring to
                // applicationDefault()'s lazy, environment-dependent ADC
                // discovery (which has no metadata server to find on
                // non-GCP hosts like Vercel — see prior investigation).
                credential = admin.credential.cert({
                    projectId,
                    clientEmail,
                    // Env vars can't carry real newlines — service-account
                    // private keys are commonly stored with literal "\n"
                    // sequences that must be restored before the PEM key
                    // can be parsed.
                    privateKey: rawPrivateKey.replace(/\\n/g, "\n"),
                });
                credentialSource = "service-account (FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY)";
            } else {
                // Falls back to applicationDefault() only when a full
                // service account isn't configured — a service account via
                // GOOGLE_APPLICATION_CREDENTIALS in production, a
                // developer's `gcloud auth application-default login`
                // locally, or compute metadata credentials on GCP
                // infrastructure. The explicit projectId below always wins
                // over whatever project that credential would otherwise
                // resolve to.
                credential = admin.credential.applicationDefault();
                credentialSource = describeCredentialSource();
            }

            admin.initializeApp({
                credential,
                projectId,
            });

            const db = admin.firestore();

            console.log("FIREBASE_ADMIN_INITIALIZED", {
                projectId,
                credentialSource,
                firestoreDatabase: db.databaseId,
            });
        } catch (error) {
            initError = error instanceof Error ? error : new Error(String(error));
        }
    }

    if (initError) {
        console.error("FIREBASE_ADMIN_INIT_FAILED", { message: initError.message });
    }
}

/**
 * Returns a Firestore handle, or null if Firebase Admin could not be
 * initialized (e.g. missing FIREBASE_PROJECT_ID or credentials). Callers
 * must treat Firestore as a best-effort persistence layer, never as the
 * source of truth for payment authorization — see lib/payment/repository.ts.
 */
export function getFirestoreDb(): admin.firestore.Firestore | null {
    if (initError) {
        console.error("FIREBASE_ADMIN_INIT_FAILED", { message: initError.message });
        return null;
    }

    try {
        return admin.firestore();
    } catch (error) {
        console.error("FIREBASE_ADMIN_FIRESTORE_UNAVAILABLE", {
            message: error instanceof Error ? error.message : String(error),
        });
        return null;
    }
}

export { admin };
