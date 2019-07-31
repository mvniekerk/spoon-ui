/**
 * A closure that validates a value
 * If it validates correctly then it returns an empty array
 * If it is invalid then it returns an array of translateable errors
 */
import { ITextTranslationAndValue } from '../components';

export type Validate<T> = (i18nKey: string, val: T) => Array<ITextTranslationAndValue<T>>;

export interface IValidateAndI18nKey<T> {
  func: Validate<T>;
  i18n: string;
}

export function validationErrors<T>(val: T, validators: Array<IValidateAndI18nKey<T>>): Array<ITextTranslationAndValue<T>> {
  return validators.reduce((prev, cur) => (prev.length > 0 ? prev : cur.func(cur.i18n, val)), []);
}
