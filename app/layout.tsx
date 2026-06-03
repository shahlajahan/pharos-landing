import type { Metadata, Viewport } from "next";
import { CookieConsent } from "./components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pharos Teknoloji | Mobile, AI and Custom Software",
  description:
    "Pharos Teknoloji builds mobile applications, AI solutions, and custom software for ambitious teams.",
  metadataBase: new URL("https://pharosteknoloji.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pharos Teknoloji",
    description:
      "Mobile development, AI solutions, and custom software for modern companies.",
    url: "https://pharosteknoloji.com.tr",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08111f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
