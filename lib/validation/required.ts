import { Validate } from './validate';

export const requiredString: Validate<string> = (i18nKey, val) =>
  !!val
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];

export const requiredBoolean: Validate<boolean> = (i18nKey, val) =>
  val !== undefined && val !== null
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];

export const requiredNumber: Validate<number> = (i18nKey, val) =>
  val !== undefined && val !== null
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];
