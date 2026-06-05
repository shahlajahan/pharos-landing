"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardCheck, ReceiptText } from "lucide-react";

type PaymentSuccessVerifierProps = {
  token?: string;
};

type VerificationResponse = {
  verified?: boolean;
  error?: string;
};

export function PaymentSuccessVerifier({ token }: PaymentSuccessVerifierProps) {
  const [status, setStatus] = useState<"verifying" | "verified" | "failed">(
    token ? "verifying" : "failed"
  );
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : "Ödeme doğrulama token bilgisi bulunamadı."
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    let isActive = true;

    async function verifyPayment() {
      try {
        const response = await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const result = (await response.json()) as VerificationResponse;

        if (!isActive) {
          return;
        }

        if (response.ok && result.verified) {
          setStatus("verified");
          return;
        }

        setErrorMessage(result.error ?? "Ödeme iyzico tarafından onaylanmadı.");
        setStatus("failed");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Ödeme doğrulaması tamamlanamadı."
        );
        setStatus("failed");
      }
    }

    verifyPayment();

    return () => {
      isActive = false;
    };
  }, [token]);

  if (status === "verifying") {
    return (
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-white text-slate-950">
          <ReceiptText size={30} aria-hidden="true" />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
          Payment Verification
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Ödemeniz doğrulanıyor.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-300">
          iyzico ödeme sonucu kontrol ediliyor. Lütfen bu sayfadan ayrılmayın.
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-white text-slate-950">
          <AlertCircle size={30} aria-hidden="true" />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
          Payment Verification Failed
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Ödeme doğrulanamadı.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-300">
          {errorMessage}
        </p>
        <a
          href="/payment-failed"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-emerald-400 px-6 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
        >
          Ödeme durumuna git
        </a>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
        <CheckCircle2 size={30} aria-hidden="true" />
      </div>
      <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
        Payment Successful
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
        Ödemeniz başarıyla alındı.
      </h1>
      <p className="mt-5 text-base leading-8 text-slate-300">
        Satın alma işlemi tamamlandı. Fatura, sözleşme ve proje kickoff adımları için ekibimiz sizinle iletişime geçecektir.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 text-left">
          <ReceiptText size={20} className="text-emerald-200" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-white">Invoice process</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">Satın alma için fatura düzenlenir.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 text-left">
          <ClipboardCheck size={20} className="text-emerald-200" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-white">Project kickoff</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">Ödeme sonrası teslim planı başlatılır.</p>
        </div>
      </div>

      <a
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-emerald-400 px-6 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
      >
        Ana sayfaya dön
      </a>
    </div>
  );
}
