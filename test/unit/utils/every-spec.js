import { every } from '../../lib/utils';

describe('every', function () {
  
  const array = [1, 2, 3, 4, 5, 'string', {}];
  let result = null;
  
  const arrayHasNo = (type) => {
    return every(array, (element, index) => {
      return typeof element !== type;
    });
  };

  it('should return true', function () {
    expect(arrayHasNo('undefined')).toBeTruthy();
    expect(arrayHasNo('function')).toBeTruthy();
    expect(arrayHasNo('boolean')).toBeTruthy();
  });

  it('should return false', function () {
    expect(arrayHasNo('number')).toBeFalsy();
    expect(arrayHasNo('string')).toBeFalsy();
    expect(arrayHasNo('object')).toBeFalsy();
  });
});
