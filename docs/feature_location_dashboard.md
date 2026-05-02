# Feature Specification: Localized Election Dashboard

## 1. Overview
Transforming the Matdata Mitra experience from a generic knowledge base into a personalized civic companion. By capturing the user's voting locality upfront, the application contextualizes all subsequent interactions and provides a rich, data-driven sidebar with immediate relevance to the user's actual voting experience.

## 2. Core Components & UI Layout

### A. Location Onboarding
*   **Initial Interaction**: The UI greets the user and asks, "Which area or constituency do you vote in?" (Input via PIN code, District, or Constituency name).
*   **State Management**: The backend identifies the exact geographical context. It determines the user's **Parliamentary Constituency (Lok Sabha for MP)** and their **Assembly Constituency (Vidhan Sabha for MLA)**.

### B. Context-Aware Chat (Main View)
*   **Personalized Responses**: The Gemini agent is injected with the user's location context via the system prompt.
*   **Adaptive Guidance**: The civic education adjusts based on whether the local area is currently in an active election phase or a dormant phase.

### C. The Local Election Sidebar (Dynamic Panel)
A persistent side panel providing instant, structured local data:
*   **Next Election Countdown**: Shows cycle (e.g., Lok Sabha) and polling date.
*   **Voting Day Checklist**: 
    *   Official ECI link to locate their exact polling booth.
    *   List of allowed alternative IDs (Aadhaar, PAN, Passport, etc.) if EPIC/Voter ID is lost.
    *   Crucial booth rules (e.g., strict no-mobile-phone policy inside the booth).
*   **Candidate Roster (Current Cycle)**:
    *   Candidate Name, Party, and **Party Symbol**.
*   **Candidate Deep-Dive (Expandable)**:
    *   **Educational Qualifications**.
    *   **Declared Assets & Liabilities**.
    *   **Criminal Records** (Antecedents).
    *   **Agendas & Promises**.
*   **Locality History**:
    *   Who is the incumbent winner? What was the historical voter turnout percentage?

## 3. Data Architecture Strategy

To ensure speed and reliability without hitting rate limits during the Hackathon demo, we will use a **"Scrape at Build-Time, Store as JSON"** strategy.

1.  **Backend Utility**: A script (`scripts/scrape-civic-data.ts`) will be written to fetch data from Wikipedia and other public sources (like MyNeta).
2.  **Static Store**: The script saves the data into `src/lib/data/constituencies.json`, which is bundled into the Cloud Run Docker image.
3.  **Stateless API**: The Next.js API instantly reads from this JSON file, entirely avoiding live scraping during chat sessions.

## 4. Scraped Data Requirements

The build-time script must extract the following data points for each covered area:

### A. Location Context
*   State, District, and PIN Code mapping.
*   **Constituency Pair**: Names of the local Parliamentary (Lok Sabha) and Assembly (Vidhan Sabha) constituencies.

### B. Election Cycles (For both MP and MLA levels)
*   Current Status (Upcoming/Completed) and Polling Dates.

### C. Candidate Details (Current/Upcoming Cycle)
*   Candidate Name and Political Party affiliation.
*   Party Symbol (image URL or text description).
*   Educational Qualifications.
*   Declared Assets and Liabilities (from public affidavits).
*   Criminal Records / Antecedents (if any).
*   Key Agenda/Manifesto points.

### D. Historical Data
*   Year of the previous election.
*   Incumbent Winner Name & Party.
*   Voter Turnout Percentage (to encourage participation).
*   Margin of Victory.
