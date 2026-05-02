"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "@/lib/types";

interface Props {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: Props) {
  const isUser = message.role === "user";
  return (
    <div
      className={[
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-[85%] rounded-3xl px-5 py-3 text-[0.95rem] leading-relaxed",
          isUser
            ? "bg-primary text-on-primary rounded-br-md shadow-[var(--md-shadow-1)]"
            : "bg-surface-container-low text-on-surface border border-outline-variant rounded-bl-md",
        ].join(" ")}
        aria-label={isUser ? "Your message" : "Assistant response"}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-headings:my-2 prose-li:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {isStreaming && (
              <span
                className="ml-1 inline-flex h-2 w-2 animate-pulse rounded-full bg-primary align-middle"
                aria-label="Assistant is typing"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
