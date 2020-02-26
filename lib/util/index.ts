import { convertDateTimeFromServer } from './date-utils';
import { cleanEntity, mapIdList } from './entity-utils';
import { IDirtyInput } from './dirty-input';
import { ITranslatedValue, translateItem, TranslatedValueOrKey, translatedValue, ITranslatedSelectableValue } from './translation';
import { IOnChange } from './on-change';

export {
  convertDateTimeFromServer,
  cleanEntity,
  mapIdList,
  IDirtyInput,
  // On change
  IOnChange,
  // Translation
  translateItem,
  translatedValue
};

export type ITranslatedValue<T> = ITranslatedValue<T>;
export type TranslatedValueOrKey<T> = TranslatedValueOrKey<T>;
export type ITranslatedSelectableValue<T> = ITranslatedSelectableValue<T>;
