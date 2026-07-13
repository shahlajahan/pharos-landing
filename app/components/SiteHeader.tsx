import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { company } from "../company";

const navItems = [
  ["Hizmetler", "Services", "/#services"],
  ["Açık Kaynak", "Open Source", "/#labs"],
  ["Hakkımızda", "About", "/#about"],
  ["İletişim", "Contact", "/contact"],
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08111f]";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-1 sm:px-5 sm:pt-1.5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/14 bg-[#08111f]/82 px-3 py-2 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:px-4">
        <a
          href="/"
          className={`flex items-center gap-3 rounded-lg ${focusRing}`}
          aria-label="Pharos Teknoloji ana sayfa"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/16 bg-white/[0.12] shadow-xl shadow-emerald-500/15 ring-1 ring-emerald-300/10 sm:h-[3.75rem] sm:w-[3.75rem]">
            <Image
              src="/logo.png"
              alt="Pharos Teknoloji logo"
              width={58}
              height={58}
              className="h-12 w-12 rounded-lg sm:h-[3.25rem] sm:w-[3.25rem]"
              priority
            />
          </span>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-[0.14em] text-white uppercase">
              Pharos
            </p>
            <p className="text-xs font-medium text-emerald-200/80">Teknoloji</p>
          </div>
        </a>

        <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.07] p-1 shadow-inner shadow-white/5 md:flex">
          {navItems.map(([tr, en, href]) => (
            <a
              key={href}
              href={href}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white ${focusRing}`}
            >
              {tr} <span className="text-slate-500">/ {en}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            aria-label="Telefonla ara"
            className={`hidden h-11 items-center gap-2 rounded-lg bg-emerald-400 px-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:flex ${focusRing}`}
          >
            <Phone size={16} aria-hidden="true" />
            Ara
          </a>
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white transition hover:bg-white/10 md:hidden ${focusRing}`}
            aria-label="Menü"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}
