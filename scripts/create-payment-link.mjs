#!/usr/bin/env node
/**
 * Development/operator-only fixture for creating a deposit or private
 * payment-link record in Firestore. This is intentionally NOT an HTTP
 * endpoint — there is no authenticated admin UI in this project yet, so the
 * only safe way to create a payment link is to run this script locally (or
 * from a trusted CI/operator context) with real Firebase Admin credentials.
 *
 * Usage:
 *   FIREBASE_PROJECT_ID=... node scripts/create-payment-link.mjs \
 *     --type=deposit \
 *     --title="Proje Depozitosu - Örnek Ltd Şti" \
 *     --description="250.000 TRY proje toplamının ilk ödemesi (%20)" \
 *     --amount=50000 \
 *     --expires-days=14
 *
 * Requires the same GOOGLE_APPLICATION_CREDENTIALS / applicationDefault
 * setup as the running application (see lib/firebase-admin.ts).
 */

import admin from "firebase-admin";
import { randomBytes } from "node:crypto";

// Mirrors lib/payment/constants.ts — kept in sync manually since this
// standalone script cannot import TypeScript directly. Update both if this
// value ever changes.
const MAX_PAYMENT_AMOUNT = 10_000_000;
const DEFAULT_PAYMENT_LINK_EXPIRY_DAYS = 14;

function parseArgs(argv) {
  const args = {};

  for (const raw of argv) {
    const match = /^--([a-zA-Z-]+)=(.*)$/.exec(raw);

    if (match) {
      args[match[1]] = match[2];
    }
  }

  return args;
}

function generateReferenceId() {
  return randomBytes(18).toString("base64url");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const paymentType = args.type;
  const title = args.title;
  const amount = Number(args.amount);
  const description = args.description;
  const expiresDays = args["expires-days"] !== undefined ? Number(args["expires-days"]) : DEFAULT_PAYMENT_LINK_EXPIRY_DAYS;

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();

  if (!projectId) {
    console.error(
      "Error: FIREBASE_PROJECT_ID is required. Refusing to run against an implicit/ambient GCP project.",
    );
    process.exit(1);
  }

  if (paymentType !== "deposit" && paymentType !== "payment_link") {
    console.error('Error: --type must be "deposit" or "payment_link".');
    process.exit(1);
  }

  if (!title || !title.trim()) {
    console.error("Error: --title is required.");
    process.exit(1);
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    console.error("Error: --amount must be a positive number.");
    process.exit(1);
  }

  if (amount > MAX_PAYMENT_AMOUNT) {
    console.error(`Error: --amount exceeds the maximum allowed amount (${MAX_PAYMENT_AMOUNT}).`);
    process.exit(1);
  }

  if (!Number.isFinite(expiresDays) || expiresDays <= 0) {
    console.error("Error: --expires-days must be a positive number when supplied.");
    process.exit(1);
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId,
    });
  }

  const db = admin.firestore();
  const referenceId = generateReferenceId();
  const expiresAt = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000);

  await db
    .collection("paymentLinks")
    .doc(referenceId)
    .set({
      referenceId,
      paymentType,
      title: title.trim(),
      description: description?.trim() || null,
      amount,
      currency: "TRY",
      status: "active",
      expiresAt,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const path = `/pay/${referenceId}`;

  console.log("Payment link created.");
  console.log(`  referenceId: ${referenceId}`);
  console.log(`  projectId: ${projectId}`);
  console.log(`  expiresAt: ${expiresAt.toISOString()}`);
  console.log(`  url: ${siteUrl ? `${siteUrl}${path}` : path}`);

  process.exit(0);
}

main().catch((error) => {
  console.error("Failed to create payment link:", error instanceof Error ? error.message : error);
  process.exit(1);
});
