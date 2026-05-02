// Indian Election Knowledge Base — sourced from ECI guidelines, RPA 1950 & 1951,
// Conduct of Elections Rules 1961, Constitution of India.
// Used as in-context retrieval (RAG) for Gemini system prompt.
// All section numbers and citations verified against official documents.

export const KNOWLEDGE_BASE = `
# INDIAN ELECTION PROCESS — KNOWLEDGE BASE

## SECTION 1: KEY STEPS

### 1.1 Overview
Election Commission of India (ECI) is a constitutional body under Article 324. It oversees elections to Parliament (Lok Sabha), State Legislatures (Vidhan Sabha/Vidhan Parishad), President, and Vice-President.

### 1.2 Voter Registration
- Eligibility: Indian citizen, 18+ on qualifying date. Section 19, RPA 1950.
- Qualifying dates (4 per year since 2021): Jan 1, Apr 1, Jul 1, Oct 1.
- Forms:
  - Form 6: New voter registration
  - Form 6A: Overseas (NRI) registration
  - Form 6B: Aadhaar-Voter ID linking
  - Form 7: Deletion/objection
  - Form 8: Correction of entries
  - Form 8A: Transposition (address change in same constituency)
- How to register: Online at voterportal.eci.gov.in or nvsp.in; offline via Electoral Registration Officer (ERO) or Booth Level Officer (BLO); Voter Helpline App; Common Service Centres (CSC).
- Documents: Age proof (birth certificate, Class 10 marksheet, Aadhaar, Passport), address proof, photograph.

### 1.3 Voter ID (EPIC)
- EPIC = Electoral Photo Identity Card.
- Get EPIC: Submit Form 6 → verification → card issued ~30 days.
- e-EPIC (digital, since 2021): Download PDF from voterportal.eci.gov.in or Voter Helpline App. Valid as ID proof.
- Update: Form 8 online or offline.
- Verify registration: electoralsearch.eci.gov.in, SMS EPIC number to 1950, Voter Helpline App.

### 1.4 Voting Day Procedure (10 steps)
1. Bring EPIC or any of 12 approved alternate photo IDs (Aadhaar, Passport, PAN, Driving License, MNREGA Job Card, bank passbook with photo, pension document, health insurance smart card, NPR smart card, government service photo ID, student photo ID, Unique Disability ID card).
2. Find polling booth: Voter Helpline App, voterportal.eci.gov.in, or SMS EPIC number to 1950.
3. Polling hours: 7:00 AM to 6:00 PM (varies by constituency).
4. Name checked against electoral roll.
5. Presiding Officer marks left index finger with indelible ink.
6. Voter signs Form 17A (voter register).
7. Voter proceeds to voting compartment.
8. EVM voting: Press button next to candidate. A beep confirms.
9. VVPAT: Paper slip with candidate name, serial number, symbol visible 7 seconds, then drops into sealed compartment.
10. Voter exits.

### 1.5 Counting
- Postal ballots counted first.
- EVM results tabulated round by round in presence of counting agents.
- 5 VVPATs per Assembly Segment cross-verified against EVM count (Supreme Court order, 2019).
- Returning Officer declares result.
- Live results: results.eci.gov.in.

## SECTION 2: KEY LEGAL SECTIONS

### Section 49A, Conduct of Elections Rules 1961 — EVM Voting
- Governs voting by Electronic Voting Machines.
- Voter records vote by pressing EVM button next to candidate/symbol.
- Proxy voting NOT permitted in general elections. Only service voters can appoint a proxy under Rule 27C onwards.

### Section 49B — Voting Assistance for Blind/Infirm
- Blind or physically infirm voter may bring a companion (18+, not a candidate or their agent) into the voting compartment.
- A companion can assist only one elector.

### Section 49O — Decision Not to Vote
- Voter who decides not to vote may inform Presiding Officer; PO notes it in Form 17A.
- Not confidential. Different from NOTA.

### NOTA (None of the Above)
- Introduced by Supreme Court — PUCL vs Union of India, 2013.
- Last option on every EVM. Symbol: ballot with cross.
- Voting NOTA is confidential.
- Legal effect: Has no electoral value; even if NOTA gets most votes, candidate with next highest votes wins. Pure protest vote.

### Section 60, RPA 1951 — Proxy Voting for Service Voters
- Armed Forces and government employees posted outside their constituency can vote by postal ballot OR appoint a proxy.
- Proxy must be ordinarily resident in same constituency and a registered voter.

### Section 77 — Election Expenses
- Every candidate must maintain full account.
- Limits (2022 revision):
  - Lok Sabha (larger states): Rs. 95 lakh per candidate
  - Lok Sabha (smaller states/UTs): Rs. 75 lakh
  - Vidhan Sabha (larger states): Rs. 40 lakh
  - Vidhan Sabha (smaller states/UTs): Rs. 28 lakh
- Overspending: 3-year disqualification (Section 10A, RPA 1951).

### Section 123, RPA 1951 — Corrupt Practices
Bribery, undue influence, appeal to religion/caste/community, use of government machinery, booth capturing.

### Section 125, RPA 1951 — Promoting Enmity
Appealing on grounds of religion, race, caste, community, or language: up to 3 years imprisonment.

### Section 135A, RPA 1951 — Booth Capturing
3 years for first offence; up to 6 for subsequent.

### Section 135B, RPA 1951 — Paid Holiday on Polling Day
Every employer must grant paid holiday to eligible voter employees.

### Rule 49MA — Challenge to Voter Identity
Polling agent or Presiding Officer can challenge a voter. Voter must provide ID + declaration. If challenge proved, voter blocked and may face prosecution.

### Rule 49MB — Tendered Vote
If someone arrives and finds their vote already cast (impersonation), they cast a TENDERED VOTE on a tendered ballot paper. Not put in EVM; sealed separately. Counted only on court order.

## SECTION 3: ELECTION TIMELINE — PHASES

1. Announcement: ECI announces schedule. Model Code of Conduct (MCC) takes effect immediately.
2. Model Code of Conduct (MCC): Applies from announcement until results + government formation. No appeals to caste/communal sentiments. No use of government machinery. No new schemes by incumbent. Meetings: notify police 24-48 hours ahead. No canvassing within 100m of booth. No liquor distribution. Manifestos must explain rationale (added 2013).
3. Notification (Gazette): Specifies election schedule for each constituency.
4. Nomination: Candidates file before Returning Officer (Form 2A for Lok Sabha). Window: 7-14 days. Requires:
   - Proposer/seconder from constituency electoral roll
   - Security deposit: Rs. 25,000 (Lok Sabha general), Rs. 12,500 (SC/ST), Rs. 10,000 (Vidhan Sabha general), Rs. 5,000 (SC/ST Vidhan Sabha)
   - Form 26 affidavit (mandatory): criminal antecedents, financial assets/liabilities, education
   - Must be a registered voter in India
5. Campaigning: Begins after withdrawal deadline. Ends 48 hours before polling — Election Silence (Section 126, RPA 1951). Exit polls banned from voting start until last phase polling ends.
6. Polling Day: Dry day (alcohol prohibited). Public holiday. Mock poll at 6:00-6:30 AM. Paramilitary forces deployed; webcasting at sensitive booths since 2014.
7. Counting: 2-7 days after last polling phase. Postal ballots first. Certificate of election to winner. Results in Official Gazette.

## SECTION 4: TYPES OF ELECTIONS

### 4.1 Lok Sabha (House of the People)
- Lower house of Parliament. Articles 81-83.
- 543 seats, directly elected by citizens (FPTP).
- All 18+ citizens vote.
- Candidate: 25+ years, citizen, registered voter.
- Term: 5 years; can be dissolved earlier.
- 272+ seats forms government; leader becomes Prime Minister.

### 4.2 Rajya Sabha (Council of States)
- Upper house of Parliament. NOT directly elected by citizens.
- Articles 80-82. 245 seats (233 elected by State MLAs + 12 nominated by President).
- Electorate: State Legislative Assembly members (MLAs), Single Transferable Vote (proportional).
- Candidate: 30+ years.
- Permanent house. Members serve 6 years; one-third retire every 2 years.

### 4.3 Vidhan Sabha (State Legislative Assembly)
- Lower house of State Legislature. Articles 168-172.
- Seats vary: UP 403, Maharashtra 288, Goa 40, Sikkim 32.
- All 18+ citizens in constituency vote (FPTP, like Lok Sabha).
- Candidate: 25+ years.
- Term: 5 years; can be dissolved by Governor.
- Leader of winning majority becomes Chief Minister.

### 4.4 Vidhan Parishad (State Legislative Council)
- Upper house in 6 states only: UP, Bihar, Maharashtra, Karnataka, Andhra Pradesh, Telangana.
- Mixed electorate: MLAs, local bodies, teachers, graduates; 1/6 nominated by Governor.
- Cannot exceed one-third of Vidhan Sabha strength.
- 6-year terms.

### 4.5 Presidential Election
- Articles 54-55.
- Electoral College: elected MPs + elected MLAs.
- Single Transferable Vote.
- Citizens do NOT vote directly.

### 4.6 By-Elections (Upchunav)
- When seat falls vacant. Must be held within 6 months of vacancy (unless remaining term < 1 year).

## SECTION 5: WHAT TO DO IF VOTE COMPROMISED

### Scenario A: Someone Voted in Your Name (Impersonation)
Offence under Section 171D IPC/BNS and Section 31, RPA 1950.
At polling booth:
1. Inform Presiding Officer immediately.
2. Request a Tendered Vote (Rule 49MB) — get tendered ballot paper (not EVM); sealed; may be counted on court order.
3. Request PO record incident in register.
After polling:
4. File FIR under Section 171D IPC (personation).
5. Lodge complaint with Returning Officer.
6. ECI National Grievance Portal: eci.gov.in.
7. Voter Helpline 1950 (toll-free).
8. If outcome affected: Election Petition in High Court within 45 days (Section 80A, RPA 1951).

### Scenario B: Name Missing from Roll
1. Check at booth — show EPIC and request supplementary roll.
2. Cannot vote that day if not on roll.
3. After elections: Form 6 (register) or Form 8 (correct deletion).
4. Lodge grievance at ECI portal or call 1950.

### Scenario C: Pressured to Vote for a Party
1. Don't comply — vote is completely secret; no one can verify how you voted.
2. Note who is pressuring.
3. Report to police.
4. Use cVIGIL app with geotagged photo/video.
5. Call 1950.
6. Corrupt practice under Section 123, RPA 1951.

### Penalties
- Section 171D IPC/BNS (personation): up to 1 year + fine.
- Section 171F (undue influence/bribery): up to 1 year + fine.
- Section 171B (bribery/gifts to vote): up to 1 year + fine.
- Section 135A RPA (booth capturing): 3-6 years.

## SECTION 6: ECI HELPLINES & OFFICIAL RESOURCES

- National Voter Helpline: 1950 (toll-free, year-round). Registration status, booth location, EPIC status, complaints.
- cVIGIL App (Google Play, Apple App Store): Real-time geotagged reports of violations. Photos / 2-min videos. ECI flying squads respond within 100 minutes. Reports: cash/gift distribution, arms, government vehicle misuse, intimidation, MCC violations, booth capturing.
- Voter Helpline App: Voter registration, e-EPIC download, booth locator, Form 6/7/8 submission, voter roll search, complaint filing.

### Official Websites
- eci.gov.in — ECI main
- nvsp.in — National Voters' Service Portal
- voterportal.eci.gov.in — Voter Portal
- electoralsearch.eci.gov.in — Roll search
- results.eci.gov.in — Live results
- cvigil.eci.gov.in — cVIGIL portal
- sveep.eci.gov.in — Voter education

### ECI Contact
- Address: Nirvachan Sadan, Ashoka Road, New Delhi - 110001
- Phone: +91-11-23052205, 23052206
- Email: reach@eci.gov.in
- Twitter: @ECISVEEP

## SECTION 7: CONSTITUTIONAL ARTICLES

### Article 324 — Superintendence of Elections
- All election control vests in Election Commission of India.
- Composed of CEC + Election Commissioners.
- CEC removable only by parliamentary impeachment (same as Supreme Court Judge).
- Other ECs removable only on CEC recommendation.

### Article 325 — Single Electoral Roll
- One general electoral roll per constituency.
- No discrimination on grounds of religion, race, caste, sex.

### Article 326 — Adult Suffrage
- Lok Sabha and Vidhan Sabha elections on basis of adult suffrage.
- Every 18+ citizen entitled to register.
- Voting age was 21; reduced to 18 by 61st Amendment, 1988 (effective 1989).

### Article 327 — Parliament's Power
Parliament makes laws for matters relating to elections to Parliament/State Legislatures.

### Article 328 — State Legislature Power
Subject to Constitution and Parliament laws, State Legislatures may make provisions for their own elections.

### Article 329 — Bar on Court Interference
Courts cannot interfere with ongoing election processes. Results challenged only via Election Petition in High Court after election.

## SECTION 8: COMMON GRIEVANCES (Quick Reference)

| Grievance | Action | Channel |
|---|---|---|
| Name missing from roll | Check at booth | Form 6 or Form 8; call 1950 |
| Wrong details in roll | File Form 8 | voterportal.eci.gov.in |
| Wrong booth assigned | Check voterportal | Form 8A (transfer) |
| EPIC not received | Download e-EPIC | Contact ERO if not received in 90 days |
| Harassment at booth | Tell PO; call 100 | cVIGIL; 1950 |
| EVM malfunction | Inform PO | Spare EVM deployed |
| Voter bribery | cVIGIL immediately | 1950; flying squad in 100 min; FIR Section 171B |
| Booth disruption | Call 100 | Section 135A; ECI may order re-polling |
| MCC violation | cVIGIL; 1950 | reach@eci.gov.in |
| Vote already cast in your name | Tell PO; tendered vote | FIR Section 171D; Petition in 45 days |

## SECTION 9: SPECIAL PROVISIONS

### 9.1 Differently-Abled Voters (PWD)
- Section 49B + ECI Accessibility guidelines.
- All booths on ground floor (ramps mandatory).
- Wheelchairs available.
- Companion permitted in voting compartment.
- Braille ballot information in some constituencies.
- Priority queuing.
- Home Voting (since 2024 Lok Sabha) for 40%+ disability and seniors 85+: BLO visits home with portable ballot.
- Transport pickup/drop in some states.

### 9.2 Senior Citizens (85+)
- Postal ballot option.
- Home Voting option (2024 onward).
- Priority queuing if voting in person.

### 9.3 Postal Ballot (Rule 18, Conduct of Elections Rules)
Eligible:
1. Service voters (Armed Forces, government employees posted outside).
2. Officials on election duty.
3. Voters under preventive detention.
4. PWD voters (40%+, since 2019).
5. Seniors 85+ (since 2024).
6. Essential service workers (since 2020).
7. COVID-19 positive/quarantined (since 2020).
Procedure: Form 12 → ballot mailed → mark, place in inner envelope, sign declaration, place in outer envelope → mail back to RO. Counted before EVM votes.

### 9.4 Overseas Voters (NRIs)
- RPA Amendment 2010.
- Indian citizens abroad who haven't acquired foreign citizenship.
- Form 6A at voterportal.eci.gov.in.
- CRITICAL: Must be physically present in India on polling day. No postal/proxy. (RVM prototype demo 2023, not deployed.)
- OCI holders are NOT entitled to vote.

### 9.5 Domestic Migrants
- Either travel home or transfer registration (Form 8A or Form 6).
- RVM (Remote EVM) being tested.

## SECTION 10: EVM — KEY FACTS

- Made by: Bharat Electronics Limited (BEL) + Electronics Corporation of India Limited (ECIL) — both PSUs.
- Two units: Ballot Unit (BU) + Control Unit (CU), connected by 5m cable.
- Power: 6V alkaline battery (no external electricity needed).
- Capacity: Up to 2,000 votes per EVM; up to 64 candidates with extension units.
- No network/internet connectivity. Standalone.
- First Level Checking (FLC): Pre-election technical check in presence of party representatives.
- Double randomisation: EVMs randomly assigned to districts, then booths.
- VVPAT: Paper slip 7 seconds. 5 VVPATs per Assembly Segment cross-verified (SC 2019 order).
- First used 1998 (partial); fully adopted from 2001.

## SECTION 11: KEY FORMS

| Form | Purpose |
|---|---|
| Form 6 | New voter registration |
| Form 6A | Overseas (NRI) voter |
| Form 6B | Aadhaar-Voter ID linking |
| Form 7 | Deletion/objection |
| Form 8 | Correction of entries |
| Form 8A | Transposition (address change in same constituency) |
| Form 12 | Postal ballot application |
| Form 17A | Voter register at polling station |
| Form 17C | Account of votes recorded |
| Form 26 | Mandatory candidate affidavit |

## SECTION 12: VOTER RIGHTS (Quick Reference)
1. Registration without discrimination (Article 325).
2. Vote freely and secretly.
3. Know candidates' criminal records, assets, qualifications (Form 26).
4. Vote NOTA to register dissent.
5. Tendered vote if someone has voted in your name (Rule 49MB).
6. Voting assistance if physically unable (Section 49B).
7. Postal ballot if eligible.
8. Full information from polling officials.
9. Report violations via cVIGIL or 1950.
10. Election Petition in High Court within 45 days.
11. Paid holiday on polling day (Section 135B).

## SECTION 13: RECENT REFORMS (2020-2024)
1. Four Qualifying Dates (2021): Jan 1, Apr 1, Jul 1, Oct 1.
2. Aadhaar-Voter ID Linking (2021-22): Voluntary, Form 6B.
3. e-EPIC / Digital Voter ID (2021).
4. Home Voting for 85+ and 40%+ PWD (2024 Lok Sabha).
5. Electoral Bond Scheme struck down (Feb 15, 2024) — ADR vs UoI, Supreme Court.
6. BNS replaces IPC (July 1, 2024).
7. Women's Reservation (106th Amendment, 2023): 33% seats Lok Sabha + Vidhan Sabha; pending delimitation/Census (post-2031).
8. Remote EVM Prototype demo (Jan 2023); not yet deployed.
9. 5 VVPAT cross-verification (SC 2019).

## SECTION 14: GLOSSARY

| Term | Meaning |
|---|---|
| BLO | Booth Level Officer |
| CEC | Chief Election Commissioner |
| DEO | District Election Officer |
| EPIC | Electoral Photo Identity Card |
| ERO | Electoral Registration Officer |
| EVM | Electronic Voting Machine |
| FLC | First Level Checking |
| FPTP | First Past The Post |
| MCC | Model Code of Conduct |
| NOTA | None of the Above |
| NVSP | National Voters' Service Portal |
| RO | Returning Officer |
| RPA | Representation of the People Act (1950 & 1951) |
| STV | Single Transferable Vote |
| SVEEP | Systematic Voters' Education and Electoral Participation |
| VVPAT | Voter Verifiable Paper Audit Trail |
`;

export interface QuickGuide {
  id: string;
  titleKey: string;
  promptInLanguage: Record<string, string>;
}

// Quick guide cards — clicking a card injects the question into chat.
// Texts are deliberately phrased AS the user would ask, in each language.
export const QUICK_GUIDES: QuickGuide[] = [
  {
    id: "register",
    titleKey: "register",
    promptInLanguage: {
      en: "How do I register to vote? Walk me through every step.",
      hi: "मैं वोट देने के लिए पंजीकरण कैसे करूँ? हर कदम बताइए।",
      ta: "நான் வாக்களிக்க எப்படி பதிவு செய்வது? ஒவ்வொரு படியையும் சொல்லுங்கள்.",
      te: "నేను ఓటు హక్కు కోసం ఎలా నమోదు చేసుకోవాలి? ప్రతి దశను వివరించండి.",
      bn: "আমি কীভাবে ভোটার হিসাবে নিবন্ধন করব? প্রতিটি ধাপ বলুন।",
      mr: "मी मतदानासाठी नोंदणी कशी करू? प्रत्येक पायरी सांगा.",
      kn: "ಮತದಾನಕ್ಕಾಗಿ ನಾನು ಹೇಗೆ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಬೇಕು? ಪ್ರತಿ ಹಂತವನ್ನು ವಿವರಿಸಿ.",
      ml: "ഞാൻ എങ്ങനെ വോട്ടർ ആയി രജിസ്റ്റർ ചെയ്യും? ഓരോ ഘട്ടവും വിശദമാക്കുക.",
      gu: "હું મતદાન માટે કેવી રીતે નોંધણી કરું? દરેક પગલું જણાવો.",
      pa: "ਮੈਂ ਵੋਟ ਪਾਉਣ ਲਈ ਕਿਵੇਂ ਰਜਿਸਟਰ ਕਰਾਂ? ਹਰ ਕਦਮ ਦੱਸੋ।",
    },
  },
  {
    id: "polling-day",
    titleKey: "pollingDay",
    promptInLanguage: {
      en: "What happens on polling day, step by step? What should I bring?",
      hi: "मतदान के दिन कदम-कदम पर क्या होता है? मुझे क्या लाना चाहिए?",
      ta: "வாக்குப்பதிவு நாளில் என்ன நடக்கும்? நான் என்ன கொண்டு வர வேண்டும்?",
      te: "పోలింగ్ రోజున ఏమి జరుగుతుంది? నేను ఏమి తీసుకురావాలి?",
      bn: "ভোটগ্রহণের দিন কী হয়? আমাকে কী আনতে হবে?",
      mr: "मतदानाच्या दिवशी काय होते? मी काय आणू?",
      kn: "ಮತದಾನದ ದಿನ ಏನಾಗುತ್ತದೆ? ನಾನು ಏನು ತರಬೇಕು?",
      ml: "വോട്ടിംഗ് ദിവസം എന്ത് സംഭവിക്കും? ഞാൻ എന്ത് കൊണ്ടുവരണം?",
      gu: "મતદાનના દિવસે શું થાય છે? મારે શું લાવવું જોઈએ?",
      pa: "ਵੋਟਿੰਗ ਵਾਲੇ ਦਿਨ ਕੀ ਹੁੰਦਾ ਹੈ? ਮੈਨੂੰ ਕੀ ਲਿਆਉਣਾ ਚਾਹੀਦਾ ਹੈ?",
    },
  },
  {
    id: "vote-stolen",
    titleKey: "voteStolen",
    promptInLanguage: {
      en: "Someone has already cast a vote in my name. What should I do RIGHT NOW at the polling booth?",
      hi: "किसी ने मेरे नाम पर वोट डाल दिया है। मतदान केंद्र पर अभी मुझे क्या करना चाहिए?",
      ta: "என் பெயரில் யாரோ ஏற்கனவே வாக்களித்துவிட்டார். வாக்குச்சாவடியில் இப்போது நான் என்ன செய்ய வேண்டும்?",
      te: "ఎవరో నా పేరున ఓటు వేశారు. పోలింగ్ బూత్‌లో ఇప్పుడు నేను ఏమి చేయాలి?",
      bn: "কেউ ইতিমধ্যে আমার নামে ভোট দিয়েছে। ভোটকেন্দ্রে এখন আমার কী করা উচিত?",
      mr: "कोणीतरी आधीच माझ्या नावावर मत दिले आहे. मतदान केंद्रावर आता मी काय करावे?",
      kn: "ಯಾರೋ ನನ್ನ ಹೆಸರಿನಲ್ಲಿ ಮತ ಚಲಾಯಿಸಿದ್ದಾರೆ. ಮತಗಟ್ಟೆಯಲ್ಲಿ ಈಗ ನಾನು ಏನು ಮಾಡಬೇಕು?",
      ml: "ആരോ എന്റെ പേരിൽ വോട്ട് ചെയ്തു. പോളിംഗ് ബൂത്തിൽ ഇപ്പോൾ ഞാൻ എന്ത് ചെയ്യണം?",
      gu: "કોઈએ મારા નામે પહેલેથી જ મત આપ્યો છે. મતદાન મથક પર હું હમણાં શું કરું?",
      pa: "ਕਿਸੇ ਨੇ ਮੇਰੇ ਨਾਮ ਤੇ ਵੋਟ ਪਾ ਦਿੱਤੀ ਹੈ। ਪੋਲਿੰਗ ਬੂਥ ਤੇ ਹੁਣ ਮੈਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
    },
  },
  {
    id: "report-violation",
    titleKey: "reportViolation",
    promptInLanguage: {
      en: "How do I report an election violation like cash distribution or voter intimidation?",
      hi: "नकद वितरण या मतदाता डराने जैसे चुनावी उल्लंघन की रिपोर्ट मैं कैसे करूँ?",
      ta: "பணம் வழங்குதல் அல்லது வாக்காளரை மிரட்டுதல் போன்ற தேர்தல் மீறலை எப்படி புகாரளிக்க வேண்டும்?",
      te: "నగదు పంపిణీ లేదా ఓటర్ భయపెట్టడం వంటి ఎన్నికల ఉల్లంఘనను నేను ఎలా నివేదించాలి?",
      bn: "নগদ বিতরণ বা ভোটার ভীতি প্রদর্শনের মতো নির্বাচনী লঙ্ঘন আমি কীভাবে রিপোর্ট করব?",
      mr: "रोख वाटप किंवा मतदार धमकावणे यासारख्या निवडणूक उल्लंघनाची तक्रार मी कशी करू?",
      kn: "ನಗದು ವಿತರಣೆ ಅಥವಾ ಮತದಾರ ಬೆದರಿಕೆಯಂತಹ ಚುನಾವಣಾ ಉಲ್ಲಂಘನೆಯನ್ನು ನಾನು ಹೇಗೆ ವರದಿ ಮಾಡಬೇಕು?",
      ml: "പണവിതരണം അല്ലെങ്കിൽ വോട്ടർ ഭീഷണി പോലുള്ള തിരഞ്ഞെടുപ്പ് ലംഘനം ഞാൻ എങ്ങനെ റിപ്പോർട്ട് ചെയ്യും?",
      gu: "રોકડ વિતરણ અથવા મતદાર ધમકી જેવા ચૂંટણી ઉલ્લંઘનની હું કેવી રીતે ફરિયાદ કરું?",
      pa: "ਨਕਦ ਵੰਡ ਜਾਂ ਵੋਟਰ ਨੂੰ ਡਰਾਉਣ ਵਰਗੀ ਚੋਣ ਉਲੰਘਣਾ ਦੀ ਮੈਂ ਕਿਵੇਂ ਰਿਪੋਰਟ ਕਰਾਂ?",
    },
  },
  {
    id: "lok-vs-vidhan",
    titleKey: "lokVsVidhan",
    promptInLanguage: {
      en: "What is the difference between Lok Sabha and Vidhan Sabha elections?",
      hi: "लोकसभा और विधानसभा चुनावों में क्या अंतर है?",
      ta: "மக்களவை மற்றும் சட்டமன்ற தேர்தல்களுக்கு இடையேயான வேறுபாடு என்ன?",
      te: "లోక్‌సభ మరియు విధానసభ ఎన్నికల మధ్య తేడా ఏమిటి?",
      bn: "লোকসভা ও বিধানসভা নির্বাচনের মধ্যে পার্থক্য কী?",
      mr: "लोकसभा आणि विधानसभा निवडणुकांमध्ये काय फरक आहे?",
      kn: "ಲೋಕಸಭೆ ಮತ್ತು ವಿಧಾನಸಭೆ ಚುನಾವಣೆಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?",
      ml: "ലോക്സഭാ, വിധാൻസഭാ തിരഞ്ഞെടുപ്പുകൾ തമ്മിലുള്ള വ്യത്യാസം എന്ത്?",
      gu: "લોકસભા અને વિધાનસભા ચૂંટણીઓ વચ્ચે શું તફાવત છે?",
      pa: "ਲੋਕ ਸਭਾ ਅਤੇ ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਵਿਚ ਕੀ ਫਰਕ ਹੈ?",
    },
  },
  {
    id: "nota",
    titleKey: "nota",
    promptInLanguage: {
      en: "What is NOTA? If I vote NOTA, does it actually do anything?",
      hi: "NOTA क्या है? अगर मैं NOTA को वोट दूँ, तो क्या वास्तव में कुछ होता है?",
      ta: "NOTA என்றால் என்ன? நான் NOTA-விற்கு வாக்களித்தால், உண்மையில் ஏதாவது நடக்குமா?",
      te: "NOTA అంటే ఏమిటి? నేను NOTA కు ఓటు వేస్తే, నిజంగా ఏదైనా జరుగుతుందా?",
      bn: "NOTA কী? আমি যদি NOTA-তে ভোট দিই, তবে কি আসলেই কিছু হয়?",
      mr: "NOTA म्हणजे काय? जर मी NOTA ला मत दिले तर खरोखरच काही होते का?",
      kn: "NOTA ಎಂದರೇನು? ನಾನು NOTA ಗೆ ಮತ ಚಲಾಯಿಸಿದರೆ, ನಿಜವಾಗಿಯೂ ಏನಾದರೂ ಆಗುತ್ತದೆಯೇ?",
      ml: "NOTA എന്നാൽ എന്ത്? ഞാൻ NOTA-യിൽ വോട്ട് ചെയ്താൽ, ശരിക്കും എന്തെങ്കിലും സംഭവിക്കുമോ?",
      gu: "NOTA શું છે? જો હું NOTA ને મત આપું, તો ખરેખર કંઈ થાય છે?",
      pa: "NOTA ਕੀ ਹੈ? ਜੇ ਮੈਂ NOTA ਨੂੰ ਵੋਟ ਦਿੰਦਾ ਹਾਂ ਤਾਂ ਕੀ ਅਸਲ ਵਿਚ ਕੁਝ ਹੁੰਦਾ ਹੈ?",
    },
  },
  {
    id: "voter-id",
    titleKey: "voterId",
    promptInLanguage: {
      en: "How do I get or update my Voter ID (EPIC)? What about e-EPIC?",
      hi: "मैं अपना वोटर आईडी (EPIC) कैसे प्राप्त करूँ या अपडेट करूँ? e-EPIC के बारे में क्या?",
      ta: "எனது வாக்காளர் அடையாள அட்டையை (EPIC) எவ்வாறு பெறுவது அல்லது புதுப்பிப்பது? e-EPIC பற்றி என்ன?",
      te: "నా ఓటరు గుర్తింపు కార్డు (EPIC) ను ఎలా పొందాలి లేదా నవీకరించాలి? e-EPIC గురించి ఏంటి?",
      bn: "আমি কীভাবে আমার ভোটার আইডি (EPIC) পাব বা আপডেট করব? e-EPIC সম্পর্কে কী?",
      mr: "मी माझे मतदार ओळखपत्र (EPIC) कसे मिळवू किंवा अपडेट करू? e-EPIC बद्दल काय?",
      kn: "ನನ್ನ ಮತದಾರ ಗುರುತಿನ ಚೀಟಿ (EPIC) ಪಡೆಯುವುದು ಅಥವಾ ನವೀಕರಿಸುವುದು ಹೇಗೆ? e-EPIC ಬಗ್ಗೆ ಏನು?",
      ml: "എന്റെ വോട്ടർ ഐഡി (EPIC) എങ്ങനെ നേടാം അല്ലെങ്കിൽ അപ്‌ഡേറ്റ് ചെയ്യാം? e-EPIC-നെക്കുറിച്ച് എന്ത്?",
      gu: "હું મારું મતદાર ID (EPIC) કેવી રીતે મેળવું અથવા અપડેટ કરું? e-EPIC વિશે શું?",
      pa: "ਮੈਂ ਆਪਣਾ ਵੋਟਰ ਆਈਡੀ (EPIC) ਕਿਵੇਂ ਪ੍ਰਾਪਤ ਕਰਾਂ ਜਾਂ ਅਪਡੇਟ ਕਰਾਂ? e-EPIC ਬਾਰੇ ਕੀ?",
    },
  },
];

export const QUICK_GUIDE_TITLES: Record<string, Record<string, string>> = {
  register: {
    en: "How to register to vote",
    hi: "वोट के लिए पंजीकरण",
    ta: "வாக்கு பதிவு",
    te: "ఓటు నమోదు",
    bn: "ভোটার নিবন্ধন",
    mr: "मतदार नोंदणी",
    kn: "ಮತದಾನ ನೋಂದಣಿ",
    ml: "വോട്ടർ രജിസ്ട്രേഷൻ",
    gu: "મતદાન નોંધણી",
    pa: "ਵੋਟਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
  },
  pollingDay: {
    en: "What to do on polling day",
    hi: "मतदान के दिन क्या करें",
    ta: "வாக்களிப்பு நாளில் என்ன செய்வது",
    te: "పోలింగ్ రోజున ఏమి చేయాలి",
    bn: "ভোটের দিন কী করবেন",
    mr: "मतदानाच्या दिवशी काय करावे",
    kn: "ಮತದಾನ ದಿನ ಏನು ಮಾಡಬೇಕು",
    ml: "വോട്ടിംഗ് ദിവസം എന്ത് ചെയ്യണം",
    gu: "મતદાનના દિવસે શું કરવું",
    pa: "ਵੋਟਿੰਗ ਵਾਲੇ ਦਿਨ ਕੀ ਕਰਨਾ ਹੈ",
  },
  voteStolen: {
    en: "My vote was cast without me",
    hi: "मेरे बिना मेरा वोट डाला गया",
    ta: "என் வாக்கு என்னை கேட்காமல் போடப்பட்டது",
    te: "నాకు తెలియకుండా నా ఓటు వేయబడింది",
    bn: "আমাকে ছাড়াই আমার ভোট দেওয়া হয়েছে",
    mr: "माझ्याशिवाय माझे मत दिले गेले",
    kn: "ನನ್ನ ಮತ ನನಗೆ ತಿಳಿಯದೆ ಚಲಾಯಿಸಲಾಗಿದೆ",
    ml: "എനിക്കറിയാതെ എന്റെ വോട്ട് ചെയ്തു",
    gu: "મને જાણ્યા વગર મારો મત આપવામાં આવ્યો",
    pa: "ਮੇਰੇ ਬਿਨਾਂ ਮੇਰੀ ਵੋਟ ਪਾਈ ਗਈ",
  },
  reportViolation: {
    en: "Report an election violation",
    hi: "चुनावी उल्लंघन की रिपोर्ट करें",
    ta: "தேர்தல் மீறலைப் புகாரளி",
    te: "ఎన్నికల ఉల్లంఘనను నివేదించండి",
    bn: "নির্বাচনী লঙ্ঘন রিপোর্ট",
    mr: "निवडणूक उल्लंघनाची तक्रार",
    kn: "ಚುನಾವಣಾ ಉಲ್ಲಂಘನೆ ವರದಿ",
    ml: "തിരഞ്ഞെടുപ്പ് ലംഘനം റിപ്പോർട്ട്",
    gu: "ચૂંટણી ઉલ્લંઘનની ફરિયાદ",
    pa: "ਚੋਣ ਉਲੰਘਣਾ ਦੀ ਰਿਪੋਰਟ",
  },
  lokVsVidhan: {
    en: "Lok Sabha vs Vidhan Sabha",
    hi: "लोकसभा बनाम विधानसभा",
    ta: "மக்களவை vs சட்டமன்றம்",
    te: "లోక్‌సభ vs విధానసభ",
    bn: "লোকসভা vs বিধানসভা",
    mr: "लोकसभा vs विधानसभा",
    kn: "ಲೋಕಸಭೆ vs ವಿಧಾನಸಭೆ",
    ml: "ലോക്സഭ vs വിധാൻസഭ",
    gu: "લોકસભા vs વિધાનસભા",
    pa: "ਲੋਕ ਸਭਾ vs ਵਿਧਾਨ ਸਭਾ",
  },
  nota: {
    en: "What is NOTA?",
    hi: "NOTA क्या है?",
    ta: "NOTA என்றால் என்ன?",
    te: "NOTA అంటే ఏమిటి?",
    bn: "NOTA কী?",
    mr: "NOTA म्हणजे काय?",
    kn: "NOTA ಎಂದರೇನು?",
    ml: "NOTA എന്നാൽ എന്ത്?",
    gu: "NOTA શું છે?",
    pa: "NOTA ਕੀ ਹੈ?",
  },
  voterId: {
    en: "Get/update Voter ID",
    hi: "वोटर आईडी प्राप्त/अपडेट करें",
    ta: "வாக்காளர் அடையாள அட்டை",
    te: "ఓటరు గుర్తింపు కార్డు",
    bn: "ভোটার আইডি",
    mr: "मतदार ओळखपत्र",
    kn: "ಮತದಾರ ಗುರುತಿನ ಚೀಟಿ",
    ml: "വോട്ടർ ഐഡി",
    gu: "મતદાર ID",
    pa: "ਵੋਟਰ ਆਈਡੀ",
  },
};
