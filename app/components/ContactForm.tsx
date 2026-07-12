"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Cpu, Globe2, Phone, Send } from "lucide-react";
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

type ContactApiResponse = {
  success: boolean;
  error?: string;
};

type SubmitStatus = "idle" | "success" | "error";

export function ContactForm({ variant = "home", className = "" }: ContactFormProps) {
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Guards against a second submit firing (double-click, Enter-key repeat)
    // while the first request is still in flight.
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          service: selectedService,
          budget: String(formData.get("budget") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(result.error ?? "Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      // Only clear the form after a confirmed successful write.
      form.reset();
      setSelectedService(serviceOptions[0]);
      setSubmitStatus("success");
      setIsSubmitting(false);
    } catch {
      setErrorMessage("Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
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
            maxLength={200}
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
            maxLength={254}
            className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
            placeholder="you@company.com"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Telefon / Phone <span className="normal-case text-slate-500">(opsiyonel)</span>
          </span>
          <input
            name="phone"
            maxLength={20}
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
            Proje Bütçesi / Project Budget <span className="normal-case text-slate-500">(opsiyonel)</span>
          </span>
          <select
            name="budget"
            defaultValue=""
            className="h-12 rounded-lg border border-white/12 bg-[#162437] px-4 text-sm text-white outline-none transition focus:border-emerald-300/60"
          >
            <option value="">Bütçe aralığı seçin (opsiyonel)</option>
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
            maxLength={5000}
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

      {submitStatus === "success" ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            Talebiniz alındı. Ekibimiz kapsamı değerlendirip size özel bir teklifle geri dönecektir.
            <span className="mt-1 block text-emerald-100/80">
              Your request has been received. Our team will follow up with a tailored quote.
            </span>
          </p>
        </div>
      ) : null}

      {submitStatus === "error" ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-300/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            {errorMessage || "Mesajınız gönderilemedi. Lütfen tekrar deneyin."}
            <span className="mt-1 block text-red-100/80">
              Your message could not be sent. Please try again.
            </span>
          </p>
        </div>
      ) : null}

      <div className={variant === "home" ? "mt-5 flex flex-col gap-3 sm:flex-row" : "mt-6"}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            (variant === "home"
              ? "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              : "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300") +
            " disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          }
        >
          <Send size={17} aria-hidden="true" />
          {isSubmitting ? "Gönderiliyor... / Sending..." : "Gönder / Send"}
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
        Talebiniz sonrası ekibimiz kapsamı değerlendirip size özel bir teklif ve güvenli ödeme bağlantısı iletecektir.
        <span className="block text-slate-500">
          Our team reviews your request and follows up with a tailored quote and a secure payment link.
        </span>
      </p>
    </form>
  );
}
