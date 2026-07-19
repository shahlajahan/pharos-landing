import {
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Receipt,
  ReceiptText,
  Send,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";

const processSteps = [
  {
    icon: Send,
    title: "Talebinizi Gönderin",
    body: "İhtiyacınızı ve proje detaylarınızı paylaşın.",
  },
  {
    icon: ReceiptText,
    title: "Ücretsiz Ön Görüşme",
    body: "Kapsamınızı birlikte değerlendirelim ve size özel bir teklif hazırlayalım.",
  },
  {
    icon: ThumbsUp,
    title: "Teklifi Onaylayın",
    body: "Kapsam ve fiyat teklifini onaylayın.",
  },
  {
    icon: CreditCard,
    title: "Güvenli Ödeme Yapın",
    body: "Onaylanan teklif için güvenli ödeme bağlantısı üzerinden ödeme yapılır.",
  },
  {
    icon: ClipboardCheck,
    title: "Geliştirmeye Başlayalım",
    body: "Teslim planı ile geliştirme sürecine geçiyoruz.",
  },
];

const trustItems = [
  { icon: ShieldCheck, title: "Güvenli ödeme" },
  { icon: FileCheck2, title: "Sözleşmeye dayalı geliştirme" },
  { icon: Receipt, title: "Her satın alma için fatura" },
  { icon: ClipboardCheck, title: "Ödeme sonrası proje kickoff" },
];

export function Process() {
  return (
    <section className="relative bg-brand-mist py-24 text-brand-navy sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <Badge tone="red">Nasıl çalışıyoruz?</Badge>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Talepten çalışan yazılıma beş adım.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.title} delay={(index % 5) * 0.06}>
                <div className="relative border-t-2 border-brand-red-strong pt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-brand-red-strong">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <Icon size={17} className="text-slate-400" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-base font-semibold">{step.title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-slate-200 pt-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600">
                <Icon size={16} className="text-brand-red-strong" aria-hidden="true" />
                {item.title}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
