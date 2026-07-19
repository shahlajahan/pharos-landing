import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "../../services";
import { serviceIcons } from "./service-icons";
import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function ServicesGrid() {
  return (
    <section id="services" className="relative bg-brand-paper py-24 text-brand-navy sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Badge tone="red">Hizmetler</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Başlangıç noktaları, hikâyenin tamamı değil.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Bunlar yukarıda anlatılan mühendislik ortaklığına açılan sabit kapsamlı giriş
              noktalarıdır — daha büyük bir kapsamı planlamadan önce birlikte çalışmaya başlamanın
              pratik bir yolu.{" "}
              <Link href="/#capabilities" className="font-semibold text-brand-red-strong hover:underline">
                Tüm yetkinlik setini görün →
              </Link>
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.slug} delay={(index % 5) * 0.06} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-xl">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red-strong via-brand-red to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-navy text-white shadow-lg shadow-black/10">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{service.titleTr}</h3>
                  <p className="mt-4 rounded-lg border border-brand-red/20 bg-brand-red-soft px-3 py-2 text-sm font-bold text-brand-red-strong">
                    Ücretsiz Ön Görüşme
                  </p>
                  <div className="mt-4 flex flex-1 flex-col gap-3">
                    <p className="text-sm leading-6 text-slate-600">{service.summaryTr}</p>
                  </div>
                  <div className="mt-5 grid gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-brand-navy shadow-sm transition hover:-translate-y-0.5 hover:border-brand-red/30"
                    >
                      Detayları Gör
                    </Link>
                    <Button
                      href={`/contact?service=${encodeURIComponent(service.titleEn)}`}
                      variant="primary"
                      size="md"
                    >
                      Teklif Al
                      <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
