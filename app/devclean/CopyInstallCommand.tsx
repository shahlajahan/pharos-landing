"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyInstallCommandProps = {
  command: string;
};

export function CopyInstallCommand({ command }: CopyInstallCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-[#050b16] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Terminal</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Komut kopyalandı" : "Komutu kopyala"}
          className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-300" aria-hidden="true" />
              Kopyalandı
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              Kopyala
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-sm leading-7 text-emerald-200">
        <code>{command}</code>
      </pre>
    </div>
  );
}
