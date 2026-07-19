"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Button } from "./ui/Button";

const storageKey = "pharos-cookie-consent";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify() {
  listeners.forEach((listener) => listener());
}

function getConsentSnapshot() {
  return window.localStorage.getItem(storageKey) === null;
}

function getServerConsentSnapshot() {
  return false;
}

function saveConsent(value: "accepted" | "rejected") {
  window.localStorage.setItem(storageKey, value);
  notify();
}

export function CookieConsent() {
  const isVisible = useSyncExternalStore(subscribe, getConsentSnapshot, getServerConsentSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("cookie-consent-visible", isVisible);

    return () => {
      document.documentElement.classList.remove("cookie-consent-visible");
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 lg:px-8">
      <section
        aria-label="Çerez tercihi"
        className="mx-auto flex max-w-5xl flex-col gap-4 rounded-xl border border-white/14 bg-brand-navy-deep/95 p-4 text-slate-300 shadow-2xl shadow-black/45 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-5"
      >
        <p className="max-w-3xl text-sm leading-6">
          Çerezleri site deneyimini iyileştirmek, güvenliği sağlamak ve yasal
          yükümlülükleri yerine getirmek için kullanıyoruz. Tercihinizi KVKK ve
          GDPR ilkelerine uygun şekilde yönetebilirsiniz.{" "}
          <a
            href="/cookies"
            className="font-semibold text-red-200 transition hover:text-white"
          >
            Çerez Politikası
          </a>
        </p>
        <div className="flex shrink-0 gap-2 text-white">
          <Button variant="secondary" size="md" onClick={() => saveConsent("rejected")}>
            Reddet
          </Button>
          <Button variant="primary" size="md" onClick={() => saveConsent("accepted")}>
            Kabul Et
          </Button>
        </div>
      </section>
    </div>
  );
}
