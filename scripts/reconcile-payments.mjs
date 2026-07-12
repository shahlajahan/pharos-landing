#!/usr/bin/env node
/**
 * Manually (or CI-, or external-scheduler-)triggers payment reconciliation
 * by calling the protected /api/payment/reconcile route — the same route an
 * external scheduler (Firebase Cloud Scheduler / Google Cloud Scheduler)
 * would call on an interval. This script does not reimplement any
 * reconciliation logic itself; it is a thin authenticated HTTP client so
 * there is exactly one reconciliation code path (lib/payment/reconciliation.ts).
 *
 * Usage:
 *   CRON_SECRET=... SITE_URL=https://pharosteknoloji.com.tr node scripts/reconcile-payments.mjs
 *   CRON_SECRET=... SITE_URL=http://localhost:3000 node scripts/reconcile-payments.mjs
 */

async function main() {
  const secret = process.env.CRON_SECRET?.trim();
  const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");

  if (!secret) {
    console.error("Error: CRON_SECRET is required.");
    process.exit(1);
  }

  if (!siteUrl) {
    console.error("Error: SITE_URL (or NEXT_PUBLIC_SITE_URL) is required.");
    process.exit(1);
  }

  const response = await fetch(`${siteUrl}/api/payment/reconcile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
    },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    console.error(`Reconciliation request failed: HTTP ${response.status}`, body ?? "");
    process.exit(1);
  }

  console.log("Reconciliation complete:", JSON.stringify(body?.summary ?? body, null, 2));
  process.exit(0);
}

main().catch((error) => {
  console.error("Failed to run reconciliation:", error instanceof Error ? error.message : error);
  process.exit(1);
});
