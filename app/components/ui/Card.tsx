import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`rounded-2xl border border-current/10 bg-current/[0.03] p-6 sm:p-7 ${className}`}
    >
      {children}
    </Tag>
  );
}
