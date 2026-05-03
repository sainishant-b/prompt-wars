"use client";

import { LANGUAGES } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

interface Props {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
}

export function LanguageBallot({ value, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose your language"
      className="grid grid-cols-2 gap-2"
    >
      {Object.values(LANGUAGES).map((lang) => {
        const selected = lang.code === value;
        return (
          <button
            key={lang.code}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(lang.code)}
            className={[
              "flex flex-col gap-1 rounded-[var(--r-md)] px-4 py-3.5 text-left transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep focus-visible:ring-offset-2",
              selected
                ? "bg-ink text-paper border border-ink"
                : "bg-paper text-ink border border-paper-edge hover:bg-paper-2",
            ].join(" ")}
          >
            <span
              className="text-[18px] font-semibold tracking-tight"
              style={{ letterSpacing: "-0.005em" }}
            >
              {lang.nativeName}
            </span>
            <span
              className="font-mono uppercase opacity-70"
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
              }}
            >
              {lang.englishName} · {lang.code.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
