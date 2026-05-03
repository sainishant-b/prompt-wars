# Matdata Mitra — मतदाता मित्र

**Voting, explained in your own language.**

A multilingual civic-education chatbot for Indian elections. Ask anything about voter registration, polling day, your rights, or what to do if your name is missing from the rolls — in 10 official Indian languages.

Built for **PromptWars Challenge 2** (Hack2skill × Google for Developers) using Google Gemini and Cloud Run.

---

## What it does

- Answers election questions in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, and English
- Interactive constituency map with candidate affidavit data for 16 Lok Sabha seats
- Streaming responses powered by **Google Gemini 2.5 Flash**
- Knowledge grounded in ECI guidelines, RPA 1950/1951, and the Constitution
- Deployed on **Google Cloud Run** (`asia-south1`)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, TypeScript) |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Styling | Tailwind CSS v4 |
| Deploy | Google Cloud Run |

## Repository layout

```
prompt-wars/
├── app/        ← Next.js application (see app/README.md for full docs)
└── docs/       ← Challenge brief, feature specs
```

→ Full documentation: [app/README.md](app/README.md)

## Quickstart

```bash
cd app
npm ci
echo "GEMINI_API_KEY=your_key" > .env.local
npm run dev
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com/apikey).

---

Built with Google Gemini · Google Cloud Run · PromptWars Challenge 2
