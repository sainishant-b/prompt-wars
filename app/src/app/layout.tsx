import type { Metadata } from "next";
import { Roboto_Flex, Roboto, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matdata Mitra — Indian Election Civic Education Assistant",
  description:
    "Free, multilingual chatbot that explains the Indian election process, voter rights, and what to do when problems arise. Built for PromptWars Challenge 2 with Google Gemini and Cloud Run.",
  keywords: [
    "Indian elections",
    "voter education",
    "ECI",
    "civic education",
    "voter rights",
    "election commission of india",
    "matdata",
    "voter helpline",
  ],
  openGraph: {
    title: "Matdata Mitra",
    description: "Your friendly multilingual guide to Indian elections.",
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
      className={`h-full antialiased ${robotoFlex.variable} ${roboto.variable} ${notoDevanagari.variable}`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        {children}
      </body>
    </html>
  );
}
