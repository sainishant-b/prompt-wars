"use client";

import { useMemo } from "react";
import { CONSTITUENCIES, constituenciesByState } from "@/lib/constituencies";

interface Props {
  value: string | null;
  onChange: (id: string | null) => void;
  variant?: "compact" | "card";
  label?: string;
}

export function ConstituencyPicker({
  value,
  onChange,
  variant = "compact",
  label = "Your constituency",
}: Props) {
  const grouped = useMemo(() => constituenciesByState(), []);
  const states = useMemo(() => Object.keys(grouped).sort(), [grouped]);
  const selected = value ? CONSTITUENCIES.find((c) => c.id === value) : null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    onChange(v === "" ? null : v);
  };

  if (variant === "compact") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <span className="sr-only">{label}</span>
        <select
          value={value ?? ""}
          onChange={handleChange}
          className="h-9 rounded-full border border-paper-edge bg-paper px-4 text-sm text-ink transition-colors hover:bg-paper-2 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
          aria-label={label}
        >
          <option value="">All India · no constituency</option>
          {states.map((state) => (
            <optgroup key={state} label={state}>
              {grouped[state].map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div className="rounded-[var(--r-md)] border border-paper-edge bg-paper p-4">
      <div className="eyebrow mb-2">{label}</div>
      <select
        value={value ?? ""}
        onChange={handleChange}
        className="h-11 w-full rounded-lg border border-paper-edge bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
        aria-label={label}
      >
        <option value="">All India · no constituency</option>
        {states.map((state) => (
          <optgroup key={state} label={state}>
            {grouped[state].map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {selected && (
        <div className="mt-3 text-xs text-ink-3">
          <span className="font-mono uppercase tracking-wider">PC {selected.id}</span>
          {" · "}
          {selected.state} · Phase {selected.pollingPhase}
        </div>
      )}
    </div>
  );
}
