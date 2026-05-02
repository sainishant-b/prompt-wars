"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { QuickGuides } from "./QuickGuides";
import { LanguageSelector } from "./LanguageSelector";
import { KnowledgeBadge } from "./KnowledgeBadge";
import { HelplineBar } from "./HelplineBar";
import { detectKnowledgeLevel } from "@/lib/adaptive";
import { getLanguage } from "@/lib/language";
import type { KnowledgeLevel, LanguageCode, Message } from "@/lib/types";

interface Props {
  initialLanguage: LanguageCode;
}

export function ChatWindow({ initialLanguage }: Props) {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lang = getLanguage(language);
  const level: KnowledgeLevel = detectKnowledgeLevel(messages);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("matdata-mitra:lang", language);
    } catch {
      // localStorage not available; ignore
    }
  }, [language]);

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
          body: JSON.stringify({ messages: newMessages, language }),
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
    [messages, language, isStreaming],
  );

  const stop = () => {
    abortRef.current?.abort();
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-low px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container">
            <span className="text-base" aria-hidden="true">🗳️</span>
          </div>
          <div>
            <h1 className="text-base font-medium text-on-surface tracking-tight">
              <span className="google-gradient">Matdata</span> Mitra
            </h1>
            <p className="text-xs text-on-surface-variant">
              {lang.appTagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.some((m) => m.role === "user") && (
            <KnowledgeBadge level={level} />
          )}
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            variant="compact"
          />
        </div>
      </header>

      <div className="border-b border-outline-variant bg-surface px-4 sm:px-6">
        <QuickGuides
          language={language}
          onPick={(p) => void sendMessage(p)}
          disabled={isStreaming}
        />
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-surface-dim px-4 py-6 sm:px-6"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 ? (
          <div className="mx-auto max-w-md text-center text-on-surface-variant">
            <p className="text-base font-medium text-on-surface">
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
            className="mx-auto mt-4 max-w-3xl rounded-xl border border-error/30 bg-[color-mix(in_oklab,var(--md-error)_10%,var(--md-surface))] p-3 text-sm text-error"
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
        className="border-t border-outline-variant bg-surface-container-low p-3 sm:p-4"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-full border border-outline-variant bg-surface px-2 py-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
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
            className="flex-1 bg-transparent px-3 py-2 text-on-surface placeholder-on-surface-variant focus:outline-none disabled:opacity-60"
            autoComplete="off"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="m3-btn m3-btn-tonal h-9 px-4 text-sm"
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
              className="m3-btn m3-btn-filled h-9 px-4 text-sm"
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
    </div>
  );
}
