import { requiredBoolean, requiredNumber, requiredString, requiredAsString, required } from '../../../../lib/validation/required';

describe('Required string validation', () => {
    it('An empty string should return validation errors', () => {
        const val = '';
        const errors = requiredString('', val);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('A null string should return validation errors', () => {
       const val = null;
       const errors = requiredString('', val);
       expect(errors.length).toBeGreaterThan(0);
    });
    it('A non-empty string should not return validation errors', () => {
        const val = 'Not empty';
        const errors = requiredString('', val);
        expect(errors.length).toBe(0);
    });
});

type SomeStringType = undefined | 'some' | 'string' | 'type';

describe('Required as string validation', () => {
  it('An empty string should return validation errors', () => {
    const val: SomeStringType = undefined;
    const errors = requiredAsString('', val);
    expect(errors.length).toBeGreaterThan(0);
  });
  it('A non-empty string should not return validation errors', () => {
    const val: SomeStringType = 'some';
    const errors = requiredAsString('', val);
    expect(errors.length).toBe(0);
  });
});

describe('Required boolean validation', () => {
    it('An undefined boolean should return validation errors', () => {
        const val = undefined;
        const errors = requiredBoolean('', val);
        expect(errors.length).toBeGreaterThan(0);
    });
    it('A null boolean should return validation errors', () => {
       const val = null;
       const errors = requiredBoolean('', val);
       expect(errors.length).toBeGreaterThan(0);
    });
    it('A true boolean should not return validation errors', () => {
       const val = true;
       const errors = requiredBoolean('', val);
       expect(errors.length).toBe(0);
    });
    it('A false boolean should not return validation errors', () => {
       const val = true;
       const errors = requiredBoolean('', val);
       expect(errors.length).toBe(0);
    });
});

describe('Required number value validation', () => {
    it('An undefined number should return validation errors', () => {
       const val = undefined;
       const errors = requiredNumber('', val);
       expect(errors.length).toBeGreaterThan(0);
    });
    it('A null number should return validation errors', () => {
       const val = null;
       const errors = requiredNumber('', val);
       expect(errors.length).toBeGreaterThan(0);
    });
    it('The number 0 should not return validation erorrs', () => {
       const val = 0;
       const errors = requiredNumber('', val);
       expect(errors.length).toBe(0);
    });
    it('A negative number should not return validation errors', () => {
       const val = -1;
       const errors = requiredNumber('', val);
       expect(errors.length).toBe(0);
    });
    it('A positive number should not return validation errors', () => {
       const val = 42;
       const errors = requiredNumber('', val);
       expect(errors.length).toBe(0);
    });
});

interface ISomeObject {
  thisField: boolean;
}

describe('Required value object validation', () => {
  it('An undefined object should return validation errors', () => {
    const val: ISomeObject = undefined;
    const errors = required('', val);
    expect(errors.length).toBeGreaterThan(0);
  });
  it('A null object should return validation errors', () => {
    const val: ISomeObject = null;
    const errors = required('', val);
    expect(errors.length).toBeGreaterThan(0);
  });
  it('A non empty object should not return validation errors', () => {
    const val: ISomeObject = { thisField: true };
    const errors = required('', val);
    expect(errors.length).toBe(0);
  });
});
