import { dateIsYyMmDd, dateIsDdMmYyyy, createDateValidator } from './date';
import { stringIsNumber, stringIsLuhnNumber } from './number';

import { requiredBoolean, requiredNumber, requiredString, requiredAsString, required } from './required';

import { IValidateAndI18nKey, Validate, validationErrors } from './validate';

export {
  // Date
  createDateValidator,
  dateIsDdMmYyyy,
  dateIsYyMmDd,
  // Number
  stringIsNumber,
  stringIsLuhnNumber,
  // Required
  required,
  requiredAsString,
  requiredBoolean,
  requiredNumber,
  requiredString,
  // Validate
  validationErrors
};
export type Validate<T> = Validate<T>;
export type IValidateAndI18nKey<T> = IValidateAndI18nKey<T>;
