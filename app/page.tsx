import type { Metadata } from "next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/home/Hero";
import { Proof } from "./components/home/Proof";
import { Understanding } from "./components/home/Understanding";
import { Capabilities } from "./components/home/Capabilities";
import { Process } from "./components/home/Process";
import { ServicesGrid } from "./components/home/ServicesGrid";
import { About } from "./components/home/About";
import { ContactSection } from "./components/home/ContactSection";

export const metadata: Metadata = {
  title: "Pharos Teknoloji | Mobil, Yapay Zeka ve Özel Yazılım",
  description:
    "Pharos Teknoloji mobil uygulama, yapay zeka çözümleri ve özel yazılım projeleri geliştirir.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pharos Teknoloji | Mobil, Yapay Zeka ve Özel Yazılım",
    description:
      "Mobil uygulama, yapay zeka çözümleri ve özel yazılım geliştirme partneri.",
    url: "/",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pharos Teknoloji" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <SiteHeader />
      <Hero />
      <Proof />
      <Understanding />
      <Capabilities />
      <Process />
      <ServicesGrid />
      <About />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
