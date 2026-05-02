"use client";

import { LANGUAGES } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

interface Props {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
  variant?: "grid" | "compact";
}

export function LanguageSelector({ value, onChange, variant = "grid" }: Props) {
  if (variant === "compact") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <span className="sr-only">Select language</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as LanguageCode)}
          className="h-9 rounded-full border border-paper-edge bg-paper-2 px-4 text-sm font-medium text-ink transition-colors hover:bg-paper-3 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
          aria-label="Select language"
        >
          {Object.values(LANGUAGES).map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName} · {lang.englishName}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Choose your language"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
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
              "flex flex-col items-center justify-center rounded-2xl px-4 py-5 text-center transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
              selected
                ? "bg-ink text-paper shadow-[var(--shadow-1)]"
                : "border border-paper-edge bg-paper text-ink hover:bg-paper-2",
            ].join(" ")}
          >
            <span className="text-lg font-medium">{lang.nativeName}</span>
            <span className="mt-1 text-xs text-ink-3">
              {lang.englishName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
