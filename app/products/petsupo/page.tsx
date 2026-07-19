import type { Metadata } from "next";
import {
  Bell,
  Cloud,
  Cpu,
  Layers,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { Reveal } from "../../components/motion/Reveal";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { PetsupoEcosystemShowcase } from "../../components/products/PetsupoEcosystemShowcase";

export const metadata: Metadata = {
  title: "Petsupo | Pharos Teknoloji",
  description:
    "Petsupo, Pharos'un amiral gemisi ürünüdür — evcil hayvan sahiplerini veterinerler, bakım salonları, pet otelleri, taksiler, barınaklar ve sahiplendirme merkezleriyle tek bir platformda buluşturan bir ekosistem.",
  alternates: {
    canonical: "/products/petsupo",
  },
  openGraph: {
    title: "Petsupo | Pharos Teknoloji",
    description:
      "Evcil hayvan sahiplerini pet sektöründeki işletmelerle tek bir entegre platformda buluşturan bir ekosistem.",
    url: "/products/petsupo",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
  },
};

const engineeringChallenges = [
  {
    icon: ShieldCheck,
    title: "Çok rollü kimlik doğrulama",
    body: "Evcil hayvan sahipleri, işletmeler ve yöneticiler için birbirinden farklı izin ve akışlar gerekir.",
  },
  {
    icon: Layers,
    title: "İşletme yönetim iş akışları",
    body: "Veterinerler, bakım salonları, oteller ve taksiler için randevu, rezervasyon ve envanter mantığı.",
  },
  {
    icon: MessageSquare,
    title: "Gerçek zamanlı mesajlaşma ve bildirimler",
    body: "Sahipler ile işletmeler arasında gecikmesiz koordinasyon.",
  },
  {
    icon: MapPin,
    title: "Konum tabanlı hizmetler",
    body: "Yakındaki hizmetleri, taksileri ve barınakları bulma.",
  },
  {
    icon: Search,
    title: "Arama ve değerlendirmeler",
    body: "Sahiplerin güvenilir işletmeleri bulup değerlendirmesine yardımcı olma.",
  },
  {
    icon: Cloud,
    title: "Ölçeklenebilir bulut altyapısı",
    body: "Katılımcı ve modül sayısı arttıkça dayanıklı kalan bir backend.",
  },
];

const technologies = ["Flutter", "Firebase", "Cloud Functions", "Firestore", "Google Maps", "Push Notifications", "Cloud Storage"];

const modules = [
  "Veteriner randevuları",
  "Bakım randevuları",
  "Pet oteli rezervasyonları",
  "Pet taksi rezervasyonu",
  "Sahiplendirme hizmetleri",
  "Kayıp & Bulundu",
  "Topluluk özellikleri",
  "Mesajlaşma",
  "Değerlendirmeler",
  "İşletme panoları",
];

const futureDirection = [
  "Yapay zeka destekli pet bakımı",
  "Akıllı öneriler",
  "İşletme analitiği",
  "Pazar yeri genişlemesi",
];

export default function PetsupoPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="relative isolate overflow-hidden bg-brand-navy-deep px-5 pt-28 pb-16 text-white sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.18),rgba(11,24,46,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <Reveal className="relative mx-auto max-w-5xl">
          <Badge tone="red">Amiral Gemisi Ürün</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">Petsupo</h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-red-200 sm:text-xl">
            Pet sektörü için tek bir ekosistem — bir uygulama daha değil.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Pet sektörü, birbirinden bağımsız birçok katılımcıdan oluşur — sahipler, veterinerler,
            bakım salonları, oteller, taksiler, mağazalar, barınaklar ve sahiplendirme merkezleri.
            Mevcut yazılımların çoğu bu ekosistemin yalnızca tek bir parçasına hitap eder. Petsupo,
            bunları tek ve entegre bir platform üzerinden birbirine bağlamak için tasarlandı.
          </p>
        </Reveal>
      </section>

      <section className="relative bg-brand-paper py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge tone="red">Ekosistem</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tek platform, birçok katılımcı.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Petsupo, tek bir izole sorunu çözmek yerine, pet bakım ekosistemini oluşturan kişileri
              ve işletmeleri birbirine bağlar.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <PetsupoEcosystemShowcase />
          </Reveal>
        </div>
      </section>

      <section className="relative bg-brand-mist py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge tone="red">Mühendislik</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Çözdüğümüz mühendislik problemleri.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Petsupo&apos;yu inşa etmek, tipik tek amaçlı bir uygulamadan çok daha karmaşık sorunların
              çözülmesini gerektirdi.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringChallenges.map((item, index) => {
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
                Çapraz platform, bulut tabanlı bir teknoloji yığını üzerine inşa edildi.
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
              <Badge tone="red">Kapsam</Badge>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Bir özellik listesi değil, bir ekosistem.</h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
                {modules.map((module) => (
                  <li key={module} className="flex items-center gap-2">
                    <Cpu size={14} className="text-brand-red-strong" aria-hidden="true" />
                    {module}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-mist py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge tone="red">Değer</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Petsupo kullanıcıları için neyi değiştiriyor.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Bell size={20} className="text-brand-red-strong" aria-hidden="true" />
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Evcil hayvan sahipleri; veteriner bakımını, bakım salonu randevularını, otel ve
                  taksi hizmetlerini ayrı ayrı uygulamalar ve telefon görüşmeleriyle uğraşmak yerine
                  tek bir yerden yönetir.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Star size={20} className="text-brand-red-strong" aria-hidden="true" />
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Pet işletmeleri, dağınık araçlar yerine ortak bir platform ve kendilerine ait
                  işletme panoları üzerinden sahiplere ulaşır.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-brand-paper py-16 text-brand-navy sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge tone="red">Gelecek</Badge>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Petsupo&apos;nun yol haritası.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Aşağıdakiler dokümante edilmiş gelecek yönelimleridir, mevcut özellikler değil —
              hiçbiri bugün itibarıyla canlı değildir.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {futureDirection.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy-deep py-16 text-white sm:py-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(233,27,48,0.14),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(255,255,255,0.06),transparent_24rem)]"
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Her iş birliğine getirdiğimiz standart budur.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Petsupo, Pharos&apos;un mühendislik standartlarını temsil eder — müşteri projelerinde
            uyguladığımız aynı titizlik, mimari düşünce ve uzun vadeli sürdürülebilirlik.
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
