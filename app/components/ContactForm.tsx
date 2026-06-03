"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Cpu, Globe2, Phone, Send } from "lucide-react";
import { company } from "../company";

const serviceOptions = [
  "Custom Software Development",
  "Mobile App Development",
  "Web Solutions",
  "AI Solutions",
  "Digital Product Development",
];

const budgetOptions = [
  "Under ₺25.000",
  "₺25.000–₺50.000",
  "₺50.000–₺100.000",
  "₺100.000+",
];

type ContactFormProps = {
  variant?: "home" | "contact";
  className?: string;
};

export function ContactForm({ variant = "home", className = "" }: ContactFormProps) {
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleServiceSelect(event: Event) {
      const service = (event as CustomEvent<string>).detail;

      if (serviceOptions.includes(service)) {
        setSelectedService(service);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");

    if (service && serviceOptions.includes(service)) {
      setSelectedService(service);
    }

    window.addEventListener("pharos:service-select", handleServiceSelect);

    return () => {
      window.removeEventListener("pharos:service-select", handleServiceSelect);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
    setSelectedService(serviceOptions[0]);
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className={className}
    >
      {variant === "home" ? (
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-slate-950">
              <Globe2 size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Pharos Teknoloji</p>
              <p className="text-xs text-slate-400">Istanbul / Global delivery</p>
            </div>
          </div>
          <Cpu className="text-emerald-300" size={22} aria-hidden="true" />
        </div>
      ) : (
        <div className="mb-7 border-b border-white/10 pb-5">
          <p className="text-sm font-semibold text-white">Contact form</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Proje kapsamınızı, hedef platformları ve ihtiyaç duyduğunuz
            zamanlamayı paylaşabilirsiniz.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Ad Soyad / Name
          </span>
          <input
            name="name"
            required
            className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
            placeholder="Adınız"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            E-posta / Email
          </span>
          <input
            type="email"
            name="email"
            required
            className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
            placeholder="you@company.com"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Telefon / Phone
          </span>
          <input
            name="phone"
            className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
            placeholder="+90"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Hizmet / Service
          </span>
          <select
            name="service"
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
            className="h-12 rounded-lg border border-white/12 bg-[#162437] px-4 text-sm text-white outline-none transition focus:border-emerald-300/60"
          >
            {serviceOptions.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Proje Bütçesi / Project Budget
          </span>
          <select
            name="budget"
            required
            defaultValue=""
            className="h-12 rounded-lg border border-white/12 bg-[#162437] px-4 text-sm text-white outline-none transition focus:border-emerald-300/60"
          >
            <option value="" disabled>
              Bütçe aralığı seçin
            </option>
            {budgetOptions.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            {variant === "home" ? "Proje Notu / Project Brief" : "Mesaj / Message"}
          </span>
          <textarea
            name="message"
            rows={variant === "home" ? 4 : 5}
            required
            className="resize-none rounded-lg border border-white/12 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
            placeholder="Ne geliştirmek istiyorsunuz?"
          />
        </label>
      </div>

      {variant === "home" ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
              <Phone size={21} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400">Telefon / Phone</p>
              <a href={company.phoneHref} className="mt-2 block text-2xl font-semibold">
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {submitted ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            Talebiniz alındı. Ekibimiz teklif ile sizinle iletişime geçecektir.
            <span className="mt-1 block text-emerald-100/80">
              Your request has been received. Our team will contact you with a proposal.
            </span>
          </p>
        </div>
      ) : null}

      <div className={variant === "home" ? "mt-5 flex flex-col gap-3 sm:flex-row" : "mt-6"}>
        <button
          type="submit"
          className={variant === "home"
            ? "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            : "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"}
        >
          <Send size={17} aria-hidden="true" />
          Gönder / Send
        </button>
        {variant === "home" ? (
          <a
            href={company.phoneHref}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/6 px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Phone size={17} aria-hidden="true" />
            Hemen ara
          </a>
        ) : null}
      </div>
      <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-xs leading-5 text-slate-400">
        Proje onayından sonra güvenli ödeme bağlantısı paylaşılır.
        <span className="block text-slate-500">
          Secure payment link is shared after project approval.
        </span>
      </p>
    </form>
  );
}
