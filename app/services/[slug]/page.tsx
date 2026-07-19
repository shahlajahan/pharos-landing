import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { Reveal } from "../../components/motion/Reveal";
import { Button } from "../../components/ui/Button";
import { getServiceBySlug, services } from "../../services";
import { serviceIcons } from "../../components/home/service-icons";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const description = `${service.titleTr} hizmeti kapsamı, teslimat süreci ve ücretsiz ön görüşme ile teklif akışı.`;

  return {
    title: `${service.titleTr} | Pharos Teknoloji`,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.titleTr} | Pharos Teknoloji`,
      description,
      url: `/services/${service.slug}`,
      siteName: "Pharos Teknoloji",
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[service.icon];

  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.16),rgba(11,24,46,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/#services"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Hizmetler
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-red-strong text-white">
                <Icon size={25} aria-hidden="true" />
              </div>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-red-200">
                Hizmet Detayı
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
                {service.titleTr}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {service.description}
              </p>
              <p className="mt-6 text-sm leading-6 text-slate-400">
                Bu, daha geniş bir mühendislik ortaklığı içindeki başlangıç adımlarından biridir.{" "}
                <Link href="/#capabilities" className="font-semibold text-red-200 hover:underline">
                  Dokuz yetkinliğin tamamını görün →
                </Link>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-200">
                  Teklif
                </p>
                <div className="mt-5 rounded-xl border border-brand-red/25 bg-brand-red-soft/10 p-5">
                  <p className="text-sm font-semibold text-red-100">Ücretsiz Ön Görüşme</p>
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.07] p-5">
                  <p className="text-sm font-semibold text-slate-200">Teslim süresi</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{service.timeline}</p>
                </div>
                <Button
                  href={`/contact?service=${encodeURIComponent(service.titleEn)}`}
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full"
                >
                  <Send size={17} aria-hidden="true" />
                  Teklif Al
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Kapsam görüşmesi sonrası size özel teklif ve zaman planı hazırlanır.
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eef4f8_0%,#ffffff_100%)] px-5 py-14 text-brand-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Kapsanan Özellikler
            </p>
            <div className="mt-6 grid gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand-red-strong" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">Sıkça Sorulan Sorular</p>
            <div className="mt-6 grid gap-4">
              {service.faq.map((item) => (
                <div key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h2 className="text-base font-semibold text-brand-navy">{item.question}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
