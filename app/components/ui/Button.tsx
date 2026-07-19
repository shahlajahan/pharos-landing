import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red-strong text-white shadow-lg shadow-brand-red-strong/25 hover:-translate-y-0.5 hover:bg-brand-red",
  secondary:
    "border border-current/20 bg-current/5 text-current hover:-translate-y-0.5 hover:bg-current/10",
  tertiary: "text-current underline-offset-4 hover:underline",
  danger: "bg-error text-white shadow-lg shadow-error/25 hover:-translate-y-0.5 hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    const isHttpLink = href.startsWith("http");
    const isExternal = isHttpLink || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      const externalDefaults = isHttpLink
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

      return (
        <a href={href} className={classes} {...externalDefaults} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
