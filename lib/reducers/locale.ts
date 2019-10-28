import axios from 'axios';
import { SUCCESS, REQUEST, FAILURE } from './action-type.util';

import { TranslatorContext } from 'react-jhipster';

export const ACTION_TYPES = {
  SET_LOCALE: 'locale/SET_LOCALE',
  LOAD_LOCALE: 'locale/LOAD_LOCALE'
};

const initialState = {
  loadingLanguage: false,
  currentLocale: undefined
};

export type LocaleState = Readonly<typeof initialState>;

export interface ILocaleRootState {
  readonly locale: LocaleState;
}

export const reducer = (state: LocaleState = initialState, action): LocaleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SET_LOCALE):
      return {
        ...state,
        currentLocale: undefined
      };
    case SUCCESS(ACTION_TYPES.SET_LOCALE):
      const currentLocale = action.payload;
      TranslatorContext.setLocale(currentLocale);
      return {
        ...state,
        currentLocale
      };
    case REQUEST(ACTION_TYPES.LOAD_LOCALE):
      return {
        ...state,
        loadingLanguage: true
      };
    case SUCCESS(ACTION_TYPES.LOAD_LOCALE):
      const locale = action.payload.locale;
      const data = action.payload.data;
      TranslatorContext.registerTranslations(locale, data);
      return {
        ...state,
        loadingLanguage: false
      };
    case FAILURE(ACTION_TYPES.LOAD_LOCALE):
      return {
        ...state,
        loadingLanguage: false
      };
    default:
      return state;
  }
};

export const setLocale = locale => async dispatch => {
  if (!Object.keys(TranslatorContext.context.translations).includes(locale)) {
    await dispatch({
      type: ACTION_TYPES.LOAD_LOCALE,
      payload: axios.get(`i18n/${locale}.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`).then(b => ({ data: b.data, locale })),
      locale
    });
  }

  dispatch({
    type: ACTION_TYPES.SET_LOCALE,
    payload: new Promise(resolve => resolve(locale))
  });
};
