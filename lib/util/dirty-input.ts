import { IValidateAndI18nKey } from '../validation/validate';
import { ITranslatedValue } from './translation';

export interface IDirtyInput<T> {
  dirty?: boolean;
  onMadeDirty?: () => void;
  onValidChange?: (isValid: boolean) => void;
  onChange: (t: T) => void;
  validation?: Array<IValidateAndI18nKey<T>>;
  validMessage?: ITranslatedValue<any>;
}
