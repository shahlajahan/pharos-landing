import type { Metadata } from "next";
import {
  Blocks,
  Bot,
  FileJson,
  GitFork,
  Languages,
  ScanSearch,
  SlidersHorizontal,
  Star,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { siteUrl } from "../company";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { CopyInstallCommand } from "../devclean/CopyInstallCommand";

const GITHUB_URL = "https://github.com/shahlajahan/devaudit";
const CURRENT_VERSION = "v0.1.0-dev.2";

export const metadata: Metadata = {
  title: "DevAudit | Pharos Labs",
  description: "Developer audit platform for Flutter, Dart and modern software projects.",
  alternates: {
    canonical: "/devaudit",
  },
  openGraph: {
    title: "DevAudit | Pharos Labs",
    description:
      "Analyze, understand and improve your software projects with automated code quality, localization and architecture audits.",
    url: "/devaudit",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
  },
};

const featureItems = [
  {
    icon: Blocks,
    titleTr: "Eklenti tabanlı mimari",
    titleEn: "Plugin-based architecture",
    body: "Çekirdek motor dilden bağımsızdır; yeni denetimler eklenti olarak eklenir.",
  },
  {
    icon: Languages,
    titleTr: "Flutter/Dart lokalizasyon denetimi",
    titleEn: "Flutter/Dart localization audit",
    body: "Kullanıcıya görünen ama henüz lokalize edilmemiş metinleri tespit eder.",
  },
  {
    icon: SlidersHorizontal,
    titleTr: "Genişletilebilir kural motoru",
    titleEn: "Extensible rule engine",
    body: "Yeni kurallar tanımlanarak denetim kapsamı projeye özel genişletilebilir.",
  },
  {
    icon: FileJson,
    titleTr: "JSON ve Markdown raporlar",
    titleEn: "JSON and Markdown reports",
    body: "Bulgular hem makine hem de insan tarafından okunabilir formatlarda üretilir.",
  },
  {
    icon: Bot,
    titleTr: "AI ajanlarına hazır raporlar",
    titleEn: "AI-agent ready reports",
    body: "Büyük denetimler, bir AI ajanının bağlam penceresine sığacak görev paketlerine bölünür.",
  },
  {
    icon: Workflow,
    titleTr: "Geliştirici iş akışına entegrasyon",
    titleEn: "Developer workflow integration",
    body: "CLI üzerinden mevcut geliştirme sürecine ve otomasyonlara kolayca dahil edilir.",
  },
];

/**
 * No screenshots exist yet for this project (verified against the local
 * devaudit repository — none were found). These are clearly-marked
 * placeholders, not invented images; see the implementation report for the
 * exact filenames/dimensions to add once real screenshots are captured.
 */
const screenshotPlaceholders = [
  {
    key: "scan",
    titleTr: "Tarama",
    titleEn: "Scan",
    body: "Bir projeyi tarayıp bulguları terminalde listeler.",
    expectedFile: "/devaudit/screenshots/scan.png",
  },
  {
    key: "summary-report",
    titleTr: "Özet Rapor",
    titleEn: "Summary Report",
    body: "JSON ve Markdown formatında oluşturulan özet raporu gösterir.",
    expectedFile: "/devaudit/screenshots/summary-report.png",
  },
  {
    key: "ai-task-bundle",
    titleTr: "AI Görev Paketi",
    titleEn: "AI Task Bundle",
    body: "Büyük bir denetimin AI-ajanı için görev paketlerine bölünmüş halini gösterir.",
    expectedFile: "/devaudit/screenshots/ai-task-bundle.png",
  },
];

const installCommand = [
  "git clone https://github.com/shahlajahan/devaudit.git",
  "cd devaudit",
  "dart pub get",
  "dart run bin/devaudit.dart scan .",
].join("\n");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevAudit",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform (Dart)",
  softwareVersion: CURRENT_VERSION.replace("v", ""),
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  url: `${siteUrl}/devaudit`,
  codeRepository: GITHUB_URL,
  description:
    "An extensible developer audit platform that helps teams detect issues, understand code health and improve software quality.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DevAuditPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      <section className="relative isolate overflow-hidden bg-[#08111f] px-5 pt-28 pb-16 text-white sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,165,127,0.22),rgba(30,116,176,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100 shadow-lg shadow-emerald-950/30">
            <TerminalSquare size={15} aria-hidden="true" />
            Pharos Labs / Open Source
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">DevAudit</h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-emerald-200 sm:text-xl">
            AI-friendly developer audit platform
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Modern yazılım projeleri için geliştirici denetim platformu. Kod kalitesi, lokalizasyon ve
            mimari analizleri otomatikleştirin.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            An extensible developer audit platform that helps teams detect issues, understand code
            health and improve software quality.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DevAudit deposunu GitHub'da görüntüle"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-500/24 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <GitFork size={17} aria-hidden="true" />
              View on GitHub
            </a>
            <a
              href="#install"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/14 bg-white/6 px-5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/32 hover:bg-white/10"
            >
              Installation
            </a>
          </div>
        </div>
      </section>

      <section
        id="install"
        className="relative bg-[linear-gradient(180deg,#eef4f8_0%,#ffffff_42%,#edf3f7_100%)] py-16 text-slate-950 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Hızlı Kurulum / Quick Install
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Dört adımda çalıştırın.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Klonlayın, bağımlılıkları kurun ve ilk taramayı başlatın.
          </p>

          <div className="mt-8">
            <CopyInstallCommand command={installCommand} />
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Özellikler / Features
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Analyze. Understand. Improve.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.titleEn}
                  className="rounded-xl border border-white bg-white/75 p-5 shadow-xl shadow-slate-300/25 backdrop-blur"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-white">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-950">{item.titleTr}</h3>
                  <p className="text-xs font-semibold text-emerald-700">{item.titleEn}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16 text-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Ekran Görüntüleri / Screenshots
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Yakında eklenecek.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Gerçek ekran görüntüleri henüz mevcut değil; bu alan yayınlandığında güncellenecektir.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {screenshotPlaceholders.map((shot) => (
              <figure
                key={shot.key}
                className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white/[0.76] shadow-xl shadow-slate-300/30 backdrop-blur"
              >
                <div className="flex aspect-video w-full items-center justify-center bg-slate-100 text-slate-400">
                  <ScanSearch size={32} aria-hidden="true" />
                </div>
                <figcaption className="p-5">
                  <p className="text-base font-semibold">{shot.titleTr}</p>
                  <p className="text-sm font-semibold text-emerald-700">{shot.titleEn}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{shot.body}</p>
                  <p className="mt-2 text-xs text-slate-400">Yakında / Coming soon</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(49,165,127,0.18),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(30,116,176,0.22),transparent_24rem)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Açık Kaynak / Open Source
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Apache 2.0 Lisansı ile açık kaynak.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            DevAudit is developed by Pharos Labs and released under the Apache License 2.0.
          </p>

          <div className="mt-7">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DevAudit deposunu GitHub'da yıldızla"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-500/24 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <Star size={17} aria-hidden="true" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
