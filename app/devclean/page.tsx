import type { Metadata } from "next";
import Image from "next/image";
import {
  Beaker,
  Cpu,
  ExternalLink,
  FlaskConical,
  GitFork,
  HandCoins,
  ShieldCheck,
  Star,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import { siteUrl } from "../company";
import { SiteFooter } from "../components/SiteFooter";
import { CopyInstallCommand } from "./CopyInstallCommand";

const GITHUB_URL = "https://github.com/shahlajahan/devclean";
const RELEASE_URL = `${GITHUB_URL}/releases/tag/v1.1.0`;
const CURRENT_VERSION = "v1.1.0";

export const metadata: Metadata = {
  title: "devclean — macOS Geliştirici Disk Temizleme Aracı | Pharos Teknoloji",
  description:
    "devclean; Xcode, Flutter, Simulator, Node.js ve Homebrew disk kullanımını güvenle denetleyen ve temizleyen, Pharos Teknoloji tarafından geliştirilen açık kaynak macOS CLI aracıdır.",
  alternates: {
    canonical: "/devclean",
  },
  openGraph: {
    title: "devclean | Pharos Teknoloji",
    description:
      "Safety-first macOS CLI for auditing developer disk usage and cleaning recreatable caches — Xcode, Flutter, Node.js, Homebrew and more.",
    url: "/devclean",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
    images: ["/devclean/screenshots/scan.png"],
  },
};

const safetyItems = [
  {
    icon: ShieldCheck,
    titleTr: "Sudo gerektirmez",
    titleEn: "No sudo",
    body: "devclean hiçbir işlem için yönetici izni istemez; yalnızca kullanıcı dizini kapsamında çalışır.",
  },
  {
    icon: HandCoins,
    titleTr: "Açık onay adımları",
    titleEn: "Explicit confirmations",
    body: "Güvenli önbellekler için y/N, yüksek etkili işlemler için DELETE yazılarak onay istenir.",
  },
  {
    icon: FlaskConical,
    titleTr: "Genel dry-run modu",
    titleEn: "Global dry-run",
    body: "--dry-run ile hiçbir dosya silinmeden tam olarak ne yapılacağı önceden gösterilir.",
  },
  {
    icon: Wrench,
    titleTr: "Tehlikeli yol koruması",
    titleEn: "Dangerous-path protection",
    body: "Kaynak kodu, .git, kimlik bilgileri, SSH anahtarları ve ev dizini dışındaki her şey korunur.",
  },
  {
    icon: Beaker,
    titleTr: "WhatsApp yalnızca denetim",
    titleEn: "WhatsApp audit-only",
    body: "WhatsApp depolama alanı yalnızca ölçülür ve raporlanır; hiçbir mesaj veya medya silinmez.",
  },
];

const engineeringItems = [
  "Engineering capability",
  "Open-source contribution",
  "Developer tooling",
  "Product design",
  "macOS automation",
  "Testing and release engineering",
];

const screenshots = [
  {
    src: "/devclean/screenshots/scan.png",
    titleTr: "Tarama",
    titleEn: "Scan",
    body: "Geliştirici disk kullanımını kategoriye göre tarar ve geri kazanılabilir alanı tahmin eder.",
    width: 2940,
    height: 1846,
  },
  {
    src: "/devclean/screenshots/doctor.png",
    titleTr: "Doctor",
    titleEn: "Doctor",
    body: "Geliştirme ortamını 0-100 sağlık skoru ile teşhis eder; öneriler sunar.",
    width: 2280,
    height: 1174,
  },
  {
    src: "/devclean/screenshots/quick-clean-dry-run.png",
    titleTr: "Hızlı Temizlik (Dry Run)",
    titleEn: "Quick Clean Dry Run",
    body: "Hiçbir şey silmeden önce, temizlik işleminin tam olarak ne yapacağını önizler.",
    width: 2940,
    height: 1846,
  },
  {
    src: "/devclean/screenshots/whatsapp-audit.png",
    titleTr: "WhatsApp Denetimi",
    titleEn: "WhatsApp Audit",
    body: "Mesaj, medya ve log boyutlarını yalnızca görüntüler; hiçbir veriyi silmez.",
    width: 2940,
    height: 1846,
  },
];

const installCommand = [
  "git clone https://github.com/shahlajahan/devclean.git",
  "cd devclean",
  "./install.sh",
  "devclean scan",
].join("\n");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "devclean",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS",
  softwareVersion: CURRENT_VERSION.replace("v", ""),
  license: "https://opensource.org/licenses/MIT",
  url: `${siteUrl}/devclean`,
  codeRepository: GITHUB_URL,
  description:
    "Safety-first macOS CLI for auditing developer disk usage, diagnosing development environments, and cleaning recreatable caches.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DevcleanPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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

          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">devclean</h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-emerald-200 sm:text-xl">
            Reclaim developer disk space safely.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Xcode, Flutter, Simulator, Node.js, CocoaPods ve Homebrew depolama alanını proje dosyalarınıza
            veya kişisel verilerinize dokunmadan güvenle denetleyin.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Audit Xcode, Flutter, Simulator, Node, CocoaPods and Homebrew storage without risking project
            files or personal data.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="devclean deposunu GitHub'da görüntüle"
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
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`devclean ${CURRENT_VERSION} sürümünü indir`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/14 bg-white/6 px-5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/32 hover:bg-white/10"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Download {CURRENT_VERSION}
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
            Üç adımda çalıştırın.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Klonlayın, kurun ve ilk taramayı başlatın. devclean hiçbir onay istemeden hiçbir şeyi silmez.
          </p>

          <div className="mt-8">
            <CopyInstallCommand command={installCommand} />
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16 text-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Ekran Görüntüleri / Screenshots</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Ne yaptığını göster, tahmin ettirme.
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-2xl border border-white bg-white/[0.76] shadow-xl shadow-slate-300/30 backdrop-blur"
              >
                <div className="relative w-full overflow-hidden bg-slate-950">
                  <Image
                    src={shot.src}
                    alt={`devclean ${shot.titleEn} ekran görüntüsü / screenshot`}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="text-base font-semibold">{shot.titleTr}</p>
                  <p className="text-sm font-semibold text-emerald-700">{shot.titleEn}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{shot.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Güvenlik / Safety</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Önce güvenlik, sonra temizlik.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {safetyItems.map((item) => {
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

      <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(49,165,127,0.18),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(30,116,176,0.22),transparent_24rem)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Açık Kaynak / Open Source
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">MIT Lisansı ile açık kaynak.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            devclean is developed by Pharos Teknoloji and released under the MIT License.
          </p>

          <div className="mt-7">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="devclean deposunu GitHub'da yıldızla"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-500/24 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <Star size={17} aria-hidden="true" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Neden Önemli? / Why it Matters
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal sm:text-4xl">
            Mühendislik yaklaşımımızın somut bir örneği.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            devclean, ticari projelerimizde uyguladığımız aynı standartlarla geliştirildi: güvenlik önce
            gelir, her işlem test edilir ve her sürüm belgelenir.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
              >
                <Cpu size={18} className="text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
