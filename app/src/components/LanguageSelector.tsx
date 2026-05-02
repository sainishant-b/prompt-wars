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
          className="h-9 rounded-full border border-outline-variant bg-surface-container-low px-4 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
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
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              selected
                ? "bg-primary-container text-on-primary-container shadow-[var(--md-shadow-1)]"
                : "border border-outline-variant bg-surface text-on-surface hover:bg-surface-container",
            ].join(" ")}
          >
            <span className="text-lg font-medium">{lang.nativeName}</span>
            <span className="mt-1 text-xs text-on-surface-variant">
              {lang.englishName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
