"use client";

import { useEffect, useRef, useState } from "react";

const NUMBER = "1950";

interface Props {
  label: string;
  variant?: "primary" | "ghost" | "inline";
  className?: string;
}

function copyNumber(): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(NUMBER).then(
      () => true,
      () => fallbackCopy(),
    );
  }
  return Promise.resolve(fallbackCopy());
}

function fallbackCopy(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const ta = document.createElement("textarea");
    ta.value = NUMBER;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function isLikelyMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile|Opera Mini/i.test(navigator.userAgent);
}

export function HelplineCallButton({
  label,
  variant = "primary",
  className,
}: Props) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(null), 2400);
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ok = await copyNumber();
    if (isLikelyMobile()) {
      // Native dialer takes over via tel: href. Brief toast still useful.
      showFeedback(ok ? `${NUMBER} · opening dialer…` : `Dial ${NUMBER}`);
      return;
    }
    // Desktop: tel: rarely works. Block it, copy + toast instead.
    e.preventDefault();
    showFeedback(
      ok ? `${NUMBER} copied — dial from any phone` : `Dial ${NUMBER} on any phone`,
    );
  };

  const baseCls =
    variant === "primary"
      ? "btn btn-primary !bg-green-deep !text-paper"
      : variant === "ghost"
        ? "btn btn-ghost"
        : "font-mono uppercase text-ink-3 hover:text-ink";

  return (
    <span className="relative inline-flex">
      <a
        href={`tel:${NUMBER}`}
        onClick={handleClick}
        className={[baseCls, className].filter(Boolean).join(" ")}
        aria-label={`Call ${label}`}
        data-helpline-number={NUMBER}
      >
        {variant !== "inline" && (
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
          </svg>
        )}
        <span>{label}</span>
      </a>

      {feedback && (
        <span
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-paper-edge bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper shadow-[var(--shadow-2)]"
          style={{ letterSpacing: "0.08em" }}
        >
          {feedback}
        </span>
      )}
    </span>
  );
}
