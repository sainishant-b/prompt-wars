import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Tiro_Devanagari_Hindi,
  JetBrains_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Bengali,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-tiro",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "700"],
  variable: "--font-noto-dev",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["500", "700"],
  variable: "--font-noto-ta",
  display: "swap",
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["500", "700"],
  variable: "--font-noto-te",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["500", "700"],
  variable: "--font-noto-bn",
  display: "swap",
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["500", "700"],
  variable: "--font-noto-kn",
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["500", "700"],
  variable: "--font-noto-ml",
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["500", "700"],
  variable: "--font-noto-gu",
  display: "swap",
});

const notoGurmukhi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["500", "700"],
  variable: "--font-noto-pa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matdata Mitra — Voting, explained in your own language",
  description:
    "Matdata Mitra (मतदाता मित्र) is a friendly multilingual guide to Indian elections. Ask Mitra anything — registration, polling day, your rights — backed by ECI guidelines, RPA 1950 & 1951, and the Constitution.",
  keywords: [
    "Matdata Mitra",
    "Indian elections",
    "voter education",
    "ECI",
    "civic education",
    "voter rights",
    "Lok Sabha",
    "Vidhan Sabha",
    "RPA 1950",
    "RPA 1951",
  ],
  openGraph: {
    title: "Matdata Mitra",
    description: "Voting, explained in your own language.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        jakarta.variable,
        tiroHindi.variable,
        jetbrains.variable,
        notoDevanagari.variable,
        notoTamil.variable,
        notoTelugu.variable,
        notoBengali.variable,
        notoKannada.variable,
        notoMalayalam.variable,
        notoGujarati.variable,
        notoGurmukhi.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
