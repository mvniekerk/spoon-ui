import { IValidateAndI18nKey } from '../validation/validate';

export interface IDirtyInput<T> {
  dirty?: boolean;
  onMadeDirty?: () => void;
  onValidChange?: (isValid: boolean) => void;
  onChange: (t: T) => void;
  validation?: Array<IValidateAndI18nKey<T>>;
}
