import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { getServiceBySlug, services } from "../services";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Pharos Teknoloji",
  description: "Pharos Teknoloji service checkout and iyzico-ready payment flow.",
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

  const isSandbox =
    process.env.IYZICO_BASE_URL?.includes("sandbox");

  const params = await searchParams;

  const selectedService =
    getServiceBySlug(params?.service ?? "") ?? services[0];

  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden px-5 py-12 sm:px-6 lg:px-8">

        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />

        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[58rem]
          -translate-x-1/2 rounded-full
          bg-[radial-gradient(circle,rgba(49,165,127,0.2),rgba(30,116,176,0.12)_38%,transparent_70%)]
          blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">

          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Secure Checkout
          </p>

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