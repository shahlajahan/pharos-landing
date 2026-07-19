import type { Metadata } from "next";
import { AlertCircle, CreditCard, Phone } from "lucide-react";
import { company } from "../company";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
  title: "Ödeme Başarısız | Pharos Teknoloji",
  description: "Pharos Teknoloji hizmet satın alımları için ödeme başarısızlık bildirimi.",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentFailedPageProps = {
  searchParams?: Promise<{
    ref?: string;
    reason?: string;
  }>;
};

export default async function PaymentFailedPage({ searchParams }: PaymentFailedPageProps) {
  const params = await searchParams;
  const reference = params?.ref?.trim();

  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-white text-brand-navy">
            <AlertCircle size={30} aria-hidden="true" />
          </div>
          <div className="mt-7">
            <Badge tone="red">Ödeme Başarısız</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Ödeme işlemi tamamlanamadı.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Kart bilgileri, banka onayı veya ödeme oturumu nedeniyle işlem başarısız olmuş olabilir. Tekrar deneyebilir veya ekibimizle iletişime geçebilirsiniz.
          </p>
          {reference ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-slate-300">
              Referans: <span className="font-mono text-white">{reference}</span>
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/checkout" variant="primary" size="lg">
              <CreditCard size={17} aria-hidden="true" />
              Ödemeyi tekrar dene
            </Button>
            <Button href={company.phoneHref} variant="secondary" size="lg" className="text-white">
              <Phone size={17} aria-hidden="true" />
              Destek al
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
