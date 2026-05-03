import type { LanguageCode } from "./types";

export interface LanguageConfig {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  geminiName: string;
  inputPlaceholder: string;
  sendLabel: string;
  appTagline: string;
  helplineLabel: string;
  cvigilLabel: string;
  startChatLabel: string;
  selectLanguagePrompt: string;
  // Landing page translations
  heroLine1: string;
  heroLine2Italic: string;
  heroLine3: string;
  heroSubtitle: string;
  heroBody: string;
  ctaMap: string;
  ctaChat: string;
  ballotTitle: string;
  footerDisclaimer: string;
  footerAbout: string;
  footerSources: string;
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: {
    code: "en",
    nativeName: "English",
    englishName: "English",
    geminiName: "English",
    inputPlaceholder: "Ask about voting, registration, your rights...",
    sendLabel: "Send",
    appTagline: "Your friendly guide to Indian elections",
    helplineLabel: "Voter Helpline 1950",
    cvigilLabel: "Report violation (cVIGIL)",
    startChatLabel: "Start Chat",
    selectLanguagePrompt: "Choose your language",
    heroLine1: "Voting,",
    heroLine2Italic: "explained",
    heroLine3: "in your own language.",
    heroSubtitle: "Your language. Your rights.",
    heroBody:
      "Talk to Mitra, your friendly guide to Indian elections. Ask anything — registration, polling day, what to do if your name is missing. Backed by ECI guidelines, RPA 1950 & 1951, and the Constitution.",
    ctaMap: "Find your constituency",
    ctaChat: "Just chat with Mitra",
    ballotTitle: "10 official languages.\nPick yours.",
    footerDisclaimer:
      "Content shown is illustrative only. Verified, citation-backed information from ECI guidelines, RPA 1950 / 1951 & the Constitution will land in the next version.",
    footerAbout: "About",
    footerSources: "Sources · ECI",
  },
  hi: {
    code: "hi",
    nativeName: "हिन्दी",
    englishName: "Hindi",
    geminiName: "Hindi (हिन्दी)",
    inputPlaceholder: "मतदान, पंजीकरण, अधिकारों के बारे में पूछें...",
    sendLabel: "भेजें",
    appTagline: "भारतीय चुनावों के लिए आपका मित्रवत मार्गदर्शक",
    helplineLabel: "मतदाता हेल्पलाइन 1950",
    cvigilLabel: "उल्लंघन की रिपोर्ट करें (cVIGIL)",
    startChatLabel: "बातचीत शुरू करें",
    selectLanguagePrompt: "अपनी भाषा चुनें",
    heroLine1: "मतदान,",
    heroLine2Italic: "समझाया",
    heroLine3: "आपकी भाषा में।",
    heroSubtitle: "आपकी भाषा में, आपके अधिकार",
    heroBody:
      "Mitra से बात करें — पंजीकरण, मतदान दिवस, नाम गायब हो तो क्या करें। ECI दिशानिर्देश, RPA 1950 व 1951, और संविधान पर आधारित।",
    ctaMap: "अपना निर्वाचन क्षेत्र खोजें",
    ctaChat: "बस Mitra से बात करें",
    ballotTitle: "10 आधिकारिक भाषाएँ।\nअपनी चुनें।",
    footerDisclaimer:
      "यहाँ दिखाई सामग्री केवल उदाहरण है। ECI दिशानिर्देश, RPA 1950/1951 व संविधान से प्रमाणित जानकारी अगले संस्करण में आएगी।",
    footerAbout: "हमारे बारे में",
    footerSources: "स्रोत · ECI",
  },
  ta: {
    code: "ta",
    nativeName: "தமிழ்",
    englishName: "Tamil",
    geminiName: "Tamil (தமிழ்)",
    inputPlaceholder: "வாக்களிப்பு, பதிவு, உரிமைகள் குறித்து கேளுங்கள்...",
    sendLabel: "அனுப்பு",
    appTagline: "இந்திய தேர்தல்களுக்கான உங்கள் நட்பு வழிகாட்டி",
    helplineLabel: "வாக்காளர் உதவி எண் 1950",
    cvigilLabel: "மீறலைப் புகாரளி (cVIGIL)",
    startChatLabel: "உரையாடலைத் தொடங்கு",
    selectLanguagePrompt: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    heroLine1: "வாக்களிப்பு,",
    heroLine2Italic: "விளக்கப்படுகிறது",
    heroLine3: "உங்கள் மொழியில்.",
    heroSubtitle: "உங்கள் மொழியில், உங்கள் உரிமைகள்",
    heroBody:
      "Mitra-இடம் பேசுங்கள் — பதிவு, வாக்களிப்பு நாள், பெயர் இல்லை எனில் என்ன செய்வது. ECI வழிகாட்டுதல்கள், RPA 1950 & 1951, அரசியலமைப்பின் ஆதரவுடன்.",
    ctaMap: "தொகுதியைக் கண்டறியுங்கள்",
    ctaChat: "Mitra-வுடன் பேசுங்கள்",
    ballotTitle: "10 அதிகாரப்பூர்வ மொழிகள்.\nஉங்களது தேர்வு.",
    footerDisclaimer:
      "காட்டப்படும் உள்ளடக்கம் விளக்கத்திற்கு மட்டுமே. ECI, RPA 1950/1951 மற்றும் அரசியலமைப்பிலிருந்து சரிபார்க்கப்பட்ட தகவல் அடுத்த பதிப்பில் வரும்.",
    footerAbout: "பற்றி",
    footerSources: "ஆதாரங்கள் · ECI",
  },
  te: {
    code: "te",
    nativeName: "తెలుగు",
    englishName: "Telugu",
    geminiName: "Telugu (తెలుగు)",
    inputPlaceholder: "ఓటింగ్, నమోదు, హక్కుల గురించి అడగండి...",
    sendLabel: "పంపండి",
    appTagline: "భారత ఎన్నికలకు మీ స్నేహపూర్వక మార్గదర్శి",
    helplineLabel: "ఓటర్ హెల్ప్‌లైన్ 1950",
    cvigilLabel: "ఉల్లంఘన నివేదించండి (cVIGIL)",
    startChatLabel: "చాట్ ప్రారంభించండి",
    selectLanguagePrompt: "మీ భాషను ఎంచుకోండి",
    heroLine1: "ఓటింగ్,",
    heroLine2Italic: "వివరించబడింది",
    heroLine3: "మీ భాషలో.",
    heroSubtitle: "మీ భాషలో, మీ హక్కులు",
    heroBody:
      "Mitra తో మాట్లాడండి — నమోదు, పోలింగ్ రోజు, పేరు తప్పిపోతే ఏమి చేయాలి. ECI మార్గదర్శకాలు, RPA 1950 & 1951, రాజ్యాంగం ఆధారంగా.",
    ctaMap: "నియోజకవర్గాన్ని కనుగొనండి",
    ctaChat: "Mitra తో చాట్ చేయండి",
    ballotTitle: "10 అధికారిక భాషలు.\nమీది ఎంచుకోండి.",
    footerDisclaimer:
      "చూపబడిన కంటెంట్ కేవలం ఉదాహరణ. ECI, RPA 1950/1951 మరియు రాజ్యాంగం నుండి ధృవీకరించబడిన సమాచారం తదుపరి వెర్షన్‌లో వస్తుంది.",
    footerAbout: "గురించి",
    footerSources: "మూలాలు · ECI",
  },
  bn: {
    code: "bn",
    nativeName: "বাংলা",
    englishName: "Bengali",
    geminiName: "Bengali (বাংলা)",
    inputPlaceholder: "ভোট, নিবন্ধন, অধিকার সম্পর্কে জিজ্ঞাসা করুন...",
    sendLabel: "পাঠান",
    appTagline: "ভারতীয় নির্বাচনের জন্য আপনার বন্ধুত্বপূর্ণ গাইড",
    helplineLabel: "ভোটার হেল্পলাইন 1950",
    cvigilLabel: "লঙ্ঘন রিপোর্ট করুন (cVIGIL)",
    startChatLabel: "চ্যাট শুরু করুন",
    selectLanguagePrompt: "আপনার ভাষা নির্বাচন করুন",
    heroLine1: "ভোটদান,",
    heroLine2Italic: "ব্যাখ্যা করা হচ্ছে",
    heroLine3: "আপনার ভাষায়।",
    heroSubtitle: "আপনার ভাষায়, আপনার অধিকার",
    heroBody:
      "Mitra-র সাথে কথা বলুন — নিবন্ধন, ভোটের দিন, নাম না থাকলে কী করবেন। ECI নির্দেশিকা, RPA 1950 ও 1951, সংবিধান দ্বারা সমর্থিত।",
    ctaMap: "নির্বাচনী এলাকা খুঁজুন",
    ctaChat: "Mitra-র সাথে চ্যাট করুন",
    ballotTitle: "১০টি সরকারি ভাষা।\nআপনারটা বেছে নিন।",
    footerDisclaimer:
      "দেখানো বিষয়বস্তু কেবল উদাহরণমূলক। ECI, RPA 1950/1951 ও সংবিধান থেকে যাচাইকৃত তথ্য পরবর্তী সংস্করণে আসবে।",
    footerAbout: "সম্পর্কে",
    footerSources: "উৎস · ECI",
  },
  mr: {
    code: "mr",
    nativeName: "मराठी",
    englishName: "Marathi",
    geminiName: "Marathi (मराठी)",
    inputPlaceholder: "मतदान, नोंदणी, अधिकारांबद्दल विचारा...",
    sendLabel: "पाठवा",
    appTagline: "भारतीय निवडणुकांसाठी तुमचा मैत्रीपूर्ण मार्गदर्शक",
    helplineLabel: "मतदार हेल्पलाइन 1950",
    cvigilLabel: "उल्लंघनाची तक्रार करा (cVIGIL)",
    startChatLabel: "चॅट सुरू करा",
    selectLanguagePrompt: "तुमची भाषा निवडा",
    heroLine1: "मतदान,",
    heroLine2Italic: "समजावून सांगितले",
    heroLine3: "तुमच्या भाषेत।",
    heroSubtitle: "तुमच्या भाषेत, तुमचे हक्क",
    heroBody:
      "Mitra शी बोला — नोंदणी, मतदान दिवस, नाव नसल्यास काय करावे. ECI मार्गदर्शक तत्त्वे, RPA 1950 आणि 1951, संविधानावर आधारित।",
    ctaMap: "मतदारसंघ शोधा",
    ctaChat: "Mitra शी बोला",
    ballotTitle: "10 अधिकृत भाषा.\nतुमची निवडा.",
    footerDisclaimer:
      "दाखवलेली सामग्री केवळ उदाहरणात्मक. ECI, RPA 1950/1951 आणि संविधानातील प्रमाणित माहिती पुढील आवृत्तीत येईल।",
    footerAbout: "आमच्याबद्दल",
    footerSources: "स्रोत · ECI",
  },
  kn: {
    code: "kn",
    nativeName: "ಕನ್ನಡ",
    englishName: "Kannada",
    geminiName: "Kannada (ಕನ್ನಡ)",
    inputPlaceholder: "ಮತದಾನ, ನೋಂದಣಿ, ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    sendLabel: "ಕಳುಹಿಸಿ",
    appTagline: "ಭಾರತೀಯ ಚುನಾವಣೆಗಳಿಗೆ ನಿಮ್ಮ ಸ್ನೇಹಪರ ಮಾರ್ಗದರ್ಶಿ",
    helplineLabel: "ಮತದಾರ ಸಹಾಯವಾಣಿ 1950",
    cvigilLabel: "ಉಲ್ಲಂಘನೆ ವರದಿ ಮಾಡಿ (cVIGIL)",
    startChatLabel: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    selectLanguagePrompt: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ",
    heroLine1: "ಮತದಾನ,",
    heroLine2Italic: "ವಿವರಿಸಲಾಗಿದೆ",
    heroLine3: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.",
    heroSubtitle: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ, ನಿಮ್ಮ ಹಕ್ಕುಗಳು",
    heroBody:
      "Mitra ಜೊತೆ ಮಾತನಾಡಿ — ನೋಂದಣಿ, ಮತದಾನ ದಿನ, ಹೆಸರಿಲ್ಲದಿದ್ದರೆ ಏನು ಮಾಡಬೇಕು. ECI ಮಾರ್ಗಸೂಚಿಗಳು, RPA 1950 & 1951, ಸಂವಿಧಾನ ಆಧಾರಿತ.",
    ctaMap: "ಕ್ಷೇತ್ರ ಹುಡುಕಿ",
    ctaChat: "Mitra ಜೊತೆ ಮಾತನಾಡಿ",
    ballotTitle: "10 ಅಧಿಕೃತ ಭಾಷೆಗಳು.\nನಿಮ್ಮದನ್ನು ಆರಿಸಿ.",
    footerDisclaimer:
      "ತೋರಿಸಲಾದ ವಿಷಯ ಕೇವಲ ಉದಾಹರಣಾರ್ಥ. ECI, RPA 1950/1951 ಮತ್ತು ಸಂವಿಧಾನದ ಪರಿಶೀಲಿತ ಮಾಹಿತಿ ಮುಂದಿನ ಆವೃತ್ತಿಯಲ್ಲಿ ಬರುತ್ತದೆ.",
    footerAbout: "ಬಗ್ಗೆ",
    footerSources: "ಮೂಲಗಳು · ECI",
  },
  ml: {
    code: "ml",
    nativeName: "മലയാളം",
    englishName: "Malayalam",
    geminiName: "Malayalam (മലയാളം)",
    inputPlaceholder:
      "വോട്ടെടുപ്പ്, രജിസ്ട്രേഷൻ, അവകാശങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
    sendLabel: "അയയ്ക്കുക",
    appTagline: "ഇന്ത്യൻ തിരഞ്ഞെടുപ്പുകൾക്കായുള്ള നിങ്ങളുടെ സൗഹൃദ വഴികാട്ടി",
    helplineLabel: "വോട്ടർ ഹെൽപ്പ്‌ലൈൻ 1950",
    cvigilLabel: "ലംഘനം റിപ്പോർട്ട് ചെയ്യുക (cVIGIL)",
    startChatLabel: "ചാറ്റ് ആരംഭിക്കുക",
    selectLanguagePrompt: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കൂ",
    heroLine1: "വോട്ടെടുപ്പ്,",
    heroLine2Italic: "വിശദീകരിക്കുന്നു",
    heroLine3: "നിങ്ങളുടെ ഭാഷയിൽ.",
    heroSubtitle: "നിങ്ങളുടെ ഭാഷയിൽ, നിങ്ങളുടെ അവകാശങ്ങൾ",
    heroBody:
      "Mitra-യുമായി സംസാരിക്കൂ — രജിസ്ട്രേഷൻ, വോട്ടെടുപ്പ് ദിവസം, പേര് ഇല്ലെങ്കിൽ എന്ത് ചെയ്യണം. ECI മാർഗ്ഗനിർദ്ദേശങ്ങൾ, RPA 1950 & 1951, ഭരണഘടന ആധാരമാക്കി.",
    ctaMap: "മണ്ഡലം കണ്ടെത്തൂ",
    ctaChat: "Mitra-യുമായി ചാറ്റ് ചെയ്യൂ",
    ballotTitle: "10 ഔദ്യോഗിക ഭാഷകൾ.\nനിങ്ങളുടേത് തിരഞ്ഞെടുക്കൂ.",
    footerDisclaimer:
      "കാണിക്കുന്ന ഉള്ളടക്കം ഉദാഹരണ മാത്രം. ECI, RPA 1950/1951, ഭരണഘടന ആധാരമായ വിവരം അടുത്ത പതിപ്പിൽ ലഭ്യമാകും.",
    footerAbout: "ഞങ്ങളെ കുറിച്ച്",
    footerSources: "ഉറവിടങ്ങൾ · ECI",
  },
  gu: {
    code: "gu",
    nativeName: "ગુજરાતી",
    englishName: "Gujarati",
    geminiName: "Gujarati (ગુજરાતી)",
    inputPlaceholder: "મતદાન, નોંધણી, અધિકારો વિશે પૂછો...",
    sendLabel: "મોકલો",
    appTagline: "ભારતીય ચૂંટણીઓ માટે તમારો મિત્રતાપૂર્ણ માર્ગદર્શક",
    helplineLabel: "મતદાતા હેલ્પલાઈન 1950",
    cvigilLabel: "ઉલ્લંઘનની ફરિયાદ કરો (cVIGIL)",
    startChatLabel: "ચેટ શરૂ કરો",
    selectLanguagePrompt: "તમારી ભાષા પસંદ કરો",
    heroLine1: "મતદાન,",
    heroLine2Italic: "સમજાવ્યું",
    heroLine3: "તમારી ભાષામાં.",
    heroSubtitle: "તમારી ભાષામાં, તમારા અધિકારો",
    heroBody:
      "Mitra સાથે વાત કરો — નોંધણી, મતદાન દિવસ, નામ ગાયબ હોય તો શું કરવું. ECI માર્ગદર્શિકા, RPA 1950 અને 1951, બંધારણ આધારિત.",
    ctaMap: "બેઠક શોધો",
    ctaChat: "Mitra સાથે ચૅટ કરો",
    ballotTitle: "10 સત્તાવાર ભાષાઓ.\nતમારી પસંદ કરો.",
    footerDisclaimer:
      "દેખાડેલ સામગ્રી ફક્ત ઉદાહરણ છે. ECI, RPA 1950/1951 અને બંધારણ આધારિત ચકાસાયેલ માહિતી આગળના સંસ્કરણમાં આવશે.",
    footerAbout: "વિષે",
    footerSources: "સ્રોત · ECI",
  },
  pa: {
    code: "pa",
    nativeName: "ਪੰਜਾਬੀ",
    englishName: "Punjabi",
    geminiName: "Punjabi (ਪੰਜਾਬੀ)",
    inputPlaceholder: "ਵੋਟਿੰਗ, ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਅਧਿਕਾਰਾਂ ਬਾਰੇ ਪੁੱਛੋ...",
    sendLabel: "ਭੇਜੋ",
    appTagline: "ਭਾਰਤੀ ਚੋਣਾਂ ਲਈ ਤੁਹਾਡਾ ਦੋਸਤਾਨਾ ਮਾਰਗਦਰਸ਼ਕ",
    helplineLabel: "ਵੋਟਰ ਹੈਲਪਲਾਈਨ 1950",
    cvigilLabel: "ਉਲੰਘਣਾ ਦੀ ਰਿਪੋਰਟ ਕਰੋ (cVIGIL)",
    startChatLabel: "ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ",
    selectLanguagePrompt: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    heroLine1: "ਵੋਟਿੰਗ,",
    heroLine2Italic: "ਸਮਝਾਇਆ",
    heroLine3: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ।",
    heroSubtitle: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ, ਤੁਹਾਡੇ ਅਧਿਕਾਰ",
    heroBody:
      "Mitra ਨਾਲ ਗੱਲ ਕਰੋ — ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਵੋਟਿੰਗ ਦਿਵਸ, ਨਾਮ ਗਾਇਬ ਹੋਵੇ ਤਾਂ ਕੀ ਕਰਨਾ। ECI ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼, RPA 1950 ਅਤੇ 1951, ਸੰਵਿਧਾਨ ਆਧਾਰਿਤ।",
    ctaMap: "ਹਲਕਾ ਲੱਭੋ",
    ctaChat: "Mitra ਨਾਲ ਗੱਲਬਾਤ ਕਰੋ",
    ballotTitle: "10 ਸਰਕਾਰੀ ਭਾਸ਼ਾਵਾਂ.\nਆਪਣੀ ਚੁਣੋ.",
    footerDisclaimer:
      "ਦਿਖਾਈ ਗਈ ਸਮੱਗਰੀ ਕੇਵਲ ਉਦਾਹਰਣ ਹੈ। ECI, RPA 1950/1951 ਅਤੇ ਸੰਵਿਧਾਨ ਤੋਂ ਤਸਦੀਕਸ਼ੁਦਾ ਜਾਣਕਾਰੀ ਅਗਲੇ ਸੰਸਕਰਣ ਵਿੱਚ ਆਵੇਗੀ।",
    footerAbout: "ਬਾਰੇ",
    footerSources: "ਸਰੋਤ · ECI",
  },
};

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function isValidLanguage(code: string): code is LanguageCode {
  return code in LANGUAGES;
}

export function getLanguage(code: string): LanguageConfig {
  return isValidLanguage(code) ? LANGUAGES[code] : LANGUAGES[DEFAULT_LANGUAGE];
}
