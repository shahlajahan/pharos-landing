import type { ReactNode } from "react";

type Tone = "neutral" | "red" | "success";

const tones: Record<Tone, string> = {
  neutral: "border-current/15 bg-current/5 text-current",
  red: "border-brand-red/25 bg-brand-red-soft text-brand-red-strong",
  success: "border-success/25 bg-success/10 text-success",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
