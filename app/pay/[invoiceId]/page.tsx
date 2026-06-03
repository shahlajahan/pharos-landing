import type { Metadata } from "next";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Secure Payment | Pharos Teknoloji",
  description: "Secure payment page placeholder for approved Pharos Teknoloji projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentPlaceholderPage() {
  return (
    <main className="min-h-screen bg-[#08111f] px-5 py-12 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-2xl border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
              Secure Payment
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Project Payment
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
            <LockKeyhole size={22} aria-hidden="true" />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Project Name
            </p>
            <p className="mt-2 text-lg font-semibold text-white">Project Name</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Project Amount
            </p>
            <p className="mt-2 text-lg font-semibold text-white">Project Amount</p>
          </div>
          <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-emerald-200" aria-hidden="true" />
              <p className="text-sm font-semibold text-emerald-100">Secure Payment</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
