import { Validate } from './validate';

export const stringIsNumber: Validate<string> = (i18nKey, val) =>
  !val || isNaN(Number(val))
    ? [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ]
    : [];

export const stringIsLuhnNumber: Validate<string> = (i18nKey, val) => {
  const digits = val
    .split('')
    .slice(0, val.length - 1)
    .map(s => Number(s));
  const c1 =
    digits
      .filter((v, i) => i % 2 === 1)
      .map(s => s * 2)
      .map(s => (s % 10) + (Math.floor(s / 10) % 10))
      .reduce((p, c) => p + c) + digits.filter((v, i) => i % 2 === 0).reduce((p, c) => p + c);
  const luhn = (10 - (c1 % 10)) % 10;
  const check = Number(val.slice(digits.length));
  return luhn === check
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];
};
