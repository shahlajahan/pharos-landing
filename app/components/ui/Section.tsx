import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "navy" | "paper" | "mist";

const tones: Record<Tone, string> = {
  navy: "bg-brand-navy-deep text-white",
  paper: "bg-brand-paper text-brand-navy",
  mist: "bg-brand-mist text-brand-navy",
};

export function Section({
  id,
  tone = "paper",
  children,
  className = "",
  containerClassName = "",
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-24 lg:py-28 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
