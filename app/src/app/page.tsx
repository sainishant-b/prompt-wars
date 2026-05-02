"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { DEFAULT_LANGUAGE, getLanguage, isValidLanguage } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("matdata-mitra:lang");
      if (saved && isValidLanguage(saved)) {
        setLanguage(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("matdata-mitra:lang", lang);
      } catch {
        // ignore
      }
    }
  };

  const lang = getLanguage(language);

  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <nav
        className="flex items-center justify-between border-b border-outline-variant bg-surface px-6 py-3"
        aria-label="Top navigation"
      >
        <div className="flex items-center gap-2">
          <GoogleGLogo />
          <span className="text-base font-medium text-on-surface">
            <span className="google-gradient">Matdata</span> Mitra
          </span>
        </div>
        <a
          href="https://eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="m3-btn m3-btn-text text-sm"
        >
          ECI
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
          </svg>
        </a>
      </nav>

      <header className="px-6 pt-16 pb-8 text-center">
        <h1
          className="text-5xl font-normal tracking-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="google-gradient">Matdata</span>{" "}
          <span className="text-on-surface">Mitra</span>
        </h1>
        <p
          className="mx-auto mt-3 text-2xl font-normal text-on-surface-variant"
          lang="hi"
        >
          मतदाता मित्र
        </p>
        <p className="mx-auto mt-6 max-w-xl text-lg text-on-surface-variant">
          {lang.appTagline}
        </p>
      </header>

      <section
        className="mx-auto mt-4 w-full max-w-3xl px-6"
        aria-labelledby="lang-heading"
      >
        <h2
          id="lang-heading"
          className="mb-4 text-center text-sm font-medium text-on-surface-variant"
        >
          {lang.selectLanguagePrompt}
        </h2>
        <LanguageSelector value={language} onChange={handleLanguageChange} />
      </section>

      <div className="mx-auto mt-10 px-6">
        <Link
          href="/chat"
          className="m3-btn m3-btn-filled !h-12 !px-8 !text-base"
          aria-label={lang.startChatLabel}
        >
          {lang.startChatLabel}
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </Link>
      </div>

      <section
        className="mx-auto mt-16 grid w-full max-w-5xl gap-4 px-6 sm:grid-cols-3"
        aria-label="Features"
      >
        <FeatureCard
          icon={<TranslateIcon />}
          color="var(--google-blue)"
          title="10 Languages"
          body="Hindi, English, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi"
        />
        <FeatureCard
          icon={<TuneIcon />}
          color="var(--google-red)"
          title="Adaptive Explanations"
          body="Simple for first-timers, detailed citations for experts. Adjusts as you ask."
        />
        <FeatureCard
          icon={<VerifiedIcon />}
          color="var(--google-green)"
          title="Official Information"
          body="Backed by ECI guidelines, RPA 1950 & 1951, and the Constitution of India."
        />
      </section>

      <footer className="mt-auto px-6 py-10 text-center text-xs text-on-surface-variant">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>Powered by</span>
          <span className="font-medium text-on-surface">Google Gemini</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-on-surface">Google Cloud Run</span>
          <span aria-hidden="true">·</span>
          <a
            href="tel:1950"
            className="font-medium text-primary hover:underline"
          >
            Voter Helpline 1950
          </a>
        </div>
        <p className="mt-3">
          Built for PromptWars Challenge 2 (Hack2skill × Google for Developers)
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  color,
  title,
  body,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  body: string;
}) {
  return (
    <div className="m3-elevated p-6">
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: `color-mix(in oklab, ${color} 16%, transparent)` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <h3 className="text-lg font-medium text-on-surface">{title}</h3>
      <p className="mt-2 text-sm text-on-surface-variant">{body}</p>
    </div>
  );
}

function GoogleGLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      aria-hidden="true"
      role="img"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function TranslateIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
    </svg>
  );
}

function TuneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
    </svg>
  );
}
