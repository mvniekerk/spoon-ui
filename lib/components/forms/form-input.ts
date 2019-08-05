import { TranslatedValueOrKey } from '../../util/translation';
import { IDirtyInput } from '../../util/dirty-input';

export interface IFormInput<T> extends IDirtyInput<T> {
  label?: TranslatedValueOrKey<T>;
  placeholder?: TranslatedValueOrKey<T>;
  id: string;
  value: T;
}

export interface ISelectableFormInput<T> extends IFormInput<T> {
  choices: () => Map<T, string>;
}
