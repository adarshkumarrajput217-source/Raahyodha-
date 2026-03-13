import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Role = 'driver' | 'mistri' | 'owner' | 'dhaba' | null;
export type Language = 'hi' | 'en' | 'kn' | 'ta' | 'te' | 'gu' | 'as' | 'bn' | 'or' | 'other';
export type Theme = 'dark' | 'light';
export type Tab = 'home' | 'map' | 'community' | 'health' | 'shorts' | 'yodha' | 'profile';

export interface User {
  uid?: string;
  phone: string;
  role: Role;
  name: string;
  isVerified: boolean;
  joinedDate?: string;
}

// Simple translation dictionary for core UI elements
export const translations: Record<Language, Record<string, string>> = {
  en: {
    'Home': 'Home', 'Map': 'Map', 'Community': 'Community', 'Health': 'Health', 'Shorts': 'Shorts', 'Yodha': 'Yodha', 'Profile': 'Profile',
    'Settings': 'Settings', 'Rate App': 'Rate App', 'Share App': 'Share App', 'Connect With Us': 'Connect With Us',
    'App Theme': 'App Theme', 'Language': 'Language', 'Logout': 'Logout', 'Upgrade to Premium': 'Upgrade to Premium',
    'Help & Support': 'Help & Support', 'Emergency Contacts': 'Emergency Contacts', 'FAQs': 'FAQs', 'Tutorial Videos': 'Tutorial Videos',
    'Contact Support': 'Contact Support', 'Submit Request': 'Submit Request', 'Describe your issue...': 'Describe your issue...',
    'Professional Details': 'Professional Details', 'Joined': 'Joined',
    'Search for dhabas, jobs, routes...': 'Search for dhabas, jobs, routes...'
  },
  hi: {
    'Home': 'होम', 'Map': 'नक्शा', 'Community': 'समुदाय', 'Health': 'स्वास्थ्य', 'Shorts': 'शॉर्ट्स', 'Yodha': 'योद्धा', 'Profile': 'प्रोफ़ाइल',
    'Settings': 'सेटिंग्स', 'Rate App': 'ऐप को रेट करें', 'Share App': 'ऐप शेयर करें', 'Connect With Us': 'हमसे जुड़ें',
    'App Theme': 'ऐप थीम', 'Language': 'भाषा', 'Logout': 'लॉग आउट', 'Upgrade to Premium': 'प्रीमियम अपग्रेड करें',
    'Help & Support': 'मदद और समर्थन', 'Emergency Contacts': 'आपातकालीन संपर्क', 'FAQs': 'सामान्य प्रश्न', 'Tutorial Videos': 'ट्यूटोरियल वीडियो',
    'Contact Support': 'संपर्क समर्थन', 'Submit Request': 'अनुरोध सबमिट करें', 'Describe your issue...': 'अपनी समस्या का वर्णन करें...',
    'Professional Details': 'पेशेवर विवरण', 'Joined': 'शामिल हुए',
    'Search for dhabas, jobs, routes...': 'ढाबा, नौकरी, रूट खोजें...'
  },
  kn: {
    'Home': 'ಮುಖಪುಟ', 'Map': 'ನಕ್ಷೆ', 'Community': 'ಸಮುದಾಯ', 'Health': 'ಆರೋಗ್ಯ', 'Shorts': 'ಶಾರ್ಟ್ಸ್', 'Yodha': 'ಯೋಧ', 'Profile': 'ಪ್ರೊಫೈಲ್',
    'Settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', 'Rate App': 'ರೇಟ್ ಮಾಡಿ', 'Share App': 'ಹಂಚಿಕೊಳ್ಳಿ', 'Connect With Us': 'ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
    'App Theme': 'ಥೀಮ್', 'Language': 'ಭಾಷೆ', 'Logout': 'ಲಾಗ್ ಔಟ್', 'Upgrade to Premium': 'ಪ್ರೀಮಿಯಂಗೆ ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಿ',
    'Help & Support': 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ', 'Emergency Contacts': 'ತುರ್ತು ಸಂಪರ್ಕಗಳು', 'FAQs': 'FAQ ಗಳು', 'Tutorial Videos': 'ವೀಡಿಯೊಗಳು',
    'Contact Support': 'ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ', 'Submit Request': 'ಸಲ್ಲಿಸಿ', 'Describe your issue...': 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ...',
    'Professional Details': 'ವೃತ್ತಿಪರ ವಿವರಗಳು', 'Joined': 'ಸೇರಿದ್ದಾರೆ',
    'Search for dhabas, jobs, routes...': 'ಡಾಬಾ, ಉದ್ಯೋಗ, ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಿ...'
  },
  ta: {
    'Home': 'முகப்பு', 'Map': 'வரைபடம்', 'Community': 'சமூகம்', 'Health': 'சுகாதாரம்', 'Shorts': 'ஷார்ட்ஸ்', 'Yodha': 'யோதா', 'Profile': 'சுயவிவரம்',
    'Settings': 'அமைப்புகள்', 'Rate App': 'மதிப்பிடு', 'Share App': 'பகிர்', 'Connect With Us': 'எங்களுடன் இணையுங்கள்',
    'App Theme': 'தீம்', 'Language': 'மொழி', 'Logout': 'வெளியேறு', 'Upgrade to Premium': 'பிரீமியத்திற்கு மேம்படுத்து',
    'Help & Support': 'உதவி & ஆதரவு', 'Emergency Contacts': 'அவசர தொடர்புகள்', 'FAQs': 'கேள்விகள்', 'Tutorial Videos': 'வீடியோக்கள்',
    'Contact Support': 'ஆதரவை தொடர்பு கொள்ளவும்', 'Submit Request': 'சமர்ப்பி', 'Describe your issue...': 'உங்கள் சிக்கலை விவரிக்கவும்...',
    'Professional Details': 'தொழில்முறை விவரங்கள்', 'Joined': 'இணைந்தார்',
    'Search for dhabas, jobs, routes...': 'தாபா, வேலை, வழிகளைத் தேடுங்கள்...'
  },
  te: {
    'Home': 'హోమ్', 'Map': 'మ్యాప్', 'Community': 'సంఘం', 'Health': 'ఆరోగ్యం', 'Shorts': 'షార్ట్స్', 'Yodha': 'యోధా', 'Profile': 'ప్రొఫైల్',
    'Settings': 'సెట్టింగ్‌లు', 'Rate App': 'రేట్ చేయండి', 'Share App': 'షేర్ చేయండి', 'Connect With Us': 'మాతో కనెక్ట్ అవ్వండి',
    'App Theme': 'థీమ్', 'Language': 'భాష', 'Logout': 'లాగ్ అవుట్', 'Upgrade to Premium': 'ప్రీమియంకు అప్‌గ్రేడ్ చేయండి',
    'Help & Support': 'సహాయం & మద్దతు', 'Emergency Contacts': 'అత్యవసర పరిచయాలు', 'FAQs': 'ప్రశ్నలు', 'Tutorial Videos': 'వీడియోలు',
    'Contact Support': 'మద్దతును సంప్రదించండి', 'Submit Request': 'సమర్పించండి', 'Describe your issue...': 'మీ సమస్యను వివరించండి...',
    'Professional Details': 'వృత్తిపరమైన వివరాలు', 'Joined': 'చేరారు',
    'Search for dhabas, jobs, routes...': 'దాబా, ఉద్యోగం, మార్గాలను శోధించండి...'
  },
  gu: {
    'Home': 'હોમ', 'Map': 'નકશો', 'Community': 'સમુદાય', 'Health': 'સ્વાસ્થ્ય', 'Shorts': 'શોર્ટ્સ', 'Yodha': 'યોદ્ધા', 'Profile': 'પ્રોફાઇલ',
    'Settings': 'સેટિંગ્સ', 'Rate App': 'રેટ કરો', 'Share App': 'શેર કરો', 'Connect With Us': 'અમારી સાથે જોડાઓ',
    'App Theme': 'થીમ', 'Language': 'ભાષા', 'Logout': 'લૉગ આઉટ', 'Upgrade to Premium': 'પ્રીમિયમમાં અપગ્રેડ કરો',
    'Help & Support': 'મદદ અને આધાર', 'Emergency Contacts': 'ઇમરજન્સી સંપર્કો', 'FAQs': 'પ્રશ્નો', 'Tutorial Videos': 'વિડિઓઝ',
    'Contact Support': 'આધારનો સંપર્ક કરો', 'Submit Request': 'સબમિટ કરો', 'Describe your issue...': 'તમારી સમસ્યાનું વર્ણન કરો...',
    'Professional Details': 'વ્યાવસાયિક વિગતો', 'Joined': 'જોડાયા',
    'Search for dhabas, jobs, routes...': 'ઢાબા, નોકરી, રૂટ શોધો...'
  },
  as: {
    'Home': 'হোম', 'Map': 'মানচিত্ৰ', 'Community': 'সম্প্ৰদায়', 'Health': 'স্বাস্থ্য', 'Shorts': 'শ্বৰ্টছ', 'Yodha': 'যোদ্ধা', 'Profile': 'প্ৰফাইল',
    'Settings': 'ছেটিংছ', 'Rate App': 'ৰেট কৰক', 'Share App': 'শ্বেয়াৰ কৰক', 'Connect With Us': 'আমাৰ সৈতে সংযোগ কৰক',
    'App Theme': 'থীম', 'Language': 'ভাষা', 'Logout': 'লগ আউট', 'Upgrade to Premium': 'প্ৰিমিয়ামলৈ আপগ্ৰেড কৰক',
    'Help & Support': 'সহায় আৰু সমৰ্থন', 'Emergency Contacts': 'জৰুৰীকালীন সম্পৰ্ক', 'FAQs': 'প্ৰশ্নসমূহ', 'Tutorial Videos': 'ভিডিঅ\'সমূহ',
    'Contact Support': 'সমৰ্থনৰ সৈতে যোগাযোগ কৰক', 'Submit Request': 'দাখিল কৰক', 'Describe your issue...': 'আপোনাৰ সমস্যাটো বৰ্ণনা কৰক...',
    'Professional Details': 'পেছাদাৰী বিৱৰণ', 'Joined': 'যোগদান কৰিলে',
    'Search for dhabas, jobs, routes...': 'ধাবা, চাকৰি, পথ বিচাৰক...'
  },
  bn: {
    'Home': 'হোম', 'Map': 'মানচিত্র', 'Community': 'সম্প্রদায়', 'Health': 'স্বাস্থ্য', 'Shorts': 'শর্টস', 'Yodha': 'যোদ্ধা', 'Profile': 'প্রোফাইল',
    'Settings': 'সেটিংস', 'Rate App': 'রেট করুন', 'Share App': 'শেয়ার করুন', 'Connect With Us': 'আমাদের সাথে যুক্ত হন',
    'App Theme': 'থিম', 'Language': 'ভাষা', 'Logout': 'লগ আউট', 'Upgrade to Premium': 'প্রিমিয়ামে আপগ্রেড করুন',
    'Help & Support': 'সাহায্য ও সমর্থন', 'Emergency Contacts': 'জরুরী যোগাযোগ', 'FAQs': 'প্রশ্নাবলী', 'Tutorial Videos': 'ভিডিও',
    'Contact Support': 'সমর্থন যোগাযোগ করুন', 'Submit Request': 'জমা দিন', 'Describe your issue...': 'আপনার সমস্যা বর্ণনা করুন...',
    'Professional Details': 'পেশাদারী বিবরণ', 'Joined': 'যোগ দিয়েছেন',
    'Search for dhabas, jobs, routes...': 'ধাবা, চাকরি, রুট খুঁজুন...'
  },
  or: {
    'Home': 'ହୋମ୍', 'Map': 'ମ୍ୟାପ୍', 'Community': 'ସମ୍ପ୍ରଦାୟ', 'Health': 'ସ୍ୱାସ୍ଥ୍ୟ', 'Shorts': 'ସର୍ଟସ୍', 'Yodha': 'ଯୋଦ୍ଧା', 'Profile': 'ପ୍ରୋଫାଇଲ୍',
    'Settings': 'ସେଟିଂସ', 'Rate App': 'ରେଟ୍ କରନ୍ତୁ', 'Share App': 'ସେୟାର କରନ୍ତୁ', 'Connect With Us': 'ଆମ ସହ ଯୋଡି ହୁଅନ୍ତୁ',
    'App Theme': 'ଥିମ୍', 'Language': 'ଭାଷା', 'Logout': 'ଲଗ୍ ଆଉଟ୍', 'Upgrade to Premium': 'ପ୍ରିମିୟମ୍ କୁ ଅପଗ୍ରେଡ୍ କରନ୍ତୁ',
    'Help & Support': 'ସାହାଯ୍ୟ ଏବଂ ସମର୍ଥନ', 'Emergency Contacts': 'ଜରୁରୀକାଳୀନ ସମ୍ପର୍କ', 'FAQs': 'ପ୍ରଶ୍ନଗୁଡିକ', 'Tutorial Videos': 'ଭିଡିଓଗୁଡିକ',
    'Contact Support': 'ସମର୍ଥନ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ', 'Submit Request': 'ଦାଖଲ କରନ୍ତୁ', 'Describe your issue...': 'ଆପଣଙ୍କର ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ...',
    'Professional Details': 'ବୃତ୍ତିଗତ ବିବରଣୀ', 'Joined': 'ଯୋଗ ଦେଇଛନ୍ତି',
    'Search for dhabas, jobs, routes...': 'ଢାବା, ଚାକିରି, ରୁଟ୍ ଖୋଜନ୍ତୁ...'
  },
  other: {
    'Home': 'Home', 'Map': 'Map', 'Community': 'Community', 'Health': 'Health', 'Shorts': 'Shorts', 'Yodha': 'Yodha', 'Profile': 'Profile',
    'Settings': 'Settings', 'Rate App': 'Rate App', 'Share App': 'Share App', 'Connect With Us': 'Connect With Us',
    'App Theme': 'App Theme', 'Language': 'Language', 'Logout': 'Logout', 'Upgrade to Premium': 'Upgrade to Premium',
    'Help & Support': 'Help & Support', 'Emergency Contacts': 'Emergency Contacts', 'FAQs': 'FAQs', 'Tutorial Videos': 'Tutorial Videos',
    'Contact Support': 'Contact Support', 'Submit Request': 'Submit Request', 'Describe your issue...': 'Describe your issue...',
    'Professional Details': 'Professional Details', 'Joined': 'Joined',
    'Search for dhabas, jobs, routes...': 'Search for dhabas, jobs, routes...'
  }
};

interface AppState {
  user: User | null;
  language: Language;
  theme: Theme;
  activeTab: Tab;
  setUser: (user: User | null) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setActiveTab: (tab: Tab) => void;
  logout: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  // Apply theme to HTML element for global CSS filter
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const logout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        theme,
        activeTab,
        setUser,
        setLanguage,
        setTheme,
        setActiveTab,
        logout,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

