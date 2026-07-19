import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { getServiceBySlug } from "../services";
import { PayForm } from "./PayForm";

export const metadata: Metadata = {
  title: "Ödeme | Pharos Teknoloji",
  description: "Pharos Teknoloji hizmet satın alma ve güvenli ödeme akışı.",
  robots: {
    index: false,
    follow: false,
  },
};

type PayPageProps = {
  searchParams?: Promise<{
    service?: string;
  }>;
};

export default async function PayPage({ searchParams }: PayPageProps) {
  const params = await searchParams;
  const service = getServiceBySlug(params?.service ?? "");

  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.16),rgba(11,24,46,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <Badge tone="red">Güvenli Ödeme</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-6xl">Güvenli ödeme</h1>

          {service ? (
            <>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Seçilen hizmet için müşteri bilgilerinizi girin ve iyzico güvenli ödeme sayfasına geçin.
              </p>
              <PayForm
                paymentType="service"
                serviceSlug={service.slug}
                title={service.titleTr}
                description={service.titleEn}
                priceLabel={service.priceLabel}
                typeLabel="Hizmet Satın Alma"
              />
            </>
          ) : (
            <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
              <ShieldCheck size={28} className="mx-auto text-brand-red" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-semibold text-white">Ödeme bulunamadı.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Bir hizmet seçilmedi. Lütfen hizmetler bölümünden bir paket seçerek ödeme akışını başlatın.
              </p>
              <Button href="/#services" variant="primary" size="lg" className="mt-6">
                Hizmetleri görüntüle
              </Button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
