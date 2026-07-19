import {
  Bot,
  Cloud,
  Compass,
  Globe2,
  Layers,
  Network,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";

const capabilities = [
  {
    icon: Layers,
    title: "Ürün Mühendisliği",
    body: "Fikirden canlı sisteme; ürün keşfi, teknik planlama ve MVP geliştirme.",
  },
  {
    icon: Smartphone,
    title: "Mobil Uygulama Geliştirme",
    body: "Native his, performans ve uzun vadeli sürdürülebilirliğe odaklanan çapraz platform mobil uygulamalar.",
  },
  {
    icon: Globe2,
    title: "Web Uygulama Geliştirme",
    body: "Modern web mimarisi üzerinde müşteri portalları, panolar, kurum içi araçlar ve SaaS platformları.",
  },
  {
    icon: Server,
    title: "Backend Mühendisliği",
    body: "Ölçeklenmek üzere tasarlanmış kimlik doğrulama, API'ler, veritabanı mimarisi ve iş mantığı.",
  },
  {
    icon: Cloud,
    title: "Bulut Mimarisi",
    body: "Ölçeklenebilirlik, güvenilirlik ve maliyet bilinciyle planlanmış bulut altyapısı.",
  },
  {
    icon: Bot,
    title: "Yapay Zeka Entegrasyonu",
    body: "Ürünü gerçekten iyileştirdiği yerlerde entegre edilen LLM destekli özellikler, iş akışı otomasyonu ve akıllı arama.",
  },
  {
    icon: Network,
    title: "Yazılım Mimarisi",
    body: "Teknik borcu kontrol altında tutan mimari incelemeler, sistem tasarımı ve teknoloji seçimi.",
  },
  {
    icon: Compass,
    title: "Teknik Danışmanlık",
    body: "Mimari, performans ve geliştirici verimliliği üzerine mühendislik odaklı danışmanlık.",
  },
  {
    icon: Wrench,
    title: "Modernizasyon",
    body: "Var olanı gereksiz yere değiştirmek yerine iyileştiren legacy modernizasyonu, performans optimizasyonu ve altyapı güncellemeleri.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-brand-navy-deep py-24 text-white sm:py-32">
      <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <Badge tone="red">Uzmanlık</Badge>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Dokuz mühendislik yetkinliği, tek bir ortak.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Bunlar her iş birliğine getirdiğimiz disiplinlerdir — aşağıdaki başlangıç paketleri bu
            ortaklığa açılan kapılardır, tamamı değil.
          </p>
        </Reveal>

        <div className="mt-16 grid divide-y divide-white/10 border-t border-white/10 lg:grid-cols-2 lg:gap-x-12 lg:divide-y-0">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={(index % 2) * 0.05}
                className="group relative border-white/10 lg:border-t"
              >
                <div className="flex items-start gap-5 py-7 transition-colors">
                  <span className="mt-1 text-sm font-semibold text-slate-600 transition-colors group-hover:text-brand-red">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-400 transition-colors group-hover:border-brand-red/40 group-hover:bg-brand-red/10 group-hover:text-brand-red">
                    <Icon size={19} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
