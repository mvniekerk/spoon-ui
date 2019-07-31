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
