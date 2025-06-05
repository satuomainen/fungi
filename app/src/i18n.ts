import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {translations} from './translations.ts';

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'fi',
    fallbackLng: 'fi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
