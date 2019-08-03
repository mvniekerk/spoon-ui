import { ITranslatedSelectableValue } from '../../util/translation';
import { IOnChange } from '../../util/on-change';

export type IRadioButtonValue<T> = ITranslatedSelectableValue<T> & IOnChange<T>;
