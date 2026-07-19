import type { Metadata } from "next";
import { CheckCircle2, ClipboardCheck, ReceiptText } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
  title: "Ödeme Başarılı | Pharos Teknoloji",
  description: "Pharos Teknoloji hizmet satın alımları için ödeme başarı onayı.",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentSuccessPageProps = {
  searchParams?: Promise<{
    ref?: string;
  }>;
};

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = await searchParams;
  const reference = params?.ref?.trim();

  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-success text-brand-navy-deep">
            <CheckCircle2 size={30} aria-hidden="true" />
          </div>

          <div className="mt-7">
            <Badge tone="success">Ödeme Başarılı</Badge>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Ödemeniz başarıyla alındı.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Satın alma işlemi tamamlandı. Fatura, sözleşme ve proje kickoff adımları için ekibimiz sizinle
            iletişime geçecektir.
          </p>

          {reference ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-slate-300">
              Referans: <span className="font-mono text-white">{reference}</span>
            </p>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 text-left">
              <ReceiptText size={20} className="text-success" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-white">Fatura süreci</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">Satın alma için fatura düzenlenir.</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 text-left">
              <ClipboardCheck size={20} className="text-success" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-white">Proje kickoff</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Ödeme sonrası teslim planı başlatılır.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/" variant="primary" size="lg">
              Ana sayfaya dön
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="text-white">
              Destek al
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
