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
import { SiteHeader } from "../components/SiteHeader";
import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
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
      "Xcode, Flutter, Node.js, Homebrew ve daha fazlası için geliştirici disk kullanımını denetleyen ve geri kazanılabilir önbellekleri güvenle temizleyen macOS CLI aracı.",
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
    title: "Sudo gerektirmez",
    body: "devclean hiçbir işlem için yönetici izni istemez; yalnızca kullanıcı dizini kapsamında çalışır.",
  },
  {
    icon: HandCoins,
    title: "Açık onay adımları",
    body: "Güvenli önbellekler için y/N, yüksek etkili işlemler için DELETE yazılarak onay istenir.",
  },
  {
    icon: FlaskConical,
    title: "Genel dry-run modu",
    body: "--dry-run ile hiçbir dosya silinmeden tam olarak ne yapılacağı önceden gösterilir.",
  },
  {
    icon: Wrench,
    title: "Tehlikeli yol koruması",
    body: "Kaynak kodu, .git, kimlik bilgileri, SSH anahtarları ve ev dizini dışındaki her şey korunur.",
  },
  {
    icon: Beaker,
    title: "WhatsApp yalnızca denetim",
    body: "WhatsApp depolama alanı yalnızca ölçülür ve raporlanır; hiçbir mesaj veya medya silinmez.",
  },
];

const engineeringItems = [
  "Mühendislik yetkinliği",
  "Açık kaynağa katkı",
  "Geliştirici araçları",
  "Ürün tasarımı",
  "macOS otomasyonu",
  "Test ve sürüm mühendisliği",
];

const screenshots = [
  {
    src: "/devclean/screenshots/scan.png",
    title: "Tarama",
    body: "Geliştirici disk kullanımını kategoriye göre tarar ve geri kazanılabilir alanı tahmin eder.",
    width: 2940,
    height: 1846,
  },
  {
    src: "/devclean/screenshots/doctor.png",
    title: "Doctor",
    body: "Geliştirme ortamını 0-100 sağlık skoru ile teşhis eder; öneriler sunar.",
    width: 2280,
    height: 1174,
  },
  {
    src: "/devclean/screenshots/quick-clean-dry-run.png",
    title: "Hızlı Temizlik (Dry Run)",
    body: "Hiçbir şey silmeden önce, temizlik işleminin tam olarak ne yapacağını önizler.",
    width: 2940,
    height: 1846,
  },
  {
    src: "/devclean/screenshots/whatsapp-audit.png",
    title: "WhatsApp Denetimi",
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
    "Geliştirici disk kullanımını denetleyen, geliştirme ortamını teşhis eden ve geri kazanılabilir önbellekleri güvenle temizleyen bir macOS CLI aracı.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DevcleanPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      <section className="relative isolate overflow-hidden bg-brand-navy-deep px-5 pt-28 pb-16 text-white sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.18),rgba(11,24,46,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <Reveal as="div" className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-brand-red/25 bg-brand-red/10 px-3 py-2 text-xs font-semibold text-red-100 shadow-lg shadow-black/30">
            <TerminalSquare size={15} aria-hidden="true" />
            Pharos Labs / Açık Kaynak
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">devclean</h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-red-200 sm:text-xl">
            Geliştirici disk alanınızı güvenle geri kazanın.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Xcode, Flutter, Simulator, Node.js, CocoaPods ve Homebrew depolama alanını proje dosyalarınıza
            veya kişisel verilerinize dokunmadan güvenle denetleyin.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={GITHUB_URL} variant="primary" size="lg" aria-label="devclean deposunu GitHub'da görüntüle">
              <GitFork size={17} aria-hidden="true" />
              GitHub&apos;da Görüntüle
            </Button>
            <a
              href="#install"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/6 px-5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/32 hover:bg-white/10"
            >
              Kurulum
            </a>
            <Button
              href={RELEASE_URL}
              variant="secondary"
              size="lg"
              className="text-white"
              aria-label={`devclean ${CURRENT_VERSION} sürümünü indir`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              {CURRENT_VERSION} Sürümünü İndir
            </Button>
          </div>
        </Reveal>
      </section>

      <section
        id="install"
        className="relative bg-[linear-gradient(180deg,#eef4f8_0%,#ffffff_42%,#edf3f7_100%)] py-16 text-brand-navy sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Hızlı Kurulum
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              Üç adımda çalıştırın.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Klonlayın, kurun ve ilk taramayı başlatın. devclean hiçbir onay istemeden hiçbir şeyi silmez.
            </p>
          </Reveal>

          <div className="mt-8">
            <CopyInstallCommand command={installCommand} />
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Ekran Görüntüleri
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              Ne yaptığını göster, tahmin ettirme.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {screenshots.map((shot, index) => (
              <Reveal key={shot.src} delay={(index % 2) * 0.08}>
                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative w-full overflow-hidden bg-brand-navy-deep">
                    <Image
                      src={shot.src}
                      alt={`devclean ${shot.title} ekran görüntüsü`}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="text-base font-semibold">{shot.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{shot.body}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Güvenlik
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              Önce güvenlik, sonra temizlik.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {safetyItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={(index % 5) * 0.05}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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

      <section className="relative overflow-hidden bg-brand-navy-deep py-16 text-white sm:py-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(233,27,48,0.14),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(255,255,255,0.06),transparent_24rem)]"
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
            Açık Kaynak
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">MIT Lisansı ile açık kaynak.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            devclean, Pharos Teknoloji tarafından geliştirilmekte ve MIT Lisansı ile yayınlanmaktadır.
          </p>

          <div className="mt-7">
            <Button href={GITHUB_URL} variant="primary" size="lg" aria-label="devclean deposunu GitHub'da yıldızla">
              <Star size={17} aria-hidden="true" />
              GitHub&apos;da Yıldızla
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Neden Önemli?
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal sm:text-4xl">
              Mühendislik yaklaşımımızın somut bir örneği.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              devclean, ticari projelerimizde uyguladığımız aynı standartlarla geliştirildi: güvenlik önce
              gelir, her işlem test edilir ve her sürüm belgelenir.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringItems.map((item, index) => (
              <Reveal key={item} delay={(index % 3) * 0.05}>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Cpu size={18} className="text-brand-red-strong" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
