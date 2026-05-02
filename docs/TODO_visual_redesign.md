# TODO — Visual Redesign (Civic-India Direction)

## Status: PAUSED — to resume after core features ship

User instruction: "Leave the visual changes as is. Add this task to later. Don't delete the edits made right now."

## Where we are

Already completed:
- `app/src/app/globals.css` — rewritten with civic-India tokens (paper / ink / saffron / green / Ashoka navy). Includes `.pill`, `.btn`, `.btn-primary`, `.btn-saffron`, `.btn-ghost`, `.eyebrow`, `.stamp`, `.ballot-stub`, `.chakra-bg`, `.paper-grain`, `.rule`, `.font-indic`, `.font-mono`, `.font-display`, `wordmarkFade` keyframes, `.prose-mitra` markdown styles.
- `app/src/app/layout.tsx` — loads Plus Jakarta Sans, Tiro Devanagari Hindi, JetBrains Mono, all 8 Noto Sans Indic scripts via `next/font/google`. Sets metadata to "Voting, explained in your own language".
- `app/public/data/india-paths.json` — 24KB simplified India outline (71 polygons, 1709 points) from datameet/maps.
- `app/src/components/ChakraGlyph.tsx` — 24-spoke Ashoka chakra SVG (already a component).

## Important: Existing components still use removed Material 3 tokens

After the new globals.css, these classes no longer exist and need replacing across components:

- `bg-surface`, `bg-surface-container-low`, `bg-surface-dim`, `bg-primary-container` → `bg-paper`, `bg-paper-2`, `bg-paper-3`
- `text-on-surface`, `text-on-surface-variant` → `text-ink`, `text-ink-2`, `text-ink-3`
- `bg-primary`, `text-on-primary` → `bg-ink text-paper` (or `bg-saffron-deep` for accent)
- `border-outline-variant` → `border-paper-edge`
- `text-error` → `text-alert`
- `m3-btn`, `m3-btn-filled`, `m3-btn-tonal`, `m3-chip`, `m3-card`, `m3-elevated` → `btn btn-primary`, `btn btn-ghost`, `pill`
- `google-gradient` (kept for now but should be replaced with civic-India wordmark style)

Files needing updates: `ChatWindow.tsx`, `MessageBubble.tsx`, `QuickGuides.tsx`, `HelplineBar.tsx`, `KnowledgeBadge.tsx`, `LanguageSelector.tsx`, `app/page.tsx`, `app/chat/page.tsx`.

## Remaining design implementation

Source: `.design/prompt-wars/project/` — read all files there before resuming.

### 1. Wordmark component (`src/components/Wordmark.tsx`)
- 10 cycling language variants every 3000ms with `wordmarkFade` 500ms ease animation
- Each variant uses appropriate Noto Sans script font (`var(--font-noto-dev)` etc.)
- Shows last word in `var(--saffron-deep)` color
- Sub-line in `var(--font-mono)` showing English name + language code
- ChakraGlyph icon at left, size+4
- Reference: `.design/prompt-wars/project/parts/chrome.jsx` lines 6-66

### 2. StampBadge component
- Already a CSS class `.stamp` — wrap as React component if needed
- Used for "ECI · Verified Sources", "RPA 1950 / 1951", "Constitution Art. 324"

### 3. Landing page rewrite (`src/app/page.tsx`)
Reference: `.design/prompt-wars/project/parts/landing.jsx`

Desktop layout (1.15fr 1fr grid):
- Top bar: Wordmark + pills (About, Sources · ECI, हिन्दी · EN)
- Left column: bilingual hero
  - Eyebrow: "Bharat · Lok Sabha 2024" + "Civic Education" (saffron)
  - H1 76px: "Voting, [italic saffron]explained[/] in your own language."
  - Hindi tagline `font-indic`: "आपकी भाषा में, आपके अधिकार"
  - Body 17px description mentioning Mitra, ECI, RPA, Constitution
  - Buttons: "Find your constituency" (btn-primary) + "Just chat with Mitra" (btn-ghost)
  - Bottom: 3× StampBadge
  - Background chakra-bg ornament 480×480 bottom-right, opacity 0.55
- Right column (paper-2 bg, ballot-stub):
  - "Form 001 · Choose your language" eyebrow
  - H3: "10 official languages. Pick yours."
  - 2-column grid of LANGS — each card 14px×16px padding, ink/paper bg toggle for selected
  - Bottom strip: green-dot Helpline 1950 · 24×7 + version

Mobile: similar but stacked, 44px H1.

### 4. Constituency Map page (`src/app/map/page.tsx`)
Reference: `.design/prompt-wars/project/parts/map.jsx`

Desktop (1fr 380px grid):
- Left: Wordmark header + pills (All India · Lok Sabha · Vidhan Sabha) + step counter "Step 02 of 03" eyebrow + H2 "Where will you vote?" + IndiaMap SVG with constituency dots + coordinate ticks "543 PC · 28 States · 8 UT"
- Right rail (paper-2): "On hover" eyebrow + ConstituencyPeekCard + rule + "Search" eyebrow + ConstituencySearch + "Recent" eyebrow + recent constituencies list + "Why this matters" callout

The IndiaMap component:
- Loads `parts/india-paths.json` from `/data/india-paths.json` 
- SVG viewBox 0 0 1000 1100, preserveAspectRatio xMidYMid meet
- `paperHatch` pattern fill (rotate 45deg)
- Constituency dots with hover/select states (saffron-deep when selected)
- Projection: `ll(lon, lat)` using `window.__INDIA_PROJ` from JSON
- Lat/long for ~16 major PCs (VAR, MUM, BLR, DEL, KOL, CHN, HYD, AHM, JAI, LKO, PAT, GUW, TVM, AMR, SRI, BHU)

ConstituencyPeekCard:
- 320px width, paper bg, paper-edge border, shadow-3
- Header: "PC · {id}" eyebrow + "Lok Sabha" mono label
- Body: H3 22px name + state + grid of Field components (Voters, Polling Date, Sitting MP, Turnout '19) + last result stat bar (saffron, green, navy, ink-3 stripes) + buttons "Ask Mitra about {name}" + save bookmark

ConstituencySearch:
- Pill input with search icon, ⌘K hint
- Live results 6 max, ranked by name/id/state startsWith
- PIN detection (`^\d{2,6}$`) shows "looking up booth..." row
- Highlight matching text in saffron-deep
- Keyboard: ↑↓ ↵ Esc

### 5. Chat page redesign (`src/app/chat/page.tsx` + `ChatWindow.tsx`)
Reference: `.design/prompt-wars/project/parts/chat.jsx`

Desktop (260px 1fr 300px grid):
- Left sidebar (paper-2): Wordmark + "+ New chat" btn-primary + "Recent" list + "Your seat" card with constituency + Helpline 1950 strip in green-tint
- Main: header (eyebrow "Conversation" + thread title + pills "Beginner | EN | Share") + quick guide pill row + message thread + ChatComposer
- Right rail (paper-2): "Where this comes from" eyebrow + "3 official sources cited" + 3 source cards with mono tag in saffron + "Switch mode" callout

MessageRow:
- User: ink bg, paper text, rounded 18px corners (top/right pin)
- Assistant: ChakraGlyph 28px saffron-deep avatar + "Mitra" name + "Beginner mode" eyebrow + paper bubble with paper-edge border. Bullet items in paper-2 with saffron-deep mono number. Citation chips at bottom. Followup pills below bubble.

ChatComposer:
- Pill-shaped composer with voice button + Send btn-primary
- Below: mono caption "Mitra cites RPA / ECI · Helpline 1950 · cVIGIL"

Mobile chat:
- Compact header with ChakraGlyph + "Mitra" + status pill
- Quick guides row
- Thread
- Composer
- Bottom 2-button strip: Helpline 1950 (green-tint) + Report (cVIGIL) (saffron-tint)

### 6. Timeline page (`src/app/timeline/page.tsx`) — BONUS
Reference: `.design/prompt-wars/project/parts/timeline.jsx`

Horizontal scrubbable timeline of election phases (T-90 → POLL → T+5).
- Phases array with code, date, title, body, tag, active flag
- Dots on a horizontal rail with progress fill up to current
- Labels alternate above/below (even/odd index)
- Below: 3-card grid — "You are here · Polling day" (ballot-stub), "Bring with you" checklist, "Ask Mitra" CTA card (ink bg with chakra-bg)

### 7. Other small components
- `Field` (label, value, hint) — used in PeekCard
- `ChatComposer`
- `MessageRow`
- `SourceCard`

## Verification after completion

1. `npm run build` — zero errors
2. `npm test` — all 22+ tests pass (update LanguageSelector test for new aria roles)
3. Lighthouse a11y ≥ 90
4. Manual: try desktop 1280px + mobile 390px viewports
5. Verify Wordmark cycling works (10 langs every 3s)
6. Verify map loads (24KB JSON from /data/)
7. Verify constituency selection persists in localStorage
8. Verify chat references the chosen constituency in system prompt

## Files to reference (in order)

1. `.design/prompt-wars/README.md` — bundle overview
2. `.design/prompt-wars/chats/chat1.md` — full design conversation
3. `.design/prompt-wars/project/tokens.css` — design tokens (already merged into globals.css)
4. `.design/prompt-wars/project/parts/chrome.jsx` — Wordmark, ChakraGlyph, StampBadge, PhoneBezel, DesktopFrame
5. `.design/prompt-wars/project/parts/landing.jsx` — Landing screens
6. `.design/prompt-wars/project/parts/map.jsx` — Constituency map + PeekCard + Search
7. `.design/prompt-wars/project/parts/chat.jsx` — Chat with sidebar + citation drawer
8. `.design/prompt-wars/project/parts/timeline.jsx` — Election phases scrubber
9. `.design/prompt-wars/project/parts/india-paths.json` — already copied to public/data/
