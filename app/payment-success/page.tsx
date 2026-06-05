import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { PaymentSuccessVerifier } from "./PaymentSuccessVerifier";

export const metadata: Metadata = {
  title: "Payment Successful | Pharos Teknoloji",
  description: "Payment success confirmation for Pharos Teknoloji service purchases.",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentSuccessPageProps = {
  searchParams?: Promise<{
    token?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const token = params?.token?.trim() ?? "";

  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden px-5 py-16 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <PaymentSuccessVerifier token={token} />
      </section>

      <SiteFooter />
    </main>
  );
}
