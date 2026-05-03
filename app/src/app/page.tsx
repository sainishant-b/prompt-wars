"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HelplineCallButton } from "@/components/HelplineCallButton";
import { LanguageBallot } from "@/components/LanguageBallot";
import { StampBadge } from "@/components/StampBadge";
import { Wordmark } from "@/components/Wordmark";
import { DEFAULT_LANGUAGE, LANGUAGES, isValidLanguage } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("matdata-mitra:lang");
      if (saved && isValidLanguage(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const toggleLang = () => {
    handleLanguageChange(language === "en" ? "hi" : "en");
  };

  const lang = LANGUAGES[language];
  const currentNative = lang.nativeName;
  const otherCode = language === "en" ? "HI" : "EN";
  const [ballotLine1, ballotLine2] = lang.ballotTitle.split("\n");

  return (
    <main className="mm flex min-h-screen flex-col paper-grain text-ink">
      {/* top bar — wordmark only */}
      <nav
        className="flex items-center justify-between border-b border-paper-edge px-6 py-4 md:px-10 md:py-5"
        aria-label="Top navigation"
      >
        <Wordmark size={20} />
      </nav>

      {/* hero — two-column on desktop, stacked on mobile */}
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        {/* left column */}
        <section className="relative flex flex-col overflow-hidden px-6 py-10 md:px-14 md:py-14">
          <div
            className="chakra-bg pointer-events-none absolute hidden md:block"
            style={{
              right: -120,
              bottom: -120,
              width: 480,
              height: 480,
              opacity: 0.55,
            }}
            aria-hidden="true"
          />
          <div
            className="chakra-bg pointer-events-none absolute md:hidden"
            style={{
              right: -80,
              top: -40,
              width: 240,
              height: 240,
              opacity: 0.4,
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="mb-5 flex items-center gap-2">
              <span className="eyebrow">Bharat · Lok Sabha 2024</span>
              <span className="hidden h-px w-4 bg-paper-edge md:inline-block" />
              <span
                className="eyebrow hidden md:inline"
                style={{ color: "var(--saffron-deep)" }}
              >
                Civic Education
              </span>
            </div>

            <h1
              className="text-[44px] font-bold leading-[0.98] tracking-[-0.02em] md:text-[76px] md:tracking-[-0.025em]"
              style={{ textWrap: "pretty" }}
            >
              {lang.heroLine1}
              <br />
              <span
                className="font-medium italic"
                style={{ color: "var(--saffron-deep)" }}
              >
                {lang.heroLine2Italic}
              </span>{" "}
              <br />
              {lang.heroLine3}
            </h1>

            <p
              className="font-indic mt-4 text-[17px] text-ink-2 md:mt-5 md:text-[22px]"
              lang={language}
            >
              {lang.heroSubtitle}
            </p>

            <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-ink-2 md:mt-7 md:text-[17px] md:leading-[1.55]">
              {lang.heroBody.split("Mitra").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <b className="text-ink">Mitra</b>}
                </span>
              ))}
            </p>

            <div className="mt-7 flex flex-col gap-3 md:mt-8 md:flex-row md:items-center">
              <Link
                href="/map"
                className="btn btn-primary w-full md:w-auto"
              >
                {lang.ctaMap}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href={`/chat?lang=${language}`}
                className="btn btn-ghost w-full md:w-auto"
              >
                {lang.ctaChat}
              </Link>
            </div>
          </div>

          {/* stamps */}
          <div className="relative mt-10 flex flex-wrap items-center gap-3 md:gap-4">
            <StampBadge>ECI · Verified Sources</StampBadge>
            <StampBadge>RPA 1950 / 1951</StampBadge>
            <StampBadge>Constitution Art. 324</StampBadge>
          </div>
        </section>

        {/* right column — ballot-stub language ribbon */}
        <aside className="flex flex-col gap-6 border-t border-paper-edge bg-paper-2 px-6 py-10 md:border-l md:border-t-0 md:px-12 md:py-14">
          <div className="ballot-stub" style={{ paddingLeft: 24 }}>
            <div className="eyebrow mb-1.5">
              Form 001 · {lang.selectLanguagePrompt}
            </div>
            <h3
              className="text-[22px] font-semibold leading-tight tracking-tight md:text-[26px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {ballotLine1}
              <br />
              {ballotLine2}
            </h3>
          </div>

          <LanguageBallot value={language} onChange={handleLanguageChange} />
        </aside>
      </div>

      {/* footer — disclaimer + nav pills + helpline */}
      <footer
        className="border-t border-paper-edge bg-paper px-6 py-6 md:px-10 md:py-7"
        aria-label="Site footer"
      >
        <p
          role="note"
          className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-ink-2 md:text-[17px]"
        >
          <span
            className="mr-2 align-middle font-mono text-[13px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--saffron-deep)" }}
          >
            Preview
          </span>
          {lang.footerDisclaimer}
        </p>

        <div
          className="mx-auto mt-5 flex max-w-5xl flex-col gap-4 border-t border-dashed border-paper-edge pt-5 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-2">
            <a
              className="pill"
              href="https://github.com/sainishant-b/prompt-wars"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.footerAbout}
              <ExternalArrow />
            </a>
            <a
              className="pill"
              href="https://eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang.footerSources}
              <ExternalArrow />
            </a>
            <button
              type="button"
              className="pill"
              onClick={toggleLang}
              aria-label="Toggle interface language"
            >
              {currentNative} · {otherCode}
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 md:justify-end">
            <div className="flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--green)" }}
              />
              <HelplineCallButton
                label={`${lang.helplineLabel} · 24×7`}
                variant="inline"
                className="text-[11px]"
              />
            </div>
            <span
              className="font-mono text-ink-3"
              style={{ fontSize: 11 }}
            >
              v.1 · ©2024
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ExternalArrow() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ marginLeft: -2 }}
    >
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
