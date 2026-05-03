# Matdata Mitra — मतदाता मित्र

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
- **Cycling wordmark.** The "Matdata Mitra" logo rotates through all 10 native-script names every 3 seconds with a soft fade animation. The chakra glyph stays put; the script flips.

### Civic-India design system
A bespoke design vocabulary inspired by Indian gazette paper and electoral motifs — not generic Material 3.

- **Palette in OKLCH.** Warm "gazette paper" surfaces, near-black ink with cool Ashoka tint, civic saffron, civic green, and Ashoka navy.
- **Typography.** Plus Jakarta Sans for UI, Tiro Devanagari Hindi for Indic display accents, JetBrains Mono for data labels.
- **Geometric ornament.** A pure-CSS 24-spoke chakra sits behind the hero.
- **Ballot-stub.** Dotted left-edge tear-off on the language picker — a nod to physical ballots.
- **Stamp badges.** Rotated ink-stamp callouts for source provenance (ECI Verified Sources, RPA 1950 / 1951, Constitution Art. 324).

### Interactive constituency map
- Real India outline rendered from `datameet/maps`, simplified to **24 KB** (1709 points, 71 polygons including islands).
- 16 major Lok Sabha constituencies projected by **actual lat/long** — Varanasi, Mumbai South, Bangalore South, New Delhi, Kolkata Dakshin, Chennai Central, Hyderabad, Ahmedabad East, Jaipur, Lucknow, Patna Sahib, Guwahati, Thiruvananthapuram, Amritsar, Srinagar, Bhubaneswar.
- Hover/select with live peek card showing total electors, polling phase, polling date, and sitting MP.
- List fallback below the map for keyboard / accessibility users.

### Persistent constituency sidebar in chat
- Always-visible right rail (≥lg viewport) — no overlay, no Close button. Stays open while you chat.
- Shows per-seat: electors, phase, polling/counting dates, sitting MP, full 2024 candidate roster with affidavit data (age, education, declared assets, liabilities, **criminal cases**), 2019 historical result with turnout & margin, accepted alternate photo IDs, and official ECI booth-finder link.
- Mobile falls back to a closable drawer.

### Adaptive knowledge level
- Detects **novice**, **intermediate**, or **expert** from linguistic patterns in messages.
- Gemini system instruction shifts tone, depth, and citation density to match.
- Knowledge badge in the header shows current level.

### Streaming chat with citations
- POST `/api/chat` returns a streamed `text/plain` response via Gemini's `sendMessageStream`.
- System prompt grounded with ECI guidelines, RPA 1950 & 1951, Conduct of Elections Rules 1961, and the Constitution — plus constituency context when set.
- Strict server-side validation: max 50 messages, max 4000 chars, role checks, language whitelist, constituency ID whitelist, IP-based rate limiting.
- Abort signal propagates to the upstream model.
- Structured JSON logging compatible with Google Cloud Logging.

### Cross-device Voter Helpline call button
- `tel:1950` fires native dialer on mobile.
- Desktop: copies `1950` to clipboard, shows toast "1950 copied — dial from any phone".
- `aria-live="polite"` toast auto-dismisses after 2.4 s.

### Quick-guide chips
Pre-canned starter prompts in the user's language — "How to register to vote", "What to do on polling day", "My vote was cast without me", "Report an election violation", "Lok Sabha vs Vidhan Sabha".

### State persistence
- Selected language → `localStorage["matdata-mitra:lang"]`
- Selected constituency → `localStorage["matdata-mitra:constituency"]`
- Both survive page reloads and navigation between `/`, `/map`, and `/chat`.

### Accessibility
- All interactive controls have `aria-label`s, focus-visible rings using the saffron-deep accent.
- Skip-to-main-content link for keyboard users.
- Language picker uses `role="radiogroup"` / `role="radio"` semantics.
- Chat thread uses `role="log"` with `aria-live="polite"` and `aria-atomic="false"`.
- Reduced-motion media query disables animations.

---

## Routes

| Path        | What                                                          |
|-------------|---------------------------------------------------------------|
| `/`         | Landing — hero, ballot-stub language picker, footer           |
| `/map`      | Constituency map — interactive India SVG + list fallback      |
| `/chat`     | Mitra chat — streaming, persistent sidebar, helpline bar      |
| `/api/chat` | POST `{messages, language, constituencyId}` → streamed reply  |

---

## Tech stack

| Layer        | Choice                                                              |
|--------------|---------------------------------------------------------------------|
| Framework    | Next.js (App Router, Turbopack, `output: "standalone"`)             |
| Language     | TypeScript (strict)                                                 |
| Styling      | Tailwind CSS v4 with OKLCH design tokens                            |
| Fonts        | `next/font/google`: Plus Jakarta Sans, Tiro Devanagari Hindi, JetBrains Mono, 8× Noto Sans Indic |
| AI           | **Google Gemini 2.5 Flash** (`@google/generative-ai`)               |
| State        | React `useState` + localStorage                                     |
| Tests        | Jest + Testing Library (API route, adaptive level, language config, constituencies) |
| Container    | Multi-stage Dockerfile, Node 20 Alpine, non-root user, port 8080    |
| Deploy       | **Google Cloud Run** (`asia-south1`)                                |

---

## File layout

```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx              landing
│   │   ├── map/page.tsx          constituency map + picker
│   │   ├── chat/page.tsx         chat shell
│   │   ├── api/chat/route.ts     streaming POST handler + rate limiter
│   │   ├── layout.tsx            font loaders, metadata, skip link
│   │   └── globals.css           design tokens, civic-India component classes
│   ├── components/
│   │   ├── Wordmark.tsx          cycling 10-script logo
│   │   ├── ChatWindow.tsx        chat shell with permanent sidebar
│   │   ├── LocationDrawer.tsx    permanent sidebar / mobile drawer
│   │   ├── LanguageBallot.tsx    ballot-stub language picker
│   │   ├── HelplineCallButton.tsx  cross-device tel + clipboard
│   │   └── ...
│   └── lib/
│       ├── gemini.ts             system prompt builder + Gemini streaming
│       ├── adaptive.ts           knowledge-level detection
│       ├── knowledge-base.ts     ECI/RPA/Constitution reference (in-context RAG)
│       ├── language.ts           10-language config + validators
│       ├── constituencies.ts     16 PCs with affidavits + history
│       └── types.ts
├── public/
│   └── data/india-paths.json     24 KB simplified India outline
├── __tests__/                    Jest unit + integration suites
├── Dockerfile                    multi-stage standalone build
└── next.config.ts
```

---

## Quickstart

```bash
git clone https://github.com/sainishant-b/prompt-wars
cd prompt-wars/app
npm ci

# Get a free Gemini API key from https://aistudio.google.com/apikey
echo "GEMINI_API_KEY=your_key_here" > .env.local

npm run dev
# open http://localhost:3000
```

### Environment variables

| Var                       | Required         | Purpose                                                                             |
|---------------------------|------------------|-------------------------------------------------------------------------------------|
| `GEMINI_API_KEY`          | yes              | Google AI Studio key — get free at [aistudio.google.com](https://aistudio.google.com/apikey) |
| `NEXT_TELEMETRY_DISABLED` | no (recommended) | Set to `1` to opt out of Next telemetry                                             |

---

## Tests

```bash
cd app && npm test
```

Covers: API route input validation & security boundaries, adaptive level detection, language config integrity, constituency data validation, Gemini system prompt assembly.

---

## Deploy to Cloud Run

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

---

## Architecture notes

### Why in-context RAG over a vector store
The election knowledge base is small (~10 KB), bounded, and authoritative. Embedding it directly into every system prompt is faster, cheaper, and more debuggable than a vector DB for hackathon scope.

### Why static constituency JSON
Live scraping during chat sessions is rate-limit territory. Curated JSON shipped in the bundle keeps the demo deterministic and fast.

---

## Roadmap

- Constituency coverage from 16 → 543 PCs via build-time scrape (Wikipedia + MyNeta).
- Election timeline scrubber (`/timeline`) — phases T-90 → POLL → T+5.
- Search-by-PIN with autocomplete.
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

---

## Acknowledgements

Built for **PromptWars Challenge 2** by Hack2skill and Google for Developers. Powered by Google Gemini 2.5 Flash and Google Cloud Run.
