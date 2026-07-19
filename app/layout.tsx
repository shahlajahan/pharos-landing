import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CookieConsent } from "./components/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pharos Teknoloji | Mobil, Yapay Zeka ve Özel Yazılım",
  description:
    "Pharos Teknoloji; hırslı ekipler için mobil uygulama, yapay zeka çözümleri ve özel yazılım geliştirir.",
  metadataBase: new URL("https://pharosteknoloji.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pharos Teknoloji",
    description:
      "Modern şirketler için mobil geliştirme, yapay zeka çözümleri ve özel yazılım.",
    url: "https://pharosteknoloji.com.tr",
    siteName: "Pharos Teknoloji",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pharos Teknoloji" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharos Teknoloji",
    description:
      "Modern şirketler için mobil geliştirme, yapay zeka çözümleri ve özel yazılım.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b182e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          İçeriğe geç
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
