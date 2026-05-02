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
  },
  ml: {
    code: "ml",
    nativeName: "മലയാളം",
    englishName: "Malayalam",
    geminiName: "Malayalam (മലയാളം)",
    inputPlaceholder: "വോട്ടെടുപ്പ്, രജിസ്ട്രേഷൻ, അവകാശങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
    sendLabel: "അയയ്ക്കുക",
    appTagline: "ഇന്ത്യൻ തിരഞ്ഞെടുപ്പുകൾക്കായുള്ള നിങ്ങളുടെ സൗഹൃദ വഴികാട്ടി",
    helplineLabel: "വോട്ടർ ഹെൽപ്പ്‌ലൈൻ 1950",
    cvigilLabel: "ലംഘനം റിപ്പോർട്ട് ചെയ്യുക (cVIGIL)",
    startChatLabel: "ചാറ്റ് ആരംഭിക്കുക",
    selectLanguagePrompt: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
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
  },
};

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function isValidLanguage(code: string): code is LanguageCode {
  return code in LANGUAGES;
}

export function getLanguage(code: string): LanguageConfig {
  return isValidLanguage(code) ? LANGUAGES[code] : LANGUAGES[DEFAULT_LANGUAGE];
}
