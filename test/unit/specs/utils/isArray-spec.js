import { isArray } from 'lib/utils';

describe('isArray', function () {

  const object = {};
  const number = 1;
  const string = 'string';
  const boolean = true;
  const array = [];
  const func = () => {};

  it('should return true', function() {
    expect(isArray(array)).toBeTruthy();
  });

  it('should return false', function() {
    expect(isArray(object)).toBeFalsy();
    expect(isArray(number)).toBeFalsy();
    expect(isArray(string)).toBeFalsy();
    expect(isArray(boolean)).toBeFalsy();
    expect(isArray(func)).toBeFalsy();
  });
});
