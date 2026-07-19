import type { Metadata } from "next";
import {
  Apple,
  Cloud,
  Compass,
  Layers,
  Lock,
  PlayCircle,
  Search,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { Reveal } from "../../components/motion/Reveal";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  HubmonixFilmstrip,
  HubmonixHeroStack,
} from "../../components/products/HubmonixShowcase";

export const metadata: Metadata = {
  title: "Hubmonix | Pharos Teknoloji",
  description:
    "Hubmonix, kullanıcıların güvenilir lüks markaları, hizmetleri ve ajansları tek bir uygulama üzerinden keşfetmesini sağlayan premium bir mobil platformdur. Flutter ve Firebase üzerine inşa edilmiştir.",
  alternates: {
    canonical: "/products/hubmonix",
  },
  openGraph: {
    title: "Hubmonix | Pharos Teknoloji",
    description:
      "Güvenilir lüks marka ve hizmetleri tek bir uygulamada buluşturan premium keşif platformu.",
    url: "/products/hubmonix",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
  },
};

const categories = [
  "Lüks seyahat",
  "Premium yaşam tarzı hizmetleri",
  "Seçkin ajanslar",
  "Ağırlama",
  "Üst düzey alışveriş",
  "Özel etkinlikler",
  "Konsiyerj hizmetleri",
];

const engineeringCapabilities = [
  {
    icon: Smartphone,
    title: "Premium mobil uygulama mühendisliği",
    body: "Tek bir kod tabanından iOS ve Android'de aynı akıcılıkta çalışan, üretim kalitesinde bir deneyim.",
  },
  {
    icon: Compass,
    title: "Kategori tabanlı keşif sistemi",
    body: "Çok sayıda işletmeyi, sade ve anlaşılır kategoriler halinde düzenleyen bir mimari.",
  },
  {
    icon: Search,
    title: "Arama ve filtreleme",
    body: "Kullanıcının doğru işletmeye kalabalık bir listeye boğulmadan ulaşmasını sağlayan arama deneyimi.",
  },
  {
    icon: Lock,
    title: "Güvenli kullanıcı kimlik doğrulama",
    body: "Firebase Authentication üzerine kurulu, güvenilir oturum ve hesap yönetimi.",
  },
  {
    icon: Cloud,
    title: "Bulut tabanlı arka uç entegrasyonu",
    body: "Firestore ve Cloud Functions ile veri senkronizasyonu ve iş mantığı bulutta çalışır.",
  },
  {
    icon: Layers,
    title: "Ölçeklenebilir uygulama mimarisi",
    body: "Yeni kategoriler ve partnerler eklendikçe genişleyebilecek modüler bir yapı.",
  },
];

const technologies = [
  "Flutter",
  "Dart",
  "Firebase",
  "Cloud Firestore",
  "Firebase Authentication",
  "Firebase Storage",
  "Cloud Functions",
];

export default function HubmonixPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="relative isolate overflow-hidden bg-brand-navy-deep px-5 pt-28 pb-16 text-white sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.18),rgba(11,24,46,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <Badge tone="red">Amiral Gemisi Ürün</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">Hubmonix</h1>
            <p className="mt-4 max-w-xl text-lg font-semibold text-red-200 sm:text-xl">
              Güvenilir lüks markaları tek bir uygulamada keşfedin.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Hubmonix, kullanıcıların onlarca web sitesi ve platform arasında dolaşmak yerine,
              özenle seçilmiş lüks işletmeleri sezgisel kategoriler altında keşfetmesini sağlayan
              premium bir mobil platformdur. Odak noktası nicelik değil; kalite, güven ve konfordur.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-1.5 text-xs font-semibold text-slate-200">
                <Apple size={14} aria-hidden="true" />
                iOS
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-1.5 text-xs font-semibold text-slate-200">
                <PlayCircle size={14} aria-hidden="true" />
                Android
              </span>
              <Badge tone="success">Aktif Mobil Uygulama</Badge>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#deneyim" variant="primary" size="lg">
                <Sparkles size={17} aria-hidden="true" />
                Ürünü Keşfet
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                İletişime Geçin
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <HubmonixHeroStack />
          </Reveal>
        </div>
      </section>

      <section id="deneyim" className="relative bg-brand-paper py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge tone="red">Deneyim</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Kalabalık değil, küratörlü.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Kullanıcılar kategoriler arasında gezinerek ilgi alanlarına uygun işletmeleri keşfeder.
              Deneyim, sıkça karşılaşılan yoğun ve dağınık dizinlerin aksine sade ve seçici hissettirir
              üzere tasarlandı.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                >
                  {category}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <HubmonixFilmstrip />
          </Reveal>
        </div>
      </section>

      <section className="relative bg-brand-mist py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge tone="red">Mühendislik</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Kanıtladığı mühendislik yetkinlikleri.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Hubmonix, Pharos&apos;un premium tüketici uygulamaları tasarlama ve geliştirme
              yeteneğinin kanıtıdır.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringCapabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={(index % 3) * 0.06}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-navy text-white">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-brand-paper py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <Badge tone="red">Teknoloji</Badge>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Çapraz platform, bulut tabanlı bir teknoloji yığını.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Badge tone="red">Konumlandırma</Badge>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Genel bir işletme dizini değil.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Hubmonix, mümkün olduğunca çok işletmeyi listelemeyi değil, doğru hizmeti keşfetmeyi
                önceliklendiren küratörlü bir platformdur. Arayüz, kalabalık hissettirmeden ayrıcalığı
                iletecek şekilde tasarlandı — her etkileşim özenli ve amaçlı hissettirir. Platform,
                yeni kategoriler ve premium partnerlerle gelişmeye devam ediyor.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy-deep py-16 text-white sm:py-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(233,27,48,0.14),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(255,255,255,0.06),transparent_24rem)]"
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Pharos&apos;un premium ürün deneyimi standardı.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Hubmonix&apos;i mümkün kılan aynı mühendislik titizliği ve tasarım özeni, ticari
            projelerimizde de geçerlidir.
          </p>
          <div className="mt-7">
            <Button href="/contact" variant="primary" size="lg">
              Proje konuşalım
            </Button>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
