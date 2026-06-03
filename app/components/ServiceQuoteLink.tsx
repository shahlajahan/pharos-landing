"use client";

import { MouseEvent, ReactNode } from "react";

type ServiceQuoteLinkProps = {
  service: string;
  className: string;
  children: ReactNode;
};

export function ServiceQuoteLink({ service, className, children }: ServiceQuoteLinkProps) {
  const href = `/?service=${encodeURIComponent(service)}#contact`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    window.history.pushState(null, "", href);
    window.dispatchEvent(
      new CustomEvent("pharos:service-select", { detail: service }),
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
