import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
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
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden px-5 py-12 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.2),rgba(30,116,176,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">Secure Payment</p>
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
                typeLabel="Hizmet Satın Alma / Service Purchase"
              />
            </>
          ) : (
            <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
              <ShieldCheck size={28} className="mx-auto text-emerald-200" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-semibold text-white">Ödeme bulunamadı.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Bir hizmet seçilmedi. Lütfen hizmetler bölümünden bir paket seçerek ödeme akışını başlatın.
              </p>
              <a
                href="/#services"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-emerald-400 px-6 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Hizmetleri görüntüle
              </a>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
