import { isValidObservers } from 'lib/utils';

describe('isValidObservers', function () {

  const case1 = {
    'log': [
      console.log,
    ],
    'error': [
      console.error,
    ],
  };
  const case2 = [1, 2, 3];
  const case3 = {};
  const case4 = 'string';
  const case5 = true;
  const case6 = 123;
  const case7 = {
    'log': 123,
    'error': [
      console.error,
    ],
  };

  it('should return true', function () {
    expect(isValidObservers(case1)).toBeTruthy();
    expect(isValidObservers(case3)).toBeTruthy();
  });

  it('should return false', function () {
    expect(isValidObservers(case2)).toBeFalsy();
    expect(isValidObservers(case4)).toBeFalsy();
    expect(isValidObservers(case5)).toBeFalsy();
    expect(isValidObservers(case6)).toBeFalsy();
    expect(isValidObservers(case7)).toBeFalsy();
  });
});
