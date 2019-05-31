import * as messages from './constants';
import storeInitialize from './store';
import { languages as _languages, locales as _locales, registerLocale as _registerLocale } from './translation';

/* tslint:disable:no-namespace no-empty-interface max-classes-per-file no-shadowed-variable */
export { messages };

export namespace Translation {
  export const translation = {
    languages: _languages,
    locales: _locales,
    registerLocale: _registerLocale
  };
}

export const translation = Translation.translation;

export { storeInitialize };

/* enable:disable:no-namespace no-empty-interface max-classes-per-file no-shadowed-variable */
