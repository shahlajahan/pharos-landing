import type { Metadata } from "next";
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { Badge } from "../../components/ui/Badge";
import { getPaymentLinkDisplayState } from "@/lib/payment/payment-links";
import { PayForm } from "../PayForm";

export const metadata: Metadata = {
  title: "Ödeme | Pharos Teknoloji",
  description: "Pharos Teknoloji özel ödeme linki.",
  robots: {
    index: false,
    follow: false,
  },
};

type PayReferencePageProps = {
  params: Promise<{
    referenceId: string;
  }>;
};

const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
});

function NoticeCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/14 bg-white/10 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
      {icon}
      <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck size={16} aria-hidden="true" />
        Bağlantılar tahmin edilemeyecek şekilde oluşturulur ve tek bir ödeme için geçerlidir.
      </div>
    </div>
  );
}

export default async function PayReferencePage({ params }: PayReferencePageProps) {
  const { referenceId } = await params;
  const state = await getPaymentLinkDisplayState(referenceId);

  return (
    <main id="main-content" className="min-h-screen bg-brand-navy-deep text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,27,48,0.16),rgba(11,24,46,0.12)_38%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <Badge tone="red">Güvenli Ödeme</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-6xl">Güvenli ödeme</h1>

          {state.kind === "payable" && (
            <>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Aşağıdaki ödeme, Pharos Teknoloji tarafından sizin için oluşturulmuştur. Devam etmek için
                bilgilerinizi girin.
              </p>
              <PayForm
                paymentType={state.link.paymentType}
                referenceId={state.link.referenceId}
                title={state.link.title}
                description={state.link.description}
                priceLabel={currencyFormatter.format(state.link.amount)}
                typeLabel={
                  state.link.paymentType === "deposit"
                    ? "Proje Depozitosu"
                    : "Özel Ödeme Linki"
                }
              />
            </>
          )}

          {state.kind === "consumed" && (
            <NoticeCard
              icon={<CheckCircle2 size={28} className="mx-auto text-success" aria-hidden="true" />}
              title="Bu ödeme zaten tamamlandı."
              body="Bu bağlantı üzerinden ödeme daha önce başarıyla alınmıştır ve tekrar kullanılamaz. Bir sorunuz varsa Pharos Teknoloji ekibiyle iletişime geçin."
            />
          )}

          {state.kind === "expired" && (
            <NoticeCard
              icon={<AlertCircle size={28} className="mx-auto text-warning" aria-hidden="true" />}
              title="Bu ödeme bağlantısının süresi doldu."
              body="Yeni bir ödeme bağlantısı için lütfen Pharos Teknoloji ekibiyle iletişime geçin."
            />
          )}

          {state.kind === "not_found" && (
            <NoticeCard
              icon={<AlertCircle size={28} className="mx-auto text-warning" aria-hidden="true" />}
              title="Ödeme linki bulunamadı."
              body="Bu bağlantı geçersiz olabilir. Doğru bağlantı için lütfen Pharos Teknoloji ekibiyle iletişime geçin."
            />
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
