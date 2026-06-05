"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import type { Service } from "../services";

type CheckoutFormProps = {
  selectedService: Service;
};

type PaymentCreateResponse = {
  token?: string;
  checkoutFormContent?: string;
  checkoutPageUrl?: string;
  paymentPageUrl?: string;
  error?: string;
};

const missingCredentialsError = "Iyzico credentials are not configured";
const missingCredentialsMessage =
  "Ödeme altyapısı yapılandırması eksik. Lütfen site yöneticisi ile iletişime geçin.";

export function CheckoutForm({ selectedService }: CheckoutFormProps) {
  const checkoutContentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkoutFormContent, setCheckoutFormContent] = useState("");

  useEffect(() => {
    const container = checkoutContentRef.current;

    if (!container || !checkoutFormContent) {
      return;
    }

    container.innerHTML = checkoutFormContent;
    const scripts = Array.from(container.querySelectorAll("script"));

    scripts.forEach((script) => {
      const executableScript = document.createElement("script");

      Array.from(script.attributes).forEach((attribute) => {
        executableScript.setAttribute(attribute.name, attribute.value);
      });

      executableScript.textContent = script.textContent;
      script.replaceWith(executableScript);
    });

    return () => {
      container.innerHTML = "";
    };
  }, [checkoutFormContent]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setCheckoutFormContent("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service: {
          id: selectedService.slug,
          name: selectedService.titleEn,
          price: selectedService.price,
        },
        buyer: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          company: String(formData.get("company") ?? ""),
          billingAddress: String(formData.get("billingAddress") ?? ""),
        },
      }),
    });

    const result = (await response.json()) as PaymentCreateResponse;

    if (!response.ok) {
      setErrorMessage(
        result.error === missingCredentialsError
          ? missingCredentialsMessage
          : result.error ?? "Ödeme başlatılamadı."
      );
      setIsSubmitting(false);
      return;
    }

    const checkoutUrl = result.checkoutPageUrl ?? result.paymentPageUrl;

    if (checkoutUrl) {
      window.location.assign(checkoutUrl);
      return;
    }

    if (result.checkoutFormContent) {
      setCheckoutFormContent(result.checkoutFormContent);
      setIsSubmitting(false);
      return;
    }

    setErrorMessage("iyzico ödeme sayfası bilgisi alınamadı.");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        <h2 className="text-xl font-semibold text-white">Customer information</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Ad Soyad / Name
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="Adınız"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              E-posta / Email
            </span>
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
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
              autoComplete="tel"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="+90"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Şirket / Company
            </span>
            <input
              name="company"
              autoComplete="organization"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="Şirket ünvanı"
            />
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Fatura Adresi / Billing Address
            </span>
            <textarea
              name="billingAddress"
              rows={4}
              autoComplete="street-address"
              className="resize-none rounded-lg border border-white/12 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="Fatura adresi ve vergi bilgileri"
            />
          </label>
        </div>
      </section>

      <aside className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        <h2 className="text-xl font-semibold text-white">Order summary</h2>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.07] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Selected service
          </p>
          <p className="mt-2 text-lg font-semibold text-white">{selectedService.titleEn}</p>
          <p className="mt-1 text-sm text-slate-400">{selectedService.titleTr}</p>
        </div>
        <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-5">
          <p className="text-sm font-semibold text-emerald-100">Price</p>
          <p className="mt-2 text-4xl font-semibold text-white">{selectedService.priceLabel}</p>
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.07] p-5">
          <p className="text-sm font-semibold text-slate-200">Delivery process</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Ödeme sonrası sözleşme, fatura bilgileri ve kickoff planı tamamlanır. {selectedService.timeline}
          </p>
        </div>

        <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.07] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-slate-950">
              <LockKeyhole size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Secure payment section</h2>
              <p className="text-xs text-slate-400">iyzico secure hosted checkout</p>
            </div>
          </div>
          <Image
            src="/payments/iyzico-logo-band-colored.svg"
            alt="iyzico secure payment methods"
            width={429}
            height={32}
            className="mt-5 h-8 w-full max-w-[429px] rounded-md bg-white object-contain object-center"
          />
          <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
            <div className="flex gap-3">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-200" aria-hidden="true" />
              <p className="text-sm leading-6 text-emerald-100">
                Ödeme bilgileri iyzico güvenli ödeme sayfasında alınır.
              </p>
            </div>
          </div>
          {checkoutFormContent ? (
            <div className="mt-5 rounded-lg border border-white/10 bg-white p-3 text-slate-950">
              <div id="iyzipay-checkout-form" className="responsive" />
              <div ref={checkoutContentRef} />
            </div>
          ) : null}
          {errorMessage ? (
            <p className="mt-4 rounded-lg border border-red-300/20 bg-red-400/10 p-3 text-sm leading-6 text-red-100">
              {errorMessage}
            </p>
          ) : null}
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          <CreditCard size={17} aria-hidden="true" />
          {isSubmitting ? "Ödeme başlatılıyor" : "Satın Al"}
        </button>
      </aside>
    </form>
  );
}
