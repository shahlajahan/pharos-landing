import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Menu,
  Send,
  Phone,
  Rocket,
  Sparkles,
  Smartphone,
  Zap,
} from "lucide-react";
import { company } from "./company";
import { SiteFooter } from "./components/SiteFooter";

const phone = company.phone;
const phoneHref = company.phoneHref;

export const metadata: Metadata = {
  title: "Pharos Teknoloji | Mobile, AI and Custom Software",
  description:
    "Pharos Teknoloji mobil uygulama, yapay zeka çözümleri ve özel yazılım projeleri geliştirir.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pharos Teknoloji | Mobile, AI and Custom Software",
    description:
      "Mobil uygulama, yapay zeka çözümleri ve özel yazılım geliştirme partneri.",
    url: "/",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
    images: ["/logo.png"],
  },
};

const services = [
  {
    icon: Code2,
    titleTr: "Özel Yazılım Geliştirme",
    titleEn: "Custom Software Development",
    bodyTr:
      "Şirket süreçlerinize özel CRM, panel, entegrasyon, otomasyon ve operasyonel yazılım çözümleri geliştiriyoruz.",
    bodyEn:
      "Custom platforms, back-office tools, integrations, automation, and operational software built around your workflows.",
  },
  {
    icon: Smartphone,
    titleTr: "Mobil Uygulama Geliştirme",
    titleEn: "Mobile App Development",
    bodyTr:
      "iOS ve Android için performanslı, ölçeklenebilir ve kullanıcı odaklı mobil ürünler geliştiriyoruz.",
    bodyEn:
      "High-performance mobile products for iOS and Android with scalable architecture and polished UX.",
  },
  {
    icon: Globe2,
    titleTr: "Web Çözümleri",
    titleEn: "Web Solutions",
    bodyTr:
      "Kurumsal web siteleri, müşteri portalları, ödeme uyumlu akışlar ve ölçeklenebilir web uygulamaları kuruyoruz.",
    bodyEn:
      "Corporate websites, customer portals, payment-ready flows, and scalable web applications.",
  },
  {
    icon: Bot,
    titleTr: "Yapay Zeka Çözümleri",
    titleEn: "AI Solutions",
    bodyTr:
      "İş akışlarını hızlandıran, veriden değer üreten ve karar süreçlerini güçlendiren AI sistemleri kuruyoruz.",
    bodyEn:
      "AI systems that accelerate workflows, extract value from data, and strengthen decision-making.",
  },
  {
    icon: Rocket,
    titleTr: "Dijital Ürün Geliştirme",
    titleEn: "Digital Product Development",
    bodyTr:
      "Ürün fikrinden canlı yayına kadar keşif, UX, mimari, geliştirme, test ve bakım süreçlerini yönetiyoruz.",
    bodyEn:
      "Discovery, UX, architecture, development, testing, launch, and support for digital products.",
  },
];

const strengths = [
  "Custom software and integrations",
  "Mobile and web product delivery",
  "AI-assisted business workflows",
  "Secure launch and long-term support",
];

const metrics = [
  ["01", "Discovery", "Strateji / Strategy"],
  ["02", "Build", "Mobil + AI + Software"],
  ["03", "Scale", "Cloud-ready systems"],
];

const navItems = [
  ["Hizmetler", "Services", "#services"],
  ["Hakkımızda", "About", "#about"],
  ["İletişim", "Contact", "/contact"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/14 bg-[#08111f]/82 px-3 py-2.5 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:px-4">
          <a href="#top" className="flex items-center gap-3.5" aria-label="Pharos Teknoloji">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-white/16 bg-white/[0.12] shadow-xl shadow-emerald-500/15 ring-1 ring-emerald-300/10">
              <Image
                src="/logo.png"
                alt="Pharos Teknoloji logo"
                width={58}
                height={58}
                className="h-14 w-14 rounded-lg"
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
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {tr} <span className="text-slate-500">/ {en}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={phoneHref}
              className="hidden h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5 hover:bg-emerald-100 sm:flex"
            >
              <Phone size={16} aria-hidden="true" />
              Ara
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white md:hidden"
              aria-label="Menü"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <section id="top" className="relative isolate min-h-screen overflow-hidden bg-[#08111f]">
        <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.22),rgba(30,116,176,0.12)_38%,transparent_70%)] blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-[-18rem] right-[-12rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(30,116,176,0.24),transparent_66%)] blur-2xl" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pt-32 pb-12 sm:px-6 md:pt-36 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pt-32 lg:pb-14">
          <div className="flex flex-col justify-center">
            <div className="animate-rise mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100 shadow-lg shadow-emerald-950/30">
              <Sparkles size={15} aria-hidden="true" />
              Premium technology partner / Üst seviye teknoloji partneri
            </div>

            <h1 className="animate-rise text-balance max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal text-white rise-delay-100 sm:text-5xl lg:text-6xl xl:text-7xl">
              Custom software, mobile apps, web, AI and digital products.
            </h1>
            <p className="animate-rise mt-5 max-w-2xl text-base leading-8 text-slate-200 rise-delay-200 sm:text-lg">
              Pharos Teknoloji; şirketler için özel yazılım geliştirme, mobil
              uygulama geliştirme, web çözümleri, yapay zeka çözümleri ve
              dijital ürün geliştirme hizmetleri sunar.
            </p>
            <p className="animate-rise mt-3 max-w-2xl text-base leading-7 text-slate-400 rise-delay-300">
              We design, build and support business-critical software from
              discovery and architecture to launch, maintenance and scaling.
            </p>

            <div className="animate-rise mt-7 flex flex-col gap-3 rise-delay-400 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-500/24 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Proje konuşalım
                <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/14 bg-white/6 px-5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/32 hover:bg-white/10"
              >
                <Phone size={17} aria-hidden="true" />
                {phone}
              </a>
            </div>

            <div className="animate-rise mt-7 grid max-w-2xl grid-cols-1 gap-2 rise-delay-500 sm:grid-cols-3">
              {metrics.map(([step, title, label]) => (
                <div key={step} className="rounded-lg border border-white/10 bg-white/6 p-3 backdrop-blur">
                  <p className="text-xs font-bold text-emerald-200">{step}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-[11px] leading-4 text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[510px] lg:min-h-[620px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.18),transparent_64%)] blur-2xl" aria-hidden="true" />
            <div className="command-surface animate-float relative mx-auto h-[510px] max-w-[620px] rounded-[2rem] border border-white/14 bg-white/8 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:h-[600px]">
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(14,31,49,0.96),rgba(8,17,31,0.96))]">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
                <div className="scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300 to-transparent" aria-hidden="true" />

                <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo.png"
                      alt=""
                      width={62}
                      height={62}
                      className="h-14 w-14 rounded-lg shadow-xl shadow-black/20"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">Pharos Operating Layer</p>
                      <p className="text-xs text-slate-400">Mobile · AI · Software</p>
                    </div>
                  </div>
                  <span className="pulse-dot rounded-md border border-emerald-300/20 bg-emerald-400/14 px-3 py-1 text-xs font-semibold text-emerald-100">
                    Online
                  </span>
                </div>

                <div className="relative z-10 p-5">
                  <div className="grid grid-cols-[1fr_0.9fr] gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                      <div className="mb-8 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase text-slate-400">System load</p>
                        <Zap size={18} className="text-emerald-300" />
                      </div>
                      <p className="text-4xl font-semibold text-white">98%</p>
                      <div className="mt-4 h-2 rounded-full bg-white/10">
                        <div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-emerald-300 to-sky-300" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                      <p className="text-xs font-semibold uppercase text-slate-400">Delivery mode</p>
                      <div className="mt-8 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-slate-950">
                          <Rocket size={20} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">Scale</p>
                          <p className="text-xs text-slate-400">Sprint-ready</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative my-6 flex h-40 items-center justify-center">
                    <div className="orbital-ring absolute h-40 w-40 rounded-full border border-emerald-300/25" aria-hidden="true" />
                    <div className="orbital-ring-reverse absolute h-28 w-28 rounded-full border border-sky-300/20" aria-hidden="true" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/16 bg-white shadow-2xl shadow-emerald-500/20">
                      <Image src="/logo.png" alt="" width={76} height={76} className="h-20 w-20 rounded-lg" />
                    </div>
                    <div className="absolute left-4 top-6 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur">
                      AI model ops
                    </div>
                    <div className="absolute bottom-5 right-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur">
                      Mobile launch
                    </div>
                  </div>

                  <div className="grid gap-2.5">
                    {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.titleEn}
                        className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] p-3 backdrop-blur transition hover:border-emerald-300/28 hover:bg-white/10"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-slate-950 shadow-lg shadow-black/15">
                          <Icon size={18} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-white sm:text-sm">{service.titleEn}</p>
                          <p className="mt-1 text-xs text-slate-400">{service.titleTr}</p>
                        </div>
                        <ArrowRight size={16} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-200" />
                      </div>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative bg-[linear-gradient(180deg,#eef4f8_0%,#ffffff_42%,#edf3f7_100%)] py-16 text-slate-950 shadow-[0_-30px_90px_rgba(8,17,31,0.28)] sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" aria-hidden="true" />
        <div className="absolute right-[-14rem] top-6 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden="true" />
        <div className="absolute left-[-10rem] bottom-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
                Hizmetler / Services
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl">
                Ürün, teknoloji ve operasyonu tek akışta birleştiriyoruz.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-slate-600 sm:text-lg">
              We combine product thinking, engineering discipline, and business
              context to ship software that holds up after launch.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.titleEn}
                  className="group relative overflow-hidden rounded-2xl border border-white bg-white/[0.76] p-6 shadow-xl shadow-slate-300/30 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-2xl hover:shadow-slate-300/60"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-950 text-white shadow-lg shadow-slate-950/15">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{service.titleTr}</h3>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    {service.titleEn}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{service.bodyTr}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{service.bodyEn}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-slate-950 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
              Hakkımızda / About
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
              Net hedefler, güçlü mimari, sürdürülebilir ürünler.
            </h2>
          </div>
          <div className="rounded-2xl border border-white bg-white/70 p-6 text-base leading-8 text-slate-600 shadow-xl shadow-slate-300/25 backdrop-blur sm:p-8">
            <p>
              Pharos Teknoloji, şirketlerin dijital ürünlerini fikir aşamasından
              canlı sisteme taşıyan bir yazılım geliştirme partneridir. Özel
              yazılım geliştirme, mobil uygulama geliştirme, web çözümleri,
              yapay zeka çözümleri ve dijital ürün geliştirme alanlarında
              tasarım, mühendislik, entegrasyon, test ve bakım hizmetleri sunarız.
            </p>
            <p className="mt-5">
              Pharos Teknoloji is a software partner for teams that need
              reliable execution across custom software, mobile apps, web
              platforms, AI workflows, and digital products. We work with a
              practical delivery model focused on clarity, speed, security, and
              maintainability.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
                >
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-slate-950 py-16 text-white shadow-[0_-30px_90px_rgba(15,23,42,0.22)] sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(49,165,127,0.18),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(30,116,176,0.22),transparent_24rem)]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
              İletişim / Contact
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-5xl">
              Yeni ürününüzü veya yazılım ihtiyacınızı konuşalım.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Tell us what you want to build. We will help you shape the right
              scope, technical path, and delivery plan.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Mobile", "AI", "Software"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                  <p className="text-sm font-semibold">{item}</p>
                  <p className="mt-1 text-xs text-slate-400">Premium delivery</p>
                </div>
              ))}
            </div>
          </div>

          <form
            action={company.emailHref}
            method="post"
            encType="text/plain"
            className="rounded-2xl border border-white/14 bg-white/10 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7"
          >
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-slate-950">
                  <Globe2 size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Pharos Teknoloji</p>
                  <p className="text-xs text-slate-400">Istanbul / Global delivery</p>
                </div>
              </div>
              <Cpu className="text-emerald-300" size={22} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Ad Soyad / Name
                </span>
                <input
                  name="name"
                  required
                  className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
                  placeholder="Adınız"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  E-posta / Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
                  placeholder="you@company.com"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Telefon / Phone
                </span>
                <input
                  name="phone"
                  className="h-12 rounded-lg border border-white/12 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
                  placeholder="+90"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Hizmet / Service
                </span>
                <select
                  name="service"
                  className="h-12 rounded-lg border border-white/12 bg-[#162437] px-4 text-sm text-white outline-none transition focus:border-emerald-300/60"
                >
                  <option>Custom Software Development</option>
                  <option>Mobile App Development</option>
                  <option>Web Solutions</option>
                  <option>AI Solutions</option>
                  <option>Digital Product Development</option>
                </select>
              </label>
              <label className="grid gap-2 sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Proje Notu / Project Brief
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="resize-none rounded-lg border border-white/12 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:bg-white/[0.12]"
                  placeholder="Ne geliştirmek istiyorsunuz?"
                />
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
                  <Phone size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400">Telefon / Phone</p>
                  <a href={phoneHref} className="mt-2 block text-2xl font-semibold">
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <Send size={17} aria-hidden="true" />
                Gönder / Send
              </button>
              <a
                href={phoneHref}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/6 px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Phone size={17} aria-hidden="true" />
                Hemen ara
              </a>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
