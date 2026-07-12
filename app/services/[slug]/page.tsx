import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Globe2,
  Rocket,
  Send,
  Smartphone,
} from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getServiceBySlug, services } from "../../services";

const serviceIcons = {
  code: Code2,
  mobile: Smartphone,
  web: Globe2,
  ai: Bot,
  product: Rocket,
};

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

  return {
    title: `${service.titleEn} | Pharos Teknoloji`,
    description: `${service.titleTr} hizmeti kapsamı, teslimat süreci ve ücretsiz ön görüşme ile teklif akışı.`,
    alternates: {
      canonical: `/services/${service.slug}`,
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
    <main className="min-h-screen bg-[#08111f] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.2),rgba(30,116,176,0.12)_38%,transparent_70%)] blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href="/#services"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Services
          </a>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
                <Icon size={25} aria-hidden="true" />
              </div>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                Service Detail
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
                {service.titleEn}
              </h1>
              <p className="mt-3 text-xl font-semibold text-emerald-100">{service.titleTr}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {service.description}
              </p>
            </div>

            <aside className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                Teklif / Quote
              </p>
              <div className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">Ücretsiz Ön Görüşme</p>
                <p className="mt-2 text-lg font-semibold text-white">Free Initial Consultation</p>
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.07] p-5">
                <p className="text-sm font-semibold text-slate-200">Delivery timeline</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{service.timeline}</p>
              </div>
              <a
                href={`/contact?service=${encodeURIComponent(service.titleEn)}`}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <Send size={17} aria-hidden="true" />
                Teklif Al / Request a Quote
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Kapsam görüşmesi sonrası size özel teklif ve zaman planı hazırlanır. / A scoped quote
                and timeline are prepared after a short discovery call.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eef4f8_0%,#ffffff_100%)] px-5 py-14 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-white bg-white/75 p-6 shadow-xl shadow-slate-300/25 backdrop-blur sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
              Included Features
            </p>
            <div className="mt-6 grid gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex gap-3 rounded-lg border border-slate-200 bg-white/80 p-4">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white bg-white/75 p-6 shadow-xl shadow-slate-300/25 backdrop-blur sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
              FAQ
            </p>
            <div className="mt-6 grid gap-4">
              {service.faq.map((item) => (
                <div key={item.question} className="rounded-lg border border-slate-200 bg-white/80 p-5">
                  <h2 className="text-base font-semibold text-slate-950">{item.question}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
