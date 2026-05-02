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
    bg: "bg-[var(--green-tint)]",
    fg: "text-[var(--green-deep)]",
    dot: "bg-[var(--green-deep)]",
  },
  intermediate: {
    label: "Familiar",
    bg: "bg-[var(--saffron-tint)]",
    fg: "text-[var(--saffron-deep)]",
    dot: "bg-[var(--saffron-deep)]",
  },
  expert: {
    label: "Expert",
    bg: "bg-[var(--navy-tint)]",
    fg: "text-[var(--navy)]",
    dot: "bg-[var(--navy)]",
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
