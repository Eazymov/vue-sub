import { isObject } from 'lib/utils';

describe('isObject', function () {

  const object = {};
  const number = 1;
  const string = 'string';
  const boolean = true;
  const array = [];
  const func = () => {};

  it('should return true', function() {
    expect(isObject(object)).toBeTruthy();
  });

  it('should return false', function() {
    expect(isObject(number)).toBeFalsy();
    expect(isObject(string)).toBeFalsy();
    expect(isObject(boolean)).toBeFalsy();
    expect(isObject(array)).toBeFalsy();
    expect(isObject(func)).toBeFalsy();
  });
});
