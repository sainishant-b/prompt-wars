"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { QuickGuides } from "./QuickGuides";
import { LanguageSelector } from "./LanguageSelector";
import { KnowledgeBadge } from "./KnowledgeBadge";
import { HelplineBar } from "./HelplineBar";
import { LocationDrawer } from "./LocationDrawer";
import { detectKnowledgeLevel } from "@/lib/adaptive";
import { getLanguage } from "@/lib/language";
import {
  getConstituency,
  isValidConstituencyId,
} from "@/lib/constituencies";
import type { KnowledgeLevel, LanguageCode, Message } from "@/lib/types";

interface Props {
  initialLanguage: LanguageCode;
  initialConstituencyId?: string | null;
}

const CONSTITUENCY_STORAGE_KEY = "matdata-mitra:constituency";

export function ChatWindow({
  initialLanguage,
  initialConstituencyId = null,
}: Props) {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [constituencyId, setConstituencyId] = useState<string | null>(
    initialConstituencyId,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lang = getLanguage(language);
  const level: KnowledgeLevel = detectKnowledgeLevel(messages);
  const constituency = constituencyId ? getConstituency(constituencyId) : null;

  // Hydrate constituency from localStorage if no initial value was provided
  useEffect(() => {
    if (constituencyId !== null) return;
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(CONSTITUENCY_STORAGE_KEY);
      if (saved && isValidConstituencyId(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConstituencyId(saved);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("matdata-mitra:lang", language);
    } catch {
      // localStorage not available; ignore
    }
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (constituencyId) {
        window.localStorage.setItem(CONSTITUENCY_STORAGE_KEY, constituencyId);
      } else {
        window.localStorage.removeItem(CONSTITUENCY_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [constituencyId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;
      setErrorMsg(null);

      const userMsg: Message = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages([...newMessages, { role: "assistant", content: "" }]);
      setInput("");
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages,
            language,
            constituencyId,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => "");
          throw new Error(errText || `Request failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((curr) => {
            const next = [...curr];
            next[next.length - 1] = { role: "assistant", content: acc };
            return next;
          });
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          // user cancelled; keep partial response
        } else {
          const msg = err instanceof Error ? err.message : "Something went wrong";
          setErrorMsg(msg);
          setMessages((curr) => curr.slice(0, -1));
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, language, constituencyId, isStreaming],
  );

  const stop = () => {
    abortRef.current?.abort();
  };

  return (
    <div className="flex h-full bg-paper">
      <div className="flex h-full min-w-0 flex-1 flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-edge bg-paper-2 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-3">
            <span className="text-base" aria-hidden="true">🗳️</span>
          </div>
          <div>
            <h1 className="text-base font-medium text-ink tracking-tight font-display">
              <span className="text-saffron-deep">Matdata</span> Mitra
            </h1>
            <p className="text-xs text-ink-3">
              {lang.appTagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.some((m) => m.role === "user") && (
            <KnowledgeBadge level={level} />
          )}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-paper-edge bg-paper-2 px-3 text-xs font-medium text-ink transition-colors hover:bg-paper-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink lg:hidden"
            aria-label="Open constituency drawer"
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
            </svg>
            <span className="max-w-[10rem] truncate">
              {constituency ? constituency.name : "Pick constituency"}
            </span>
          </button>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            variant="compact"
          />
        </div>
      </header>

      <div className="border-b border-paper-edge bg-paper px-4 sm:px-6">
        <QuickGuides
          language={language}
          onPick={(p) => void sendMessage(p)}
          disabled={isStreaming}
        />
      </div>

      {constituency && (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-between gap-3 border-b border-paper-edge bg-paper-2 px-4 py-2 text-left text-xs transition-colors hover:bg-paper-3 sm:px-6 lg:hidden"
          aria-label={`Constituency context: ${constituency.name}. Open drawer for details.`}
        >
          <span className="flex items-center gap-2 text-ink">
            <span aria-hidden="true">📍</span>
            <span>
              Answers tailored to{" "}
              <strong className="font-semibold">{constituency.name}</strong>
              <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">
                · {constituency.state} · Phase {constituency.pollingPhase}
              </span>
            </span>
          </span>
          <span className="text-xs text-ink-3">View details →</span>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-paper-2 px-4 py-6 sm:px-6 paper-grain"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 ? (
          <div className="mx-auto max-w-md text-center text-ink-3">
            <p className="text-base font-medium text-ink">
              {lang.appTagline}
            </p>
            <p className="mt-3 text-sm">{lang.inputPlaceholder}</p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {messages.map((m, i) => (
              <MessageBubble
                key={i}
                message={m}
                isStreaming={
                  isStreaming &&
                  i === messages.length - 1 &&
                  m.role === "assistant"
                }
              />
            ))}
          </div>
        )}
        {errorMsg && (
          <div
            role="alert"
            className="mx-auto mt-4 max-w-3xl rounded-xl border border-alert/30 bg-[color-mix(in_oklab,var(--alert)_10%,var(--paper))] p-3 text-sm text-alert"
          >
            {errorMsg}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessage(input);
        }}
        className="border-t border-paper-edge bg-paper-2 p-3 sm:p-4"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-full border border-paper-edge bg-paper px-2 py-1 focus-within:border-ink focus-within:ring-2 focus-within:ring-ink/30">
          <label htmlFor="chat-input" className="sr-only">
            {lang.inputPlaceholder}
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang.inputPlaceholder}
            disabled={isStreaming}
            className="flex-1 bg-transparent px-3 py-2 text-ink placeholder-ink-3 focus:outline-none disabled:opacity-60"
            autoComplete="off"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="btn btn-ghost h-9 px-4 text-sm"
              aria-label="Stop generating"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn btn-primary h-9 px-4 text-sm"
              aria-label={lang.sendLabel}
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              {lang.sendLabel}
            </button>
          )}
        </div>
      </form>

      <HelplineBar language={language} />

      <LocationDrawer
        permanent={false}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        constituencyId={constituencyId}
        onPickConstituency={(id) => {
          setConstituencyId(id);
        }}
      />
      </div>

      <div className="hidden h-full w-[400px] shrink-0 lg:block">
        <LocationDrawer
          permanent
          constituencyId={constituencyId}
          onPickConstituency={(id) => setConstituencyId(id)}
        />
      </div>
    </div>
  );
}
