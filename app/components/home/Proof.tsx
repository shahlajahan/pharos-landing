import Link from "next/link";
import { ArrowRight, Database, GitFork, ScanSearch, Terminal } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { HubmonixTeaser, PetsupoTeaser } from "../products/HubmonixShowcase";

const openSourceProducts = [
  {
    slug: "devaudit",
    name: "DevAudit",
    icon: ScanSearch,
    description: "Eklenti tabanlı analiz ve AI-uyumlu raporlar sunan geliştirici denetim platformu.",
    tags: ["Açık Kaynak", "Dart", "Flutter", "CLI"],
    href: "/devaudit",
    githubUrl: "https://github.com/shahlajahan/devaudit",
  },
  {
    slug: "devclean",
    name: "devclean",
    icon: Terminal,
    description:
      "Geliştirici disk kullanımını denetleyen, geliştirme ortamını teşhis eden ve geri kazanılabilir önbellekleri güvenle temizleyen bir macOS CLI aracı.",
    tags: ["Açık Kaynak", "macOS", "Bash", "Flutter", "Xcode"],
    href: "/devclean",
    githubUrl: "https://github.com/shahlajahan/devclean",
  },
];

export function Proof() {
  return (
    <section id="work" className="relative bg-brand-navy-deep py-24 text-white sm:py-32">
      <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <Badge tone="red">Kanıt</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Portföy sunumu değil, gerçek ürünler.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            İki amiral gemisi ürün, geliştiricilere yönelik açık kaynak araçlar ve dahili bir iş
            zekası platformu.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <article className="group relative overflow-hidden rounded-2xl border border-white/14 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-5">
                <PetsupoTeaser />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-200">
                    Amiral Gemisi Ürün
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Petsupo</h3>
                </div>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Evcil hayvan sahiplerini veterinerler, bakım salonları, pet otelleri, pet taksileri,
                barınaklar ve sahiplendirme merkezleriyle tek bir entegre platformda buluşturan bir
                ekosistem — tek bir sorunu çözmek yerine, Petsupo bütün ekosistemi sadeleştirir.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Button href="/products/petsupo" variant="primary" size="lg" className="group/btn">
                Ürünü Keşfet
                <ArrowRight size={16} className="transition group-hover/btn:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-4">
          <article className="group relative overflow-hidden rounded-2xl border border-white/14 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-5">
                <HubmonixTeaser />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-200">
                    Amiral Gemisi Ürün
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Hubmonix</h3>
                </div>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Güvenilir lüks markaları, hizmetleri ve ajansları tek bir uygulamada buluşturan
                premium bir keşif platformu — kalabalık bir dizin değil, küratörlü bir deneyim.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Button href="/products/hubmonix" variant="primary" size="lg" className="group/btn">
                Ürünü Keşfet
                <ArrowRight size={16} className="transition group-hover/btn:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </article>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {openSourceProducts.map((product, index) => {
            const Icon = product.icon;

            return (
              <Reveal key={product.slug} delay={index * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/14 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition hover:border-brand-red/30 hover:bg-white/[0.1] sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-brand-navy shadow-lg shadow-black/15">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">{product.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-1 items-end gap-3">
                    <Button href={product.href} variant="primary" size="md">
                      Ürünü incele
                      <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                    <Link
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${product.name} deposunu GitHub'da görüntüle`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/6 px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      <GitFork size={16} aria-hidden="true" />
                      GitHub
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold text-slate-200">Neden paylaşıyoruz?</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Açık kaynak araçlar, mühendislik yaklaşımımızın somut bir kanıtıdır: güvenlik önce gelir,
            her işlem test edilir ve her sürüm belgelenir. Bu, ticari projelerimizde uyguladığımız
            standartların aynısıdır.
          </p>
        </Reveal>

        <Reveal className="mt-4">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10 text-white">
                <Database size={18} aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-white">LeadForge</h3>
                  <Badge tone="neutral">Aktif Geliştirme</Badge>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Dahili iş zekası ve potansiyel müşteri keşif platformumuz.
                </p>
              </div>
            </div>
            <Button href="/contact" variant="secondary" size="sm" className="shrink-0">
              İletişime Geçin
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
