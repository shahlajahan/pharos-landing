"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import type { CustomerType, PaymentType } from "@/lib/payment/types";

type PayFormProps = {
  paymentType: PaymentType;
  serviceSlug?: string;
  referenceId?: string;
  title: string;
  description?: string;
  priceLabel: string;
  typeLabel: string;
};

type PaymentInitializeResponse = {
  success: boolean;
  token?: string;
  checkoutFormContent?: string;
  paymentPageUrl?: string;
  error?: string;
};

const IDENTITY_FIELD_CONFIG: Record<
  CustomerType,
  { label: string; placeholder: string; inputMode: "numeric" | "text" }
> = {
  tr_individual: {
    label: "TC Kimlik No",
    placeholder: "11 haneli TC kimlik numarası",
    inputMode: "numeric",
  },
  foreign_individual: {
    label: "Pasaport / Kimlik No — Passport / ID number",
    placeholder: "Pasaport numaranız",
    inputMode: "text",
  },
  company: {
    label: "Vergi Numarası — Tax ID",
    placeholder: "10 haneli vergi numarası",
    inputMode: "numeric",
  },
};

export function PayForm({
  paymentType,
  serviceSlug,
  referenceId,
  title,
  description,
  priceLabel,
  typeLabel,
}: PayFormProps) {
  const checkoutContentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkoutFormContent, setCheckoutFormContent] = useState("");
  const [customerType, setCustomerType] = useState<CustomerType>("tr_individual");

  const identityField = IDENTITY_FIELD_CONFIG[customerType];

  useEffect(() => {
    const container = checkoutContentRef.current;

    if (!container || !checkoutFormContent) {
      return;
    }

    // iyzico's embedded Checkout Form returns an HTML snippet containing a
    // <script> tag that must execute to render the payment form — this is
    // iyzico's own documented embedded-checkout integration pattern, not
    // arbitrary third-party content. The response comes from our own
    // server-to-server, HMAC-authenticated call to iyzico (never from user
    // input), and only ever reaches the submitting customer's own browser
    // in direct response to their own request.
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
    const identityNumber = String(formData.get("identityNumber") ?? "").trim();

    const response = await fetch("/api/payment/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentType,
        ...(serviceSlug ? { serviceSlug } : {}),
        ...(referenceId ? { referenceId } : {}),
        customer: {
          customerType,
          firstName: String(formData.get("firstName") ?? ""),
          lastName: String(formData.get("lastName") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          address: String(formData.get("address") ?? ""),
          city: String(formData.get("city") ?? ""),
          country: String(formData.get("country") ?? ""),
          zipCode: String(formData.get("zipCode") ?? ""),
          identityNumber,
        },
      }),
    });

    const result = (await response.json()) as PaymentInitializeResponse;

    if (!response.ok || !result.success) {
      setErrorMessage(result.error ?? "Ödeme başlatılamadı.");
      setIsSubmitting(false);
      return;
    }

    if (result.paymentPageUrl) {
      window.location.assign(result.paymentPageUrl);
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
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Müşteri Tipi / Customer Type
            </span>
            <select
              name="customerType"
              value={customerType}
              onChange={(event) => setCustomerType(event.target.value as CustomerType)}
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition focus:border-emerald-300/60 focus:bg-white/[0.12]"
            >
              <option value="tr_individual" className="bg-slate-900">
                TC Vatandaşı / Turkish Individual
              </option>
              <option value="foreign_individual" className="bg-slate-900">
                Yabancı Uyruklu / Foreign Individual
              </option>
              <option value="company" className="bg-slate-900">
                Şirket / Company
              </option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Ad / First name
            </span>
            <input
              name="firstName"
              required
              autoComplete="given-name"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="Adınız"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Soyad / Last name
            </span>
            <input
              name="lastName"
              required
              autoComplete="family-name"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="Soyadınız"
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
              required
              autoComplete="tel"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="+90"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {identityField.label}
            </span>
            <input
              name="identityNumber"
              required
              inputMode={identityField.inputMode}
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder={identityField.placeholder}
            />
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Fatura Adresi / Billing Address
            </span>
            <textarea
              name="address"
              required
              rows={3}
              autoComplete="street-address"
              className="resize-none rounded-lg border border-white/12 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="Fatura adresi ve vergi bilgileri"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Şehir / City
            </span>
            <input
              name="city"
              required
              autoComplete="address-level2"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="İstanbul"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Posta Kodu / Zip Code
            </span>
            <input
              name="zipCode"
              required
              autoComplete="postal-code"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
              placeholder="34000"
            />
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Ülke / Country
            </span>
            <input
              name="country"
              required
              defaultValue="Türkiye"
              autoComplete="country-name"
              className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
            />
          </label>
        </div>
      </section>

      <aside className="rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        <h2 className="text-xl font-semibold text-white">Order summary</h2>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.07] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{typeLabel}</p>
          <p className="mt-2 text-lg font-semibold text-white">{title}</p>
          {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
        </div>
        <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-5">
          <p className="text-sm font-semibold text-emerald-100">Tutar / Amount</p>
          <p className="mt-2 text-4xl font-semibold text-white">{priceLabel}</p>
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
          <div className="relative mt-5 h-8 w-full max-w-[429px]">
            <Image
              src="/payments/iyzico-logo-band-colored.svg"
              alt="iyzico secure payment methods"
              fill
              sizes="429px"
              className="rounded-md bg-white object-contain object-center"
            />
          </div>
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
          {isSubmitting ? "Ödeme başlatılıyor" : "Güvenli Ödeme Yap"}
        </button>
      </aside>
    </form>
  );
}
