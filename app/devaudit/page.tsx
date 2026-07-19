import type { Metadata } from "next";
import {
  Blocks,
  Bot,
  FileJson,
  GitFork,
  Languages,
  SlidersHorizontal,
  Star,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { siteUrl } from "../company";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import { CopyInstallCommand } from "../devclean/CopyInstallCommand";

const GITHUB_URL = "https://github.com/shahlajahan/devaudit";
const CURRENT_VERSION = "v0.1.0-dev.2";

export const metadata: Metadata = {
  title: "DevAudit | Pharos Labs",
  description: "Flutter, Dart ve modern yazılım projeleri için geliştirici denetim platformu.",
  alternates: {
    canonical: "/devaudit",
  },
  openGraph: {
    title: "DevAudit | Pharos Labs",
    description:
      "Otomatik kod kalitesi, lokalizasyon ve mimari denetimleriyle yazılım projelerinizi analiz edin, anlayın ve iyileştirin.",
    url: "/devaudit",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
  },
};

const featureItems = [
  {
    icon: Blocks,
    title: "Eklenti tabanlı mimari",
    body: "Çekirdek motor dilden bağımsızdır; yeni denetimler eklenti olarak eklenir.",
  },
  {
    icon: Languages,
    title: "Flutter/Dart lokalizasyon denetimi",
    body: "Kullanıcıya görünen ama henüz lokalize edilmemiş metinleri tespit eder.",
  },
  {
    icon: SlidersHorizontal,
    title: "Genişletilebilir kural motoru",
    body: "Yeni kurallar tanımlanarak denetim kapsamı projeye özel genişletilebilir.",
  },
  {
    icon: FileJson,
    title: "JSON ve Markdown raporlar",
    body: "Bulgular hem makine hem de insan tarafından okunabilir formatlarda üretilir.",
  },
  {
    icon: Bot,
    title: "AI ajanlarına hazır raporlar",
    body: "Büyük denetimler, bir AI ajanının bağlam penceresine sığacak görev paketlerine bölünür.",
  },
  {
    icon: Workflow,
    title: "Geliştirici iş akışına entegrasyon",
    body: "CLI üzerinden mevcut geliştirme sürecine ve otomasyonlara kolayca dahil edilir.",
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
    "Ekiplerin sorunları tespit etmesine, kod sağlığını anlamasına ve yazılım kalitesini artırmasına yardımcı olan genişletilebilir bir geliştirici denetim platformu.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DevAuditPage() {
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

          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">DevAudit</h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-red-200 sm:text-xl">
            Yapay zeka dostu geliştirici denetim platformu
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Modern yazılım projeleri için geliştirici denetim platformu. Kod kalitesi, lokalizasyon ve
            mimari analizleri otomatikleştirin.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Ekiplerin sorunları tespit etmesine, kod sağlığını anlamasına ve yazılım kalitesini
            artırmasına yardımcı olan genişletilebilir bir geliştirici denetim platformu.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={GITHUB_URL} variant="primary" size="lg" aria-label="DevAudit deposunu GitHub'da görüntüle">
              <GitFork size={17} aria-hidden="true" />
              GitHub&apos;da Görüntüle
            </Button>
            <a
              href="#install"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/6 px-5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/32 hover:bg-white/10"
            >
              Kurulum
            </a>
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
              Dört adımda çalıştırın.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Klonlayın, bağımlılıkları kurun ve ilk taramayı başlatın.
            </p>
          </Reveal>

          <div className="mt-8">
            <CopyInstallCommand command={installCommand} />
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#edf3f7_0%,#f8fafc_100%)] py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Özellikler
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              Analiz et. Anla. İyileştir.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={(index % 3) * 0.06}>
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

      <section className="relative bg-white py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Reveal className="rounded-2xl border border-slate-200 bg-brand-mist p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red-strong">
              Proje Durumu
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Erken aşama, aktif geliştirme.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              DevAudit henüz {CURRENT_VERSION} sürümünde ve aktif geliştirme aşamasındadır. Ekran
              görüntüleri, gerçek bir sürüm yayınlandığında eklenecektir — o zamana kadar burada
              olmayan görselleri uydurmak yerine gerçek durumu paylaşmayı tercih ediyoruz.
            </p>
            <Button
              href={GITHUB_URL}
              variant="secondary"
              size="md"
              className="mt-6 text-brand-navy"
              aria-label="DevAudit deposunu GitHub'da takip et"
            >
              <GitFork size={16} aria-hidden="true" />
              GitHub&apos;da takip edin
            </Button>
          </Reveal>
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
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Apache 2.0 Lisansı ile açık kaynak.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            DevAudit, Pharos Labs tarafından geliştirilmekte ve Apache License 2.0 ile
            yayınlanmaktadır.
          </p>

          <div className="mt-7">
            <Button href={GITHUB_URL} variant="primary" size="lg" aria-label="DevAudit deposunu GitHub'da yıldızla">
              <Star size={17} aria-hidden="true" />
              GitHub&apos;da Yıldızla
            </Button>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
