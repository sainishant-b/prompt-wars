# App

## What this is for
Next.js 14 application implementing Matdata Mitra — multilingual civic education assistant for Indian elections. Streaming chat UI backed by Gemini 1.5 Flash, with adaptive complexity, structured guides, and 10-language support. Deploys to Google Cloud Run as a single Docker image. Output: a publicly accessible web app for Indian voters.

## Folder contents
| Subfolder / file pattern | What it holds |
|--------------------------|---------------|
| `src/app/` | Next.js App Router — pages (`page.tsx`), layouts, API routes (`api/chat/route.ts`, `api/health/route.ts`). |
| `src/components/` | React components — LanguageSelector, ChatWindow, MessageBubble, QuickGuides, HelplineBar, KnowledgeBadge. |
| `src/lib/` | Domain logic — `knowledge-base.ts` (election KB), `gemini.ts` (LLM client), `adaptive.ts` (knowledge-level detection), `language.ts` (10-language config). |
| `__tests__/` | Jest + RTL tests for lib + components. |
| `public/` | Static assets (icons, language flags). |
| `Dockerfile`, `.dockerignore` | Cloud Run container build. |
| `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `tailwind.config.ts` | Build/lint/style config. |
| `package.json`, `package-lock.json` | Deps (Next 14, React, @google/generative-ai, jest, @testing-library/react). |
| `.env.example` | `GEMINI_API_KEY` placeholder. Real key set via Cloud Run env vars only — never committed. |

## Routing table
| Task | Read | Skip | Skill |
|------|------|------|-------|
| Add a new language | `src/lib/language.ts`, `src/components/LanguageSelector.tsx` | tests, Dockerfile | — |
| Edit Gemini prompt or KB | `src/lib/gemini.ts`, `src/lib/knowledge-base.ts` | components | — |
| Adjust adaptive level rules | `src/lib/adaptive.ts`, `__tests__/adaptive.test.ts` | UI, KB | — |
| UI tweak | `src/components/*`, `src/app/page.tsx`, `src/app/chat/page.tsx` | lib | — |
| Add new API route | `src/app/api/*/route.ts`, `src/lib/gemini.ts` | components | — |
| Build / deploy | `Dockerfile`, `next.config.ts`, `package.json` | source code | — |
| Run tests | `__tests__/*`, `jest.config.ts` | source code | — |

## Conventions
- TypeScript strict mode. No `any`. Explicit return types on exported functions.
- Server-only secrets: `GEMINI_API_KEY` lives in env, never in source. Use `process.env.GEMINI_API_KEY` only inside `src/app/api/**` (server) — never in client components.
- Streaming via `Response` with `text/event-stream` or chunked text. Always handle abort.
- Components: function components, named exports, props typed via local `interface`. Tailwind utility classes — no inline styles.
- All user-facing strings must support translation. Defer to Gemini for response language; UI labels stored in `language.ts` map.
- Accessibility: every interactive element has `aria-label` or visible text. Keyboard nav supported. Color contrast WCAG 2.1 AA.
- Tests colocated with `__tests__/` mirror of source path. Each lib function gets at least one test.

## Available skills
| Skill | When to use |
|-------|-------------|
| *(none currently installed at `~/.claude/commands/`)* | — |

## Suggested skills (not yet built)
| Skill name | Trigger |
|------------|---------|
| `deploy-cloudrun.md` | Deploying or redeploying app to Cloud Run; bundles `gcloud builds submit` + `gcloud run deploy`. |
| `add-language.md` | Adding a new Indian language — updates `language.ts`, `LanguageSelector`, system prompt, tests. |
| `update-kb.md` | Refreshing knowledge base from new ECI source material — re-validates section numbers and citations. |
