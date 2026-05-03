"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { CONSTITUENCIES } from "@/lib/constituencies";

interface Projection {
  ox: number;
  oy: number;
  scale: number;
  minLon: number;
  maxLat: number;
}

interface PathData {
  paths: string[];
  projection: Projection;
}

const FALLBACK_PROJ: Projection = {
  ox: 20,
  oy: 20,
  scale: 32.8396,
  minLon: 68.162,
  maxLat: 37.098,
};

const STORAGE_KEY = "matdata-mitra:constituency";

export default function MapPage() {
  const router = useRouter();
  const [pathData, setPathData] = useState<PathData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/india-paths.json")
      .then((r) => r.json())
      .then((d: PathData) => {
        if (!cancelled) setPathData(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const proj = pathData?.projection ?? FALLBACK_PROJ;

  const dots = useMemo(
    () =>
      CONSTITUENCIES.map((c) => ({
        ...c,
        x: proj.ox + (c.lon - proj.minLon) * proj.scale,
        y: proj.oy + (proj.maxLat - c.lat) * proj.scale,
      })),
    [proj],
  );

  const activeId = selectedId ?? hoverId;
  const active = activeId
    ? CONSTITUENCIES.find((c) => c.id === activeId)
    : null;

  const confirm = () => {
    if (!selectedId) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, selectedId);
    } catch {
      // ignore
    }
    router.push("/chat");
  };

  return (
    <main className="mm flex min-h-screen flex-col paper-grain text-ink">
      <nav
        className="flex items-center justify-between border-b border-paper-edge px-6 py-4 md:px-10 md:py-5"
        aria-label="Top navigation"
      >
        <Wordmark size={20} />
        <Link href="/" className="pill" aria-label="Back to landing">
          ← Back
        </Link>
      </nav>

      <div className="grid flex-1 min-h-0 lg:grid-cols-[1fr_380px]">
        {/* map column */}
        <section className="flex flex-col border-paper-edge lg:border-r">
          <div className="px-6 pt-6 md:px-10 md:pt-8">
            <div className="eyebrow">Step 02 of 03</div>
            <h2
              className="mt-1.5 text-2xl font-bold tracking-tight md:text-[32px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Where will you{" "}
              <span
                className="font-medium italic"
                style={{ color: "var(--saffron-deep)" }}
              >
                vote
              </span>
              ?
            </h2>
            <p className="mt-1.5 max-w-[480px] text-sm text-ink-2">
              Tap any dot to peek. Click again or press Confirm to lock it in —
              Mitra will tailor every answer to your seat.
            </p>
          </div>

          <div className="relative flex-1 px-4 py-4 md:px-10">
            <svg
              viewBox="0 0 1000 1100"
              preserveAspectRatio="xMidYMid meet"
              className="block h-full w-full"
              role="img"
              aria-label="Map of India with major Lok Sabha constituencies"
            >
              <defs>
                <pattern
                  id="paperHatch"
                  width="6"
                  height="6"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="6"
                    stroke="var(--paper-edge)"
                    strokeWidth="0.6"
                  />
                </pattern>
              </defs>

              {pathData?.paths.map((d, i) => (
                <path
                  key={`h-${i}`}
                  d={d + " Z"}
                  fill="url(#paperHatch)"
                  stroke="var(--ink-3)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity="0.95"
                />
              ))}
              {pathData?.paths.map((d, i) => (
                <path
                  key={`f-${i}`}
                  d={d + " Z"}
                  fill="var(--paper)"
                  opacity="0.55"
                  stroke="none"
                />
              ))}

              {dots.map((c) => {
                const isSelected = selectedId === c.id;
                const isActive = activeId === c.id;
                const r = isSelected ? 11 : c.hot ? 9 : 7;
                const fill = isSelected
                  ? "var(--saffron-deep)"
                  : c.hot
                    ? "var(--saffron)"
                    : "var(--ink)";
                return (
                  <g
                    key={c.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoverId(c.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => setSelectedId(c.id)}
                  >
                    {isSelected && (
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="26"
                        fill="none"
                        stroke="var(--saffron-deep)"
                        strokeWidth="1.8"
                        strokeDasharray="3 4"
                      />
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={r}
                      fill={fill}
                      stroke="var(--paper)"
                      strokeWidth="2.5"
                    />
                    {isActive && (
                      <text
                        x={c.x + 16}
                        y={c.y + 5}
                        fontSize="18"
                        fontWeight="700"
                        fill="var(--ink)"
                        style={{ pointerEvents: "none" }}
                      >
                        {c.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            <div
              className="absolute bottom-2 left-6 flex gap-3 font-mono uppercase text-ink-3 md:left-12"
              style={{ fontSize: 10, letterSpacing: "0.1em" }}
            >
              <span>543 PC</span>
              <span>·</span>
              <span>28 States</span>
              <span>·</span>
              <span>8 UT</span>
            </div>
          </div>
        </section>

        {/* side rail */}
        <aside className="flex flex-col gap-4 border-t border-paper-edge bg-paper-2 px-6 py-6 lg:border-t-0 lg:px-6 lg:py-8">
          <div className="eyebrow">Your seat</div>
          {active ? (
            <div className="rounded-[var(--r-lg)] border border-paper-edge bg-paper p-4 shadow-[var(--shadow-2)]">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight">
                  {active.name}
                </h3>
                <span className="font-mono text-[11px] text-ink-3">
                  #{active.id}
                </span>
              </div>
              <div className="mt-1 text-xs text-ink-3">
                {active.state} · Lok Sabha
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <Field
                  label="Total electors"
                  value={active.totalElectors.toLocaleString("en-IN")}
                />
                <Field label="Phase" value={`Phase ${active.pollingPhase}`} />
                <Field
                  label="Polling date"
                  value={fmtDate(active.pollingDate)}
                />
                <Field
                  label="Sitting MP"
                  value={`${active.sittingMP} (${active.sittingMPParty})`}
                />
              </dl>
            </div>
          ) : (
            <div
              className="rounded-[var(--r-lg)] border border-dashed border-paper-edge p-4 text-sm text-ink-3"
            >
              Hover or click a dot. The peek card shows constituency stats here.
            </div>
          )}

          <div className="rule" />
          <div className="eyebrow">Pick from list</div>
          <ul className="grid max-h-[40vh] grid-cols-1 gap-1 overflow-y-auto pr-1">
            {CONSTITUENCIES.map((c) => {
              const sel = selectedId === c.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={[
                      "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                      sel
                        ? "border-ink bg-ink text-paper"
                        : "border-paper-edge bg-paper hover:bg-paper-3",
                    ].join(" ")}
                  >
                    <span>
                      <span className="font-semibold">{c.name}</span>
                      <span
                        className={[
                          "ml-2 text-xs",
                          sel ? "text-paper-edge" : "text-ink-3",
                        ].join(" ")}
                      >
                        {c.state}
                      </span>
                    </span>
                    <span
                      className={[
                        "font-mono text-[10px] uppercase tracking-wider",
                        sel ? "text-paper" : "text-ink-3",
                      ].join(" ")}
                    >
                      {c.id}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            disabled={!selectedId}
            onClick={confirm}
            className="btn btn-primary mt-2 w-full"
          >
            Confirm &amp; chat with Mitra
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href="/chat"
            className="btn btn-ghost w-full"
            aria-label="Skip and chat without a constituency"
          >
            Skip — just chat
          </Link>
        </aside>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-[10px]">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold tracking-tight">{value}</dd>
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
