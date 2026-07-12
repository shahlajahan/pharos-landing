import type { Metadata } from "next";
import { Phone, ReceiptText } from "lucide-react";
import { company } from "../company";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Payment Verification Pending | Pharos Teknoloji",
  description: "Payment verification in progress for Pharos Teknoloji purchases.",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentPendingPageProps = {
  searchParams?: Promise<{
    ref?: string;
  }>;
};

export default async function PaymentPendingPage({ searchParams }: PaymentPendingPageProps) {
  const params = await searchParams;
  const reference = params?.ref?.trim();

  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden px-5 py-16 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-amber-400 text-slate-950">
            <ReceiptText size={30} aria-hidden="true" />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-amber-300">
            Payment Verification Pending
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Ödemeniz doğrulanıyor.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Ödeme sağlayıcımızdan kesin sonucu almakta gecikme yaşıyoruz. Kartınızdan bir tahsilat
            yapılmış olabilir; ekibimiz sonucu kısa süre içinde doğrulayıp sizinle iletişime geçecektir.
            Bu sayfayı tekrar ödeme yapmadan kapatabilirsiniz.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            We are still confirming your payment result with our provider. If a charge was made, our
            team will verify it and follow up shortly — there is no need to retry the payment.
          </p>

          {reference ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-slate-300">
              Referans / Reference: <span className="font-mono text-white">{reference}</span>
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-400 px-6 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Ana sayfaya dön
            </a>
            <a
              href={company.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/6 px-6 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <Phone size={17} aria-hidden="true" />
              Destek al
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
