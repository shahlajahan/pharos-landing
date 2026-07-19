import { ContactForm } from "../ContactForm";
import { Reveal } from "../motion/Reveal";
import { Badge } from "../ui/Badge";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-navy pt-16 pb-16 text-white shadow-[0_-18px_56px_rgba(11,24,46,0.25)] sm:pt-20 sm:pb-20"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(233,27,48,0.14),transparent_28rem),radial-gradient(circle_at_90%_0%,rgba(255,255,255,0.08),transparent_24rem)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.04fr] lg:gap-8">
          <Reveal className="flex h-full min-h-[28rem] flex-col rounded-2xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7 lg:min-h-0 lg:p-8">
            <div>
              <Badge tone="red">İletişim</Badge>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-5xl">
                Yeni ürününüzü veya yazılım ihtiyacınızı konuşalım.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Ne geliştirmek istediğinizi anlatın. Doğru kapsamı, teknik yolu ve teslim planını
                birlikte şekillendirelim.
              </p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:mt-auto lg:pt-10">
              {["Mobil", "Yapay Zeka", "Yazılım"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                  <p className="text-sm font-semibold">{item}</p>
                  <p className="mt-1 text-xs text-slate-400">Premium teslimat</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm
              variant="home"
              className="h-full rounded-2xl border border-white/14 bg-white/10 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
