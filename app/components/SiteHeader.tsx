"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { company } from "../company";
import { Button } from "./ui/Button";

const navItems = [
  ["Hizmetler", "/#services"],
  ["Ürünler", "/#work"],
  ["Açık Kaynak", "/#labs"],
  ["Hakkımızda", "/#about"],
  ["İletişim", "/contact"],
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-menu-open", isMenuOpen);
    return () => document.documentElement.classList.remove("mobile-menu-open");
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-1 sm:px-5 sm:pt-1.5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/14 bg-brand-navy-deep/82 px-3 py-2 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:px-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg"
          aria-label="Pharos Teknoloji ana sayfa"
        >
          <Image
            src="/pharos-mark.png"
            alt="Pharos Teknoloji"
            width={131}
            height={114}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-[0.14em] text-white uppercase">
              Pharos
            </p>
            <p className="text-xs font-medium text-red-200">Teknoloji</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.07] p-1 shadow-inner shadow-white/5 md:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            href={company.phoneHref}
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
            aria-label="Telefonla ara"
          >
            <Phone size={16} aria-hidden="true" />
            Ara
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white transition hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/14 bg-brand-navy-deep/95 p-3 shadow-2xl shadow-black/35 backdrop-blur-2xl md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobil gezinme">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                {label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-1 flex items-center gap-2 rounded-lg bg-brand-red-strong px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-red"
            >
              <Phone size={16} aria-hidden="true" />
              {company.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
