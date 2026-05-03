"use client";

import { HelplineCallButton } from "./HelplineCallButton";
import { getLanguage } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

interface Props {
  language: LanguageCode;
}

export function HelplineBar({ language }: Props) {
  const lang = getLanguage(language);
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-paper-edge bg-paper-2 px-4 py-2.5 text-sm">
      <HelplineCallButton label={lang.helplineLabel} variant="primary" />
      <a
        href="https://cvigil.eci.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
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
