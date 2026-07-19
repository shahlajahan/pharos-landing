"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

const headline = ["Özel yazılım,", "mobil uygulama, web,", "yapay zeka ve dijital ürünler."];

const stats = [
  ["01", "Keşif"],
  ["02", "Geliştirme"],
  ["03", "Ölçeklendirme"],
] as const;

export function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

      tl.from(scope.querySelectorAll("[data-hero-mark]"), { opacity: 0, scale: 0.92, duration: 1.4 })
        .from(
          scope.querySelectorAll("[data-hero-eyebrow]"),
          { opacity: 0, y: 14, duration: 0.6 },
          "-=1.0",
        )
        .from(
          scope.querySelectorAll("[data-hero-line]"),
          { opacity: 0, y: 36, stagger: 0.12 },
          "-=0.4",
        )
        .from(
          scope.querySelectorAll("[data-hero-sub]"),
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.5",
        )
        .from(
          scope.querySelectorAll("[data-hero-cta]"),
          { opacity: 0, y: 14, duration: 0.6 },
          "-=0.4",
        )
        .from(
          scope.querySelectorAll("[data-hero-stat]"),
          { opacity: 0, y: 10, stagger: 0.08, duration: 0.5 },
          "-=0.35",
        )
        .from(
          scope.querySelectorAll("[data-hero-scrollcue]"),
          { opacity: 0, duration: 0.8 },
          "-=0.2",
        );

      const light = gsap.to(glowRef.current, {
        opacity: 0.85,
        scale: 1.08,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const markX = gsap.quickTo(markRef.current, "x", { duration: 0.9, ease: "power3.out" });
      const markY = gsap.quickTo(markRef.current, "y", { duration: 0.9, ease: "power3.out" });

      function handlePointerMove(event: PointerEvent) {
        const el = scopeRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        markX(relX * 24);
        markY(relY * 18);
      }

      scope.addEventListener("pointermove", handlePointerMove);

      return () => {
        light.kill();
        tl.kill();
        scope.removeEventListener("pointermove", handlePointerMove);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={scopeRef}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-brand-navy-deep"
    >
      <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div
        data-hero-mark
        ref={markRef}
        className="pointer-events-none absolute right-[-18%] top-1/2 h-[42vh] w-[42vh] -translate-y-1/2 opacity-40 sm:right-[-10%] sm:h-[56vh] sm:w-[56vh] sm:opacity-70 lg:right-[6%] lg:h-[70vh] lg:w-[70vh] lg:opacity-90"
        aria-hidden="true"
      >
        <div
          ref={glowRef}
          className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.32),rgba(233,27,48,0.08)_45%,transparent_72%)] opacity-60 blur-2xl"
        />
        <Image
          src="/pharos-mark.png"
          alt=""
          width={655}
          height={570}
          className="relative h-full w-full object-contain"
          priority
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-brand-navy-deep via-brand-navy-deep/70 to-transparent sm:w-2/3 lg:w-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            data-hero-eyebrow
            className="text-xs font-semibold uppercase tracking-[0.28em] text-red-200"
          >
            Pharos Teknoloji
          </p>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {headline.map((line) => (
              <span key={line} data-hero-line className="block text-balance">
                {line}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            Şirketler için özel yazılım, mobil uygulama, web ve yapay zeka çözümleri geliştiren
            mühendislik ortağı.
          </p>

          <div data-hero-cta className="mt-10">
            <Button href="/contact" variant="primary" size="lg" className="group">
              Proje konuşalım
              <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-16 flex max-w-md items-center gap-8 border-t border-white/10 pt-6">
            {stats.map(([step, label]) => (
              <div key={step} data-hero-stat>
                <p className="text-xs font-semibold text-red-200">{step}</p>
                <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-hero-scrollcue
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 sm:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Kaydır</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
