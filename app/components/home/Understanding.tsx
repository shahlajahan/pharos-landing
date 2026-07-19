import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";

const audiences = [
  {
    title: "Startuplar",
    body: "Sürdürülebilir bir temeli feda etmeden ürün stratejisi, mimari ve hız.",
  },
  {
    title: "KOBİ'ler",
    body: "Teknik jargon yerine somut sonuçlarla anlatılan operasyonel verimlilik, otomasyon ve güvenilirlik.",
  },
  {
    title: "Kurumsal Ekipler",
    body: "Gerçek bir değerlendirmede sınanan dokümantasyon, mimari, güvenlik ve uzun vadeli destek.",
  },
];

export function Understanding() {
  return (
    <section className="relative bg-brand-paper py-24 text-brand-navy sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8">
        <Reveal>
          <Badge tone="red">Neden Pharos?</Badge>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Çoğu yazılım, tam da büyümesi gerektiği anda yavaşlar.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-600">
            Güvenilir yazılım, görsel olarak etkileyici yazılımdan daha değerlidir. Ekibinize eklenen
            fazladan bir kaynaktan çok, uzun vadeli bir mühendislik ortağı gibi çalışırız — mimari
            uygulamadan önce gelir ve kalite, hız uğruna asla feda edilmez.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-3">
          <div className="divide-y divide-slate-200 border-t border-slate-200">
            {audiences.map((item, index) => (
              <div key={item.title} className="flex gap-6 py-7">
                <span className="text-sm font-semibold text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
