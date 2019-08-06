import { dateIsYyMmDd, dateIsDdMmYyyy } from '../../../../lib/validation/date';

describe('YYMMDD formatting checks', () => {
    it('Correct dates should not return errors', () => {
        ['221015AAAAA', '860606BBBB', '870813DDDD', '000102EEE'].forEach(val => {
            const errors = dateIsYyMmDd('', val);
            expect(errors.length).toBe(0);
        });
    });
    it('Too short numbers should return errors', () => {
       ['22101', '8', '87'].forEach(val => {
           const errors = dateIsYyMmDd('', val);
           expect(errors.length).toBeGreaterThan(0);
       });
    });
    it('Dates with non-numbers in should return errors', () => {
       ['22.015', 'A60606', '8!@229', ' 23%332'].forEach(val => {
           const errors = dateIsYyMmDd('', val);
           expect(errors.length).toBeGreaterThan(0);
       });
    });
    it('Null and undefined should return errors', () => {
        [null, undefined].forEach(val => {
            const errors = dateIsYyMmDd('', val);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
    it('Dates with wrong months should return errors', () => {
        ['221315', '860006', '87-113', '005002'].forEach(val => {
            const errors = dateIsYyMmDd('', val);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
    it('Dates with wrong days should return errors', () => {
        ['221000', '8606-1', '870832', '000230'].forEach(val => {
            const errors = dateIsYyMmDd('Code coverage fudge', val);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
});

describe('DD/MM/YYYY formatting checks', () => {
    it('Correct dates should not return errors', () => {
        ['15/10/2022AAAAA', '06/06/1986', '13/07/1987DDDD', '02/01/2000000102EEE'].forEach(val => {
            const errors = dateIsDdMmYyyy('', val);
            expect(errors.length).toBe(0);
        });
    });
    it('Too short numbers should return errors', () => {
       ['22101', '8', '87'].forEach(val => {
           const errors = dateIsDdMmYyyy('', val);
           expect(errors.length).toBeGreaterThan(0);
       });
    });
    it('Dates with non-numbers in should return errors', () => {
       ['22.015', 'A60606', '8!@229', ' 23%332'].forEach(val => {
           const errors = dateIsDdMmYyyy('', val);
           expect(errors.length).toBeGreaterThan(0);
       });
    });
    it('Null and undefined should return errors', () => {
        [null, undefined].forEach(val => {
            const errors = dateIsDdMmYyyy('', val);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
    it('Dates with wrong months should return errors', () => {
        ['15/13/2022', '06/00/86', '13/-1/87', '005002'].forEach(val => {
            const errors = dateIsDdMmYyyy('', val);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
    it('Dates with wrong days should return errors', () => {
        ['00/10/2022', '-1/06/1986', '32/08/1987', '30/20/2000'].forEach(val => {
            const errors = dateIsDdMmYyyy('Code coverage fudge', val);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
});
