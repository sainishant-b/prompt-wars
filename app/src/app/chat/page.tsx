"use client";

import { useEffect, useState } from "react";
import { ChatWindow } from "@/components/ChatWindow";
import { DEFAULT_LANGUAGE, isValidLanguage } from "@/lib/language";
import type { LanguageCode } from "@/lib/types";

export default function ChatPage() {
  const [language, setLanguage] = useState<LanguageCode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("matdata-mitra:lang");
      if (saved && isValidLanguage(saved)) {
        setLanguage(saved);
        return;
      }
    } catch {
      // ignore
    }
    setLanguage(DEFAULT_LANGUAGE);
  }, []);

  if (language === null) {
    return (
      <main
        className="flex h-screen items-center justify-center"
        aria-busy="true"
      >
        <p className="text-sm text-zinc-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="h-screen">
      <ChatWindow initialLanguage={language} />
    </main>
  );
}
