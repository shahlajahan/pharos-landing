import Image from "next/image";
import { company, footerLinks } from "../company";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08111f] px-5 py-10 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_1.4fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={42} height={42} className="h-10 w-10 rounded-md" />
            <div>
              <p className="text-sm font-semibold text-white">{company.brand}</p>
              <p className="text-xs">Mobile, AI and Custom Software</p>
            </div>
          </div>

          <address className="mt-5 max-w-xl not-italic text-sm leading-7">
            <p className="font-semibold text-slate-200">{company.name}</p>
            <p>{company.address}</p>
            <p>
              <a href={company.phoneHref} className="transition hover:text-white">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={company.emailHref} className="transition hover:text-white">
                {company.email}
              </a>
            </p>
            <p>MERSIS: {company.mersis}</p>
            <p>Vergi No: {company.taxNumber}</p>
          </address>
        </div>

        <div className="lg:pt-1">
          <section
            aria-label="Güvenli ödeme yöntemleri"
            className="mb-6 rounded-lg border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Güvenli Ödeme Altyapısı
              </h2>
              <Image
                src="/payments/iyzico-logo-band-colored.svg"
                alt="iyzico, Visa, Mastercard ve desteklenen güvenli ödeme yöntemleri"
                width={429}
                height={32}
                className="h-8 w-full max-w-[429px] rounded-md bg-white object-contain object-center"
              />
            </div>
          </section>

          <nav aria-label="Alt bilgi bağlantıları" className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-medium text-slate-300 transition hover:border-emerald-300/35 hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="mt-7 text-sm">
            © {new Date().getFullYear()} Pharos Teknoloji. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
