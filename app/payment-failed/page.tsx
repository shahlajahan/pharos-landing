import type { Metadata } from "next";
import { AlertCircle, CreditCard, Phone } from "lucide-react";
import { company } from "../company";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Payment Failed | Pharos Teknoloji",
  description: "Payment failed notice for Pharos Teknoloji service purchases.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden px-5 py-16 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-white text-slate-950">
            <AlertCircle size={30} aria-hidden="true" />
          </div>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Payment Failed
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Ödeme işlemi tamamlanamadı.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Kart bilgileri, banka onayı veya ödeme oturumu nedeniyle işlem başarısız olmuş olabilir. Tekrar deneyebilir veya ekibimizle iletişime geçebilirsiniz.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/checkout"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <CreditCard size={17} aria-hidden="true" />
              Ödemeyi tekrar dene
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
