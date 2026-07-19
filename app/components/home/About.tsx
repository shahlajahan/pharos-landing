import { CheckCircle2 } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";

const strengths = [
  "Özel yazılım ve entegrasyonlar",
  "Mobil ve web ürün teslimi",
  "Yapay zeka destekli iş akışları",
  "Güvenli yayına alma ve uzun vadeli destek",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-navy-deep pt-20 pb-10 text-white sm:pt-28 sm:pb-14">
      <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-8">
        <Reveal className="pt-1 lg:pt-3">
          <Badge tone="red">Hakkımızda</Badge>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Net hedefler, güçlü mimari, sürdürülebilir ürünler.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="text-base leading-8 text-slate-300">
          <p>
            Pharos Teknoloji, şirketlerin dijital ürünlerini fikir aşamasından
            canlı sisteme taşıyan bir yazılım geliştirme partneridir. Özel
            yazılım geliştirme, mobil uygulama geliştirme, web çözümleri,
            yapay zeka çözümleri ve dijital ürün geliştirme alanlarında
            tasarım, mühendislik, entegrasyon, test ve bakım hizmetleri sunarız.
          </p>
          <p className="mt-5 text-slate-400">
            Netlik, hız, güvenlik ve sürdürülebilirliğe odaklanan pratik bir teslimat modeliyle
            çalışıyor; özel yazılım, mobil uygulama, web platformları, yapay zeka iş akışları ve
            dijital ürünlerde güvenilir bir uygulama arayan ekipler için çözüm ortağı oluyoruz.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {strengths.map((item) => (
              <div key={item} className="flex items-center gap-3 border-t border-white/10 py-3">
                <CheckCircle2 size={18} className="shrink-0 text-brand-red" />
                <span className="text-sm font-semibold text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
