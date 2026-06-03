import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Building2, Mail, MapPin, Phone } from "lucide-react";
import { company } from "../company";
import { ContactForm } from "../components/ContactForm";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact | Pharos Teknoloji",
  description:
    "Pharos Teknoloji iletişim bilgileri, şirket adresi, MERSIS, vergi numarası ve proje iletişim formu.",
  alternates: {
    canonical: "/contact",
  },
};

const details = [
  { icon: Building2, label: "Company name", value: company.name },
  { icon: MapPin, label: "Address", value: company.address },
  { icon: Phone, label: "Phone", value: company.phone, href: company.phoneHref },
  { icon: Mail, label: "Email", value: company.email, href: company.emailHref },
  { icon: Building2, label: "MERSIS", value: company.mersis },
  { icon: Building2, label: "Tax number", value: company.taxNumber },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pt-8 pb-12 sm:px-6 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.18),rgba(30,116,176,0.12)_42%,transparent_72%)] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
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
              İletişim / Contact
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Pharos Teknoloji iletişim bilgileri
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Mobil uygulama, web çözümü, özel yazılım, yapay zeka veya dijital
              ürün geliştirme ihtiyaçlarınız için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="h-fit rounded-xl border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/15 sm:p-7">
            <div className="grid gap-3">
              {details.map((item) => {
                const Icon = item.icon;
                const content = item.href ? (
                  <a href={item.href} className="break-words transition hover:text-white">
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                );

                return (
                  <div key={item.label} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-slate-950">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-200">{content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <ContactForm
            variant="contact"
            className="rounded-xl border border-white/14 bg-white/10 p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:p-7"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
