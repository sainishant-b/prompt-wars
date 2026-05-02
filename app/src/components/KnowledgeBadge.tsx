"use client";

import type { KnowledgeLevel } from "@/lib/types";

interface Props {
  level: KnowledgeLevel;
}

const STYLE: Record<
  KnowledgeLevel,
  { label: string; bg: string; fg: string; dot: string }
> = {
  novice: {
    label: "Beginner",
    bg: "bg-[color-mix(in_oklab,var(--google-green)_18%,transparent)]",
    fg: "text-[var(--google-green)]",
    dot: "bg-[var(--google-green)]",
  },
  intermediate: {
    label: "Familiar",
    bg: "bg-[color-mix(in_oklab,var(--google-yellow)_24%,transparent)]",
    fg: "text-[#a05a00]",
    dot: "bg-[var(--google-yellow)]",
  },
  expert: {
    label: "Expert",
    bg: "bg-[color-mix(in_oklab,var(--google-blue)_18%,transparent)]",
    fg: "text-[var(--google-blue-dark)]",
    dot: "bg-[var(--google-blue)]",
  },
};

export function KnowledgeBadge({ level }: Props) {
  const s = STYLE[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.fg}`}
      aria-label={`Detected knowledge level: ${s.label}`}
      title="Detected from your messages — adjusts explanation depth"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}
