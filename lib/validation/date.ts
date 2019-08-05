import moment from 'moment';
import { Validate } from './validate';

export const dateIsYyMmDd: Validate<string> = (i18nKey, val) =>
  !!val && val.length >= 6 && moment(val.substr(0, 6), 'YYMMDD', true).format() !== 'Invalid date'
    ? []
    : [
        {
          value: val,
          name: i18nKey,
          display: i18nKey
        }
      ];
