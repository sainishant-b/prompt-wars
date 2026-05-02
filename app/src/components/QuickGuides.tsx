"use client";

import { QUICK_GUIDES, QUICK_GUIDE_TITLES } from "@/lib/knowledge-base";
import type { LanguageCode } from "@/lib/types";

interface Props {
  language: LanguageCode;
  onPick: (prompt: string) => void;
  disabled?: boolean;
}

export function QuickGuides({ language, onPick, disabled }: Props) {
  return (
    <div
      className="flex gap-2 overflow-x-auto py-3"
      role="region"
      aria-label="Quick guide topics"
    >
      {QUICK_GUIDES.map((guide) => {
        const title =
          QUICK_GUIDE_TITLES[guide.titleKey]?.[language] ??
          QUICK_GUIDE_TITLES[guide.titleKey]?.en ??
          guide.id;
        const prompt =
          guide.promptInLanguage[language] ?? guide.promptInLanguage.en;
        return (
          <button
            key={guide.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(prompt)}
            className="pill"
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}
