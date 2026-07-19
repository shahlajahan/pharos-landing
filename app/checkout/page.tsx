import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Badge } from "../components/ui/Badge";
import { getServiceBySlug, services } from "../services";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Ödeme | Pharos Teknoloji",
  description: "Pharos Teknoloji hizmet satın alma ve iyzico ile güvenli ödeme akışı.",
  alternates: {
    canonical: "/checkout",
  },
};

type CheckoutPageProps = {
  searchParams?: Promise<{
    service?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;

  const selectedService =
    getServiceBySlug(params?.service ?? "") ?? services[0];

  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />

        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[58rem]
          -translate-x-1/2 rounded-full
          bg-[radial-gradient(circle,rgba(233,27,48,0.16),rgba(11,24,46,0.12)_38%,transparent_70%)]
          blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <Badge tone="red">Güvenli Ödeme</Badge>

          <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-6xl">
            Satın alma ve ödeme akışı
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Seçilen hizmet, sabit başlangıç fiyatı, müşteri bilgileri, sipariş özeti ve iyzico ödeme entegrasyonu için hazır alanlar aşağıda gösterilir.
          </p>

          <CheckoutForm selectedService={selectedService} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
