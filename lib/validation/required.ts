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

export function requiredAsString<T>(i18nKey: string, val: T) {
  // @ts-ignore
  return requiredString(i18nKey, val as string);
}

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

export const required: Validate<any> = (i18nKey, val) =>
  val !== undefined && val !== null && !!val
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];
