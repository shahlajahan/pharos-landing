import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { company } from "../company";
import { SiteFooter } from "./SiteFooter";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt?: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  description,
  updatedAt = "3 Haziran 2026",
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pt-8 pb-12 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.18),rgba(30,116,176,0.12)_42%,transparent_72%)] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3" aria-label="Pharos Teknoloji ana sayfa">
              <Image src="/logo.png" alt="Pharos Teknoloji logo" width={46} height={46} className="h-11 w-11 rounded-lg" />
              <span className="text-sm font-semibold tracking-[0.14em] uppercase text-white">
                Pharos
              </span>
            </a>
            <a
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/12 bg-white/6 px-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Ana sayfa
            </a>
          </div>

          <div className="mt-14 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
              Yasal Bilgilendirme
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
            <p className="mt-4 text-sm text-slate-500">Son güncelleme: {updatedAt}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[15rem_1fr]">
          <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.05] p-5 text-sm leading-7 text-slate-300 lg:sticky lg:top-6">
            <p className="font-semibold text-white">{company.name}</p>
            <p className="mt-3">{company.address}</p>
            <p className="mt-3">
              <a href={company.phoneHref} className="transition hover:text-white">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={company.emailHref} className="break-words transition hover:text-white">
                {company.email}
              </a>
            </p>
            <p className="mt-3">MERSIS: {company.mersis}</p>
            <p>Vergi No: {company.taxNumber}</p>
          </aside>

          <div className="space-y-5">
            {sections.map((section) => (
              <article key={section.heading} className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/15 sm:p-7">
                <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                    {paragraph}
                  </p>
                ))}
                {section.items ? (
                  <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300 sm:text-base">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
