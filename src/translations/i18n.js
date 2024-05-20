import i18n from 'i18next';
import i18nBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import english from './english.json';

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: english,
    },
  });

export default i18n;
