"use client";

import { useEffect, useState } from "react";

const storageKey = "pharos-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!window.localStorage.getItem(storageKey));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("cookie-consent-visible", isVisible);

    return () => {
      document.documentElement.classList.remove("cookie-consent-visible");
    };
  }, [isVisible]);

  function saveConsent(value: "accepted" | "rejected") {
    window.localStorage.setItem(storageKey, value);
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 lg:px-8">
      <section
        aria-label="Çerez tercihi"
        className="mx-auto flex max-w-5xl flex-col gap-4 rounded-xl border border-white/14 bg-[#08111f]/95 p-4 text-slate-300 shadow-2xl shadow-black/45 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-5"
      >
        <p className="max-w-3xl text-sm leading-6">
          Çerezleri site deneyimini iyileştirmek, güvenliği sağlamak ve yasal
          yükümlülükleri yerine getirmek için kullanıyoruz. Tercihinizi KVKK ve
          GDPR ilkelerine uygun şekilde yönetebilirsiniz.{" "}
          <a href="/cookies" className="font-semibold text-emerald-200 transition hover:text-white">
            Çerez Politikası
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => saveConsent("rejected")}
            className="h-11 rounded-lg border border-white/14 bg-white/6 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="h-11 rounded-lg bg-emerald-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Accept
          </button>
        </div>
      </section>
    </div>
  );
}
