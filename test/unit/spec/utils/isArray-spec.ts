import { isArray } from 'src/utils';

describe('isArray', function (): void {

  const object: Object = {};
  const number: number = 1;
  const string: string = 'string';
  const boolean: boolean = true;
  const array: Array<any> = [];
  const func: Function = () => {};

  it('should return true', function(): void {
    expect(isArray(array)).toBeTruthy();
  });

  it('should return false', function(): void {
    expect(isArray(object)).toBeFalsy();
    expect(isArray(number)).toBeFalsy();
    expect(isArray(string)).toBeFalsy();
    expect(isArray(boolean)).toBeFalsy();
    expect(isArray(func)).toBeFalsy();
  });
});
