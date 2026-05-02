"use client";

import { useEffect } from "react";
import {
  CONSTITUENCIES,
  getConstituency,
  type Constituency,
} from "@/lib/constituencies";

interface Props {
  open: boolean;
  onClose: () => void;
  constituencyId: string | null;
  onPickConstituency: (id: string | null) => void;
}

export function LocationDrawer({
  open,
  onClose,
  constituencyId,
  onPickConstituency,
}: Props) {
  const c = constituencyId ? getConstituency(constituencyId) : undefined;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-ink/30 backdrop-blur-[1px] transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your constituency details"
        className={[
          "fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto",
          "border-l border-paper-edge bg-paper shadow-[var(--shadow-3)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-paper-edge bg-paper-2 px-5 py-3">
          <div>
            <div className="eyebrow">Your seat</div>
            <h2 className="mt-1 text-base font-bold text-ink">
              {c ? c.name : "Choose a constituency"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost h-9 px-3 text-sm"
            aria-label="Close drawer"
          >
            Close
          </button>
        </header>

        <div className="p-5">
          {c ? <Body c={c} onChange={onPickConstituency} /> : <EmptyState onPick={onPickConstituency} />}
        </div>
      </aside>
    </>
  );
}

function EmptyState({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-2">
        Pick the parliamentary constituency you vote in. Mitra will tailor
        polling dates, candidate info, booth IDs, and history to your seat.
      </p>
      <ul className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
        {CONSTITUENCIES.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onPick(c.id)}
              className="flex w-full items-center justify-between rounded-lg border border-paper-edge bg-paper px-3 py-2 text-left text-sm transition-colors hover:bg-paper-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>
                <span className="font-medium text-ink">{c.name}</span>
                <span className="ml-2 text-ink-3">{c.state}</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3">
                {c.id}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function fmtDate(iso: string) {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function daysFromToday(iso: string): number {
  const target = new Date(iso + "T00:00:00").getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86_400_000);
}

function Body({
  c,
  onChange,
}: {
  c: Constituency;
  onChange: (id: string | null) => void;
}) {
  const days = daysFromToday(c.pollingDate);
  const pollingPast = days < 0;

  return (
    <div className="space-y-5 text-sm text-ink">
      {/* Header summary */}
      <div className="rounded-[var(--r-lg)] border border-paper-edge bg-paper-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight">{c.name}</h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3">
            #{c.id}
          </span>
        </div>
        <div className="mt-1 text-xs text-ink-3">
          {c.state} · Lok Sabha
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-3">
          <Stat label="Total electors" value={c.totalElectors.toLocaleString("en-IN")} />
          <Stat label="2024 phase" value={`Phase ${c.pollingPhase}`} />
          <Stat label="Polling date" value={fmtDate(c.pollingDate)} />
          <Stat label="Counting date" value={fmtDate(c.countingDate)} />
        </dl>
      </div>

      {/* Countdown */}
      <section>
        <div className="eyebrow mb-2">Next election</div>
        <div className="rounded-[var(--r-md)] border border-paper-edge bg-paper p-3">
          <div className="text-sm">
            {pollingPast ? (
              <span>
                Polling for the 2024 Lok Sabha cycle in {c.name} has concluded
                ({fmtDate(c.pollingDate)}). The next general election is due
                by mid-2029.
              </span>
            ) : (
              <span>
                {Math.max(0, days)} day{days === 1 ? "" : "s"} until polling in {c.name}
                {" — "}
                {fmtDate(c.pollingDate)} (Phase {c.pollingPhase}).
              </span>
            )}
          </div>
        </div>
      </section>

      {/* MP + history */}
      <section>
        <div className="eyebrow mb-2">Sitting MP</div>
        <div className="rounded-[var(--r-md)] border border-paper-edge bg-paper p-3">
          <div className="font-semibold">{c.sittingMP}</div>
          <div className="text-xs text-ink-3">{c.sittingMPParty} · post-2024</div>
        </div>
      </section>

      {/* Candidates */}
      <section>
        <div className="eyebrow mb-2">Candidates · 2024</div>
        <ul className="space-y-2">
          {c.candidates2024.map((k) => (
            <li
              key={k.name}
              className="rounded-[var(--r-md)] border border-paper-edge bg-paper p-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold">{k.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-saffron-deep">
                  {k.partyShort}
                </span>
              </div>
              <div className="text-xs text-ink-3">{k.party}</div>
              <dl className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                <Datum label="Age" value={String(k.age)} />
                <Datum label="Education" value={k.educationLevel} />
                <Datum
                  label="Assets"
                  value={`₹${k.declaredAssetsCrore} Cr`}
                />
                <Datum
                  label="Liabilities"
                  value={k.liabilitiesLakh ? `₹${k.liabilitiesLakh} L` : "—"}
                />
                <Datum
                  label="Criminal cases"
                  value={String(k.criminalCases)}
                  warn={k.criminalCases > 0}
                />
              </dl>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-[11px] text-ink-3">
          Source: candidate affidavits filed with ECI · MyNeta. Verify on{" "}
          <a
            href="https://myneta.info"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            myneta.info
          </a>
          .
        </div>
      </section>

      {/* Voting day checklist */}
      <section>
        <div className="eyebrow mb-2">Voting day · what to bring</div>
        <ul className="space-y-1 text-sm">
          <li className="flex items-start gap-2">
            <span aria-hidden="true">•</span>
            <span>
              <strong>EPIC</strong> (Voter ID) preferred, OR any one of these
              alternates:
            </span>
          </li>
          {c.alternateIDs.map((id) => (
            <li key={id} className="ml-4 flex items-start gap-2 text-ink-2">
              <span aria-hidden="true">·</span>
              <span>{id}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-[var(--r-md)] border border-paper-edge bg-paper-2 p-3 text-xs text-ink-2">
          <strong className="text-ink">Booth rules:</strong> No mobile phones
          inside the booth. Indelible ink mark on left index finger. Watch the
          VVPAT slip for 7 seconds.
        </div>
        <a
          href={c.boothFinderURL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost mt-3 h-10 w-full text-sm"
        >
          Find my exact booth →
        </a>
      </section>

      {/* History */}
      <section>
        <div className="eyebrow mb-2">Last cycle · {c.history.year}</div>
        <div className="rounded-[var(--r-md)] border border-paper-edge bg-paper p-3 text-xs">
          <div>
            <strong className="text-sm text-ink">{c.history.winner}</strong>{" "}
            ({c.history.winnerParty}) won.
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-2">
            <Datum label="Turnout" value={`${c.history.turnoutPercent}%`} />
            <Datum
              label="Margin"
              value={`${c.history.marginPercent}%`}
            />
          </dl>
          {c.history.turnoutPercent < 50 && (
            <p className="mt-2 text-alert">
              Turnout was below 50% last time. Every vote matters more here.
            </p>
          )}
        </div>
      </section>

      {/* Change constituency */}
      <button
        type="button"
        onClick={() => onChange(null)}
        className="btn btn-ghost w-full text-sm"
      >
        Change constituency
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-[10px]">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold tracking-tight">{value}</dd>
    </div>
  );
}

function Datum({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div>
      <dt className="font-mono uppercase tracking-wider text-[9px] text-ink-3">
        {label}
      </dt>
      <dd
        className={[
          "font-medium",
          warn ? "text-alert" : "text-ink",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
