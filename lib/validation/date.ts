import moment from 'moment';
import { Validate } from './validate';

export const createDateValidator: (format: string) => Validate<string> = format => (i18nKey, val) =>
  !!val && val.length >= format.length && moment(val.substr(0, format.length), format, true).format() !== 'Invalid date'
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];

export const dateIsYyMmDd: Validate<string> = createDateValidator('YYMMDD');
export const dateIsDdMmYyyy: Validate<string> = createDateValidator('DD/MM/YYYY');
