import { isObject } from 'src/utils';

describe('isObject', function (): void {

  const object: Object = {};
  const number: number = 1;
  const string: string = 'string';
  const boolean: boolean = true;
  const array: Array<any> = [];
  const func: Function = () => {};

  it('should return true', function(): void {
    expect(isObject(object)).toBeTruthy();
  });

  it('should return false', function(): void {
    expect(isObject(number)).toBeFalsy();
    expect(isObject(string)).toBeFalsy();
    expect(isObject(boolean)).toBeFalsy();
    expect(isObject(array)).toBeFalsy();
    expect(isObject(func)).toBeFalsy();
  });
});
