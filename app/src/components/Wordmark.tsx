"use client";

import { useEffect, useState } from "react";
import { ChakraGlyph } from "./ChakraGlyph";

type Variant = {
  code: string;
  title: string;
  fontVar: string;
};

const VARIANTS: Variant[] = [
  { code: "en", title: "Matdata Mitra",      fontVar: "var(--font-jakarta)" },
  { code: "hi", title: "मतदाता मित्र",          fontVar: "var(--font-noto-dev)" },
  { code: "ta", title: "வாக்காளர் நண்பன்",       fontVar: "var(--font-noto-ta)" },
  { code: "te", title: "ఓటరు మిత్రుడు",          fontVar: "var(--font-noto-te)" },
  { code: "bn", title: "ভোটার বন্ধু",           fontVar: "var(--font-noto-bn)" },
  { code: "mr", title: "मतदार मित्र",            fontVar: "var(--font-noto-dev)" },
  { code: "kn", title: "ಮತದಾರ ಮಿತ್ರ",          fontVar: "var(--font-noto-kn)" },
  { code: "ml", title: "വോട്ടർ മിത്രം",          fontVar: "var(--font-noto-ml)" },
  { code: "gu", title: "મતદાતા મિત્ર",           fontVar: "var(--font-noto-gu)" },
  { code: "pa", title: "ਵੋਟਰ ਮਿੱਤਰ",            fontVar: "var(--font-noto-pa)" },
];

interface Props {
  size?: number;
  showSubtitle?: boolean;
}

export function Wordmark({ size = 22, showSubtitle = true }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setI((v) => (v + 1) % VARIANTS.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);
  const v = VARIANTS[i];
  const words = v.title.split(" ");
  return (
    <div className="flex items-center gap-2.5">
      <ChakraGlyph size={size + 4} />
      <div
        className="flex flex-col"
        style={{ minWidth: size * 7 }}
      >
        <span
          key={v.code}
          style={{
            fontFamily: v.fontVar,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            whiteSpace: "nowrap",
            animation: "wordmarkFade 500ms ease",
          }}
        >
          {words.map((word, idx) => (
            <span key={idx}>
              {idx === words.length - 1 ? (
                <span style={{ color: "var(--saffron-deep)" }}>{word}</span>
              ) : (
                word
              )}
              {idx < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
        {showSubtitle ? (
          <span
            className="font-mono"
            style={{
              fontSize: size * 0.42,
              lineHeight: 1.2,
              color: "var(--ink-3)",
              marginTop: 3,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Voter Friend · {v.code.toUpperCase()}
          </span>
        ) : null}
      </div>
    </div>
  );
}
