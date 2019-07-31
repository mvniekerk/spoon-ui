import { IValidateAndI18nKey } from '../validation/validate';
import { ITextTranslationAndValue } from '../util/translation';

export interface IDirtyInput<T> {
  dirty?: boolean;
  onMadeDirty?: () => void;
  onValidChange?: (isValid: boolean) => void;
  onChange: (t: T) => void;
  validation?: Array<IValidateAndI18nKey<T>>;
  validMessage?: ITextTranslationAndValue<any>;
}
