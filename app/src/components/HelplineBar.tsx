"use client";

import { getLanguage } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

interface Props {
  language: LanguageCode;
}

export function HelplineBar({ language }: Props) {
  const lang = getLanguage(language);
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm">
      <a
        href="tel:1950"
        className="m3-btn m3-btn-filled !bg-google-green !text-white"
        aria-label={`Call ${lang.helplineLabel}`}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
        </svg>
        <span>{lang.helplineLabel}</span>
      </a>
      <a
        href="https://cvigil.eci.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        className="m3-btn m3-btn-tonal"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
        <span>{lang.cvigilLabel}</span>
      </a>
    </div>
  );
}
