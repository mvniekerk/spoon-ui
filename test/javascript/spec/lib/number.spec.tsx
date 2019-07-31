import { stringIsLuhnNumber, stringIsNumber } from '../../../../lib/validation/number';

describe('Check if a string is a number', () => {
    it('A correct number should result in an empty array of errors', () => {
        const numberString = '01234';
        const errors = stringIsNumber('', numberString);
        expect(errors.length).toBe(0);
    });
    it('A number with text will return errors', () => {
        const numberString = 'notanumber';
        const errors = stringIsNumber('', numberString);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('Empty text is not a number', () => {
       const numberString = '';
       const errors = stringIsNumber('', numberString);
       expect(errors.length).toBeGreaterThan(0);
    });
    it('Null is not a number', () => {
       const numberString = null;
       const errors = stringIsNumber('', numberString);
       expect(errors.length).toBeGreaterThan(0);
    });
});

describe('Check if a number is a Luhn number', () => {
    it('A correct number should result in an empty array of errors', () => {
       const luhn = '49927398716';
       const errors = stringIsLuhnNumber('', luhn);
       expect(errors.length).toBe(0);
    });
    it('An incorrect number should result in errors', () => {
        const luhn = '49927398710';
        const errors = stringIsLuhnNumber('', luhn);
        expect(errors.length).toBeGreaterThan(0);
    });
});
