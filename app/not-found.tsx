import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Button } from "./components/ui/Button";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Pharos Teknoloji",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-white text-brand-navy">
            <Compass size={30} aria-hidden="true" />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-red-200">404</p>

          <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Bu sayfa bulunamadı.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/" variant="primary" size="lg">
              Ana sayfaya dön
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="text-white">
              Destek al
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
