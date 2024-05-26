import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
// import bn from '../locales/bn.json';
import ml from '../locales/ml.json';
import mr from '../locales/mr.json';
import pa from '../locales/pa.json';
import ta from '../locales/ta.json';
import te from '../locales/te.json';
import ur from '../locales/ur.json';
import gu from '../locales/gu.json';

export const languageResources = {
  en: { translation: en, language:"English" },
  hi: { translation: hi, language:"हिन्दी" },
  // bn: {translation: bn, language:""},
  mr: { translation: mr, language:"मराठी" },
  pa: { translation: pa, language:"ਪੰਜਾਬੀ" },
  ml: { translation: ml, language:"മലയാളം" },
  ta: { translation: ta, language:"தமிழ்" },
  te: { translation: te, language:"తెలుగు" },
  ur: { translation: ur, language:"اردو" },
  gu: { translation: gu, language:"ગુજરાતી" },
};

// import { store } from '../redux/store';
// //console.log(store.getState())
// //console.log(store)



i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;