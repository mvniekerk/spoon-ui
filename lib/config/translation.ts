import { TranslatorContext, Storage } from 'react-jhipster';

import { Locale } from '../reducers/index';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  de: { name: 'Deutsch' }
};

export const locales = Object.keys(languages).sort();

export const registerLocale = store => {
  store.dispatch(Locale.locale.setLocale(Storage.session.get('locale', 'en')));
};
