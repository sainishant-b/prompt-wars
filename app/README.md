# Matdata Mitra (मतदाता मित्र)

**Voting, explained in your own language.**

Matdata Mitra is a multilingual civic-education companion for Indian elections. It answers anything a citizen might ask — voter registration, polling-day procedure, what to do if your name isn't on the rolls, who's contesting in your seat — in 10 official Indian languages, grounded in ECI guidelines, RPA 1950 & 1951, the Conduct of Elections Rules 1961, and the Constitution.

Built for **PromptWars Challenge 2** (Hack2skill × Google for Developers) on Google Gemini and Cloud Run.

---

## Why it exists

Indian voter education materials are dense, English-heavy, and scattered across ECI portals, MyNeta, Wikipedia, and PDF gazettes. First-time voters and non-English speakers either give up or rely on rumours. Matdata Mitra collapses all of that into a single conversational experience — one that talks back in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, or English — and adapts its tone based on whether you're a novice, an engaged citizen, or a policy nerd.

---

## Feature highlights

### Multilingual, script-faithful UI
- **10 official languages.** Full UI translation, native input placeholders, send/helpline labels, app taglines.
- **Per-script typography.** Each language renders in its proper Noto Sans family — Devanagari, Tamil, Telugu, Bengali, Kannada, Malayalam, Gujarati, Gurmukhi — loaded via `next/font/google`. No fallback rendering, no broken glyphs.
- **Cycling wordmark.** The "Matdata Mitra" logo rotates through all 10 native-script names every 3 seconds with a soft fade animation. The chakra glyph stays put; the script flips. A constant reminder this app belongs to every voter, not just English speakers.

### Civic-India design system
A bespoke design vocabulary inspired by Indian gazette paper and electoral motifs — not generic Material 3.

- **Palette in OKLCH.** Warm "gazette paper" surfaces, near-black ink with cool Ashoka tint, civic saffron, civic green, and Ashoka navy. All accents share calibrated chroma so they never clash.
- **Typography.** Plus Jakarta Sans for UI, Tiro Devanagari Hindi for Indic display accents, JetBrains Mono for data labels.
- **Geometric ornament.** A pure-CSS 24-spoke chakra (no figurative SVG, no AI-art slop) sits behind the hero.
- **Texture.** Subtle paper-grain background applied to body and hero sections via repeating radial gradients.
- **Ballot-stub.** Dotted left-edge tear-off on the language picker — a nod to physical ballots.
- **Stamp badges.** Rotated, low-opacity ink-stamp callouts for source provenance (ECI Verified Sources, RPA 1950 / 1951, Constitution Art. 324).

### Interactive constituency map
- Real India outline rendered from `datameet/maps`'s `india-composite.geojson`, simplified to **24 KB** (1709 points, 71 polygons including islands) with bounds 6.75°N → 37.1°N.
- 16 major Lok Sabha constituencies projected by **actual lat/long**, not hand-positioned dots — Varanasi, Mumbai South, Bangalore South, New Delhi, Kolkata Dakshin, Chennai Central, Hyderabad, Ahmedabad East, Jaipur, Lucknow, Patna Sahib, Guwahati, Thiruvananthapuram, Amritsar, Srinagar, Bhubaneswar.
- Hover/select with live peek card showing total electors, polling phase, polling date, and sitting MP.
- List fallback below the map for keyboard / accessibility users.
- Click → save to localStorage → forward to chat with seat context wired in.

### Persistent constituency sidebar in chat
- Always-visible right rail (≥lg viewport) — no overlay, no Close button. Stays open while you chat.
- Shows per-seat: electors, phase, polling/counting dates, sitting MP, full 2024 candidate roster with affidavit data (age, education, declared assets, liabilities, **criminal cases**), 2019 historical result with turnout & margin, accepted alternate photo IDs, official ECI booth-finder link, and contextual booth rules (no mobile inside, indelible ink, watch the VVPAT slip for 7 seconds).
- Mobile falls back to a closable drawer to preserve screen real estate for the chat input.

### Adaptive knowledge level
- The chat detects whether you're a **novice**, **intermediate**, or **expert** based on linguistic patterns in your messages (e.g. asking about NOTA, RPA section numbers, or Form 6B vs. asking "how do I vote").
- The Gemini system instruction shifts tone, depth, and citation density to match.
- Knowledge badge in the header shows the current level — visible only after the user has spoken so it doesn't intimidate first-time visitors.

### Streaming chat with citations
- POST `/api/chat` returns a streamed `text/plain` response. Server uses `ReadableStream` over Gemini's `sendMessageStream`. Client renders chunks live.
- System prompt grounds the model with a **knowledge base** sourced from ECI guidelines, RPA 1950 & 1951, Conduct of Elections Rules 1961, and the Constitution — plus the user's selected constituency context block when one is set.
- Strict server-side input validation: max 50 messages per session, max 4000 chars per message, role/format/content checks, language whitelist, constituency ID whitelist.
- Abort signal propagates to the upstream model — stop generating mid-stream and the API call is cancelled, not silently abandoned.
- Headers expose `X-Knowledge-Level` and `X-Constituency-Id` for debugging without leaking model internals.

### Cross-device Voter Helpline call button
The Voter Helpline number `1950` is real, not decorative. The call button:
- Anchors `tel:1950` so mobile devices fire the native dialer.
- Detects mobile UA → shows brief "1950 · opening dialer…" toast.
- On desktop (where `tel:` rarely works) → blocks navigation, copies `1950` to clipboard via `navigator.clipboard.writeText` with `execCommand` fallback, shows "1950 copied — dial from any phone".
- `aria-live="polite"` toast auto-dismisses after 2.4 s.

### Quick-guide chips
Pre-canned starter prompts in the user's language — "How to register to vote", "What to do on polling day", "My vote was cast without me", "Report an election violation", "Lok Sabha vs Vidhan Sabha". Sends straight to chat. Disabled while streaming so users can't double-fire.

### Locality-aware system prompt
When a constituency is set, the Gemini system prompt receives a structured context block:

```
The user is voting in Varanasi (PC code VAR), state of Uttar Pradesh.
- Total electors: 19,95,591
- 2024 Lok Sabha polling phase: 7
- 2024 polling date: 2024-06-01
...
- Major candidates in 2024:
  - Narendra Modi (BJP): age 73, Master's, declared assets ₹3.02 crore, ...
  - Ajay Rai (INC): age 53, Graduate, declared assets ₹13.74 crore, 8 criminal cases.
- Booth finder: https://...
- Accepted alternate photo IDs: ...
```

The model is explicitly instructed *not* to speculate beyond this block, and to redirect to `electoralsearch.eci.gov.in` for anything missing.

### State persistence
- Selected language → `localStorage["matdata-mitra:lang"]` (validated against the language whitelist on load).
- Selected constituency → `localStorage["matdata-mitra:constituency"]` (validated against known PC IDs).
- Both survive page reloads and navigation between `/`, `/map`, and `/chat`.

### Accessibility
- All interactive controls have `aria-label`s, focus-visible rings using the saffron-deep accent.
- Language picker uses `role="radiogroup"` / `role="radio"` semantics.
- Chat thread uses `role="log"` with `aria-live="polite"` and `aria-atomic="false"`.
- Toasts use `role="status"` with `aria-live="polite"`.
- Reduced-motion media query disables wordmark fade and other transitions.
- High-contrast ink/paper colour pair, never pure black.

### Provider abstraction (hybrid AI runtime)
- Default: **Google Gemini** (`gemini-1.5-flash` via `@google/generative-ai`).
- Optional fallback: any OpenAI-compatible endpoint via `AI_PROVIDER=void`. Implemented as a plain `fetch` SSE parser — no extra SDK dependencies. Lets you swap in proxy services for development without disturbing the canonical Gemini path used in production.

### Cross-language SEO + sharing
- `metadata` object in `layout.tsx` carries title "Matdata Mitra — Voting, explained in your own language", a Hindi-aware description, OpenGraph card, locale `en_IN`, and keywords for both English and Devanagari brand variants.

### Disclaimer transparency
A footer ribbon on the landing page openly labels the build as a **Preview**: *"Content shown is illustrative only. Verified, citation-backed information from ECI guidelines, RPA 1950 / 1951 & the Constitution will land in the next version."* Honest about hackathon scope; no false-confidence pretending to be a production civic source.

---

## Routes

| Path        | What                                                          |
|-------------|---------------------------------------------------------------|
| `/`         | Landing — bilingual hero, ballot-stub language picker, footer |
| `/map`      | Constituency map — interactive India SVG + list fallback      |
| `/chat`     | Mitra chat — streaming, persistent sidebar, helpline bar      |
| `/api/chat` | POST `{messages, language, constituencyId}` → streamed reply  |

---

## Tech stack

| Layer        | Choice                                                              |
|--------------|---------------------------------------------------------------------|
| Framework    | Next.js 16 (App Router, Turbopack, `output: "standalone"`)          |
| Language     | TypeScript (strict)                                                 |
| Styling      | Tailwind CSS v4 with theme tokens mapped from CSS custom properties |
| Fonts        | `next/font/google`: Plus Jakarta Sans, Tiro Devanagari Hindi, JetBrains Mono, 8× Noto Sans Indic |
| AI           | `@google/generative-ai` (Gemini 1.5 Flash) — provider-pluggable     |
| State        | React `useState` + localStorage. No global store, no Redux.         |
| Tests        | Jest + Testing Library                                              |
| Container    | Multi-stage Dockerfile, Node 20 Alpine, non-root user, 8080         |

---

## File layout

```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx              landing
│   │   ├── map/page.tsx          constituency map + picker
│   │   ├── chat/page.tsx         chat shell
│   │   ├── api/chat/route.ts     streaming POST handler
│   │   ├── layout.tsx            font loaders, metadata
│   │   └── globals.css           design tokens, .pill, .btn, .stamp, .ballot-stub, .chakra-bg, .paper-grain
│   ├── components/
│   │   ├── Wordmark.tsx          cycling 10-script logo
│   │   ├── ChakraGlyph.tsx       24-spoke SVG ornament
│   │   ├── StampBadge.tsx        rotated ink-stamp pill
│   │   ├── LanguageBallot.tsx    2-col ballot-stub picker (landing)
│   │   ├── LanguageSelector.tsx  compact / grid picker (chat header)
│   │   ├── ChatWindow.tsx        chat shell with permanent sidebar
│   │   ├── MessageBubble.tsx     streaming-aware message renderer
│   │   ├── QuickGuides.tsx       starter-prompt pill row
│   │   ├── KnowledgeBadge.tsx    novice/intermediate/expert pill
│   │   ├── HelplineBar.tsx       footer call + cVIGIL row
│   │   ├── HelplineCallButton.tsx  cross-device tel + clipboard
│   │   ├── LocationDrawer.tsx    permanent sidebar / mobile drawer
│   │   └── ConstituencyPicker.tsx  optgroup-by-state select
│   └── lib/
│       ├── gemini.ts             system prompt builder + provider dispatcher
│       ├── providers/void.ts     OpenAI-compatible SSE fallback
│       ├── adaptive.ts           knowledge-level detection
│       ├── knowledge-base.ts     ECI/RPA/Constitution reference (in-context RAG)
│       ├── language.ts           10-language config + validators
│       ├── constituencies.ts     16 PCs with affidavits + history
│       └── types.ts
├── public/
│   └── data/india-paths.json     24 KB simplified India outline + projection params
├── __tests__/                    Jest unit suites
├── Dockerfile                    multi-stage standalone build
├── next.config.ts                output: "standalone"
└── package.json
```

---

## Quickstart

```bash
git clone <repo>
cd prompt-wars/app
npm ci

# Get a free Gemini API key from https://aistudio.google.com/apikey
echo "GEMINI_API_KEY=your_key_here" > .env.local

npm run dev
# open http://localhost:3000
```

### Environment variables

| Var                          | Required          | Purpose                                                |
|------------------------------|-------------------|--------------------------------------------------------|
| `GEMINI_API_KEY`             | yes (default)     | Google AI Studio key                                   |
| `AI_PROVIDER`                | no (default `gemini`) | Set to `void` to route through OpenAI-compat endpoint |
| `VOID_API_KEY`               | iff `AI_PROVIDER=void` | Bearer token for OpenAI-compatible endpoint        |
| `VOID_BASE_URL`              | no                | OpenAI-compatible base URL (default `https://api.voidai.app/v1`) |
| `VOID_MODEL`                 | no                | Model name (default `gpt-4o-mini`)                     |
| `NEXT_TELEMETRY_DISABLED`    | no (recommended)  | Set to `1` to opt out of Next telemetry                |

---

## Tests

```bash
npm test
```

Covers:
- Adaptive level detection across phrasing patterns.
- Language config integrity (every code maps to a name, geminiName, placeholder, send label).
- Constituency data validation (every PC has dates, candidates, history).
- Gemini system prompt assembly with and without constituency context.

---

## Build & deploy

### Local production build
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t matdata-mitra ./app
docker run -p 8080:8080 -e GEMINI_API_KEY=your_key matdata-mitra
```

The image uses `output: "standalone"`, runs as non-root user `nextjs:nodejs`, exposes port 8080, and contains only the runtime artefacts — not `node_modules` or source.

### Cloud Run (recommended for the hackathon)
```bash
gcloud run deploy matdata-mitra \
  --source ./app \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --max-instances 5 \
  --update-secrets GEMINI_API_KEY=gemini-api-key:latest
```

`asia-south1` (Mumbai) puts the service close to Indian users.

### Other targets
The standalone build is portable — works on Appwrite Sites, Vercel, Railway, Render, or any Node 20 host. No edge-only APIs, no platform-specific adapters.

---

## Architecture notes

### Why in-context RAG over a vector store
The election knowledge base is small (~10 KB), bounded, and authoritative. Embedding it directly into every system prompt is faster, cheaper, and more debuggable than spinning up a vector DB for a hackathon-scope corpus. When the corpus grows past ~50 KB, swap in a retrieval layer — but not before.

### Why static constituency JSON
Per the [Localized Election Dashboard spec](../docs/feature_location_dashboard.md), live scraping during chat sessions is rate-limit territory. Curated JSON shipped in the bundle keeps the demo deterministic and fast. A `scripts/scrape-civic-data.ts` build step is planned to extend this from 16 PCs to all 543.

### Why two app dirs *don't* exist anymore
An earlier session left a duplicate `app/` at the repo root. It's been removed; only `prompt-wars/app/` is canonical now.

### Why the wordmark cycles every 3 s, not 0.5 s
The first iteration was 500 ms — beautiful for ten seconds, then nauseating. 3 s lets the eye settle on each script.

---

## Roadmap

- Constituency coverage from 16 → 543 PCs via build-time scrape (Wikipedia + MyNeta).
- Election timeline scrubber (`/timeline`) — phases T-90 → POLL → T+5 with Mitra explainers per phase.
- Search-by-PIN with autocomplete (currently lookup hint only).
- Voice mode (Gemini Live API) for low-literacy users.
- Saved-seats list and side-by-side candidate comparison.

---

## Sources

- [Election Commission of India](https://eci.gov.in)
- [Voter Helpline portal](https://voterportal.eci.gov.in)
- [MyNeta](https://myneta.info) — affidavit data
- [datameet/maps](https://github.com/datameet/maps) — India outline
- Representation of the People Act 1950 & 1951
- Conduct of Elections Rules 1961
- Constitution of India, Part XV (Articles 324–329)

## License

MIT (see `LICENSE`). Election data and outlines remain under their original licenses (ECI public-domain, OpenStreetMap ODbL via datameet/maps).

## Acknowledgements

Built for **PromptWars Challenge 2** by Hack2skill and Google for Developers. Powered by Google Gemini and Google Cloud Run.
