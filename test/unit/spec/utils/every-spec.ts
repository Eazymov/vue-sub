import { every } from 'src/utils';

describe('every', function (): void {
  
  const array: Array<any> = [1, 2, 3, 4, 5, 'string', {}];
  
  const arrayHasNo = (type: string) => {
    return every(array, (element: any): boolean => {
      return typeof element !== type;
    });
  };

  it('should return true', function (): void {
    expect(arrayHasNo('undefined')).toBeTruthy();
    expect(arrayHasNo('function')).toBeTruthy();
    expect(arrayHasNo('boolean')).toBeTruthy();
  });

  it('should return false', function (): void {
    expect(arrayHasNo('number')).toBeFalsy();
    expect(arrayHasNo('string')).toBeFalsy();
    expect(arrayHasNo('object')).toBeFalsy();
  });
});
