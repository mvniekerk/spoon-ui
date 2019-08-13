import { IValidateAndI18nKey } from '../validation/validate';
import { TranslatedValueOrKey } from './translation';

export interface IDirtyInput<T> {
  dirty?: boolean;
  onMadeDirty?: () => void;
  valid?: boolean;
  onValidChange?: (isValid: boolean) => void;
  onChange: (t: T) => void;
  validation?: Array<IValidateAndI18nKey<T>>;
  validMessage?: TranslatedValueOrKey<T>;
  helpMessage?: TranslatedValueOrKey<T>;
}
