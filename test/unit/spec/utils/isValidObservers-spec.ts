import { isValidObservers } from 'lib/utils';
import { Observers } from 'types';

describe('isValidObservers', function (): void {

  const case1: Observers = {
    'log': [
      console.log,
    ],
    'error': [
      console.error,
    ],
  };
  const case2: Array<number> = [1, 2, 3];
  const case3: Object = {};
  const case4: string = 'string';
  const case5: boolean = true;
  const case6: number = 123;
  const case7: any = {
    'log': 123,
    'error': [
      console.error,
    ],
  };

  it('should return true', function (): void {
    expect(isValidObservers(case1)).toBeTruthy();
    expect(isValidObservers(case3)).toBeTruthy();
  });

  it('should return false', function (): void {
    expect(isValidObservers(case2)).toBeFalsy();
    expect(isValidObservers(case4)).toBeFalsy();
    expect(isValidObservers(case5)).toBeFalsy();
    expect(isValidObservers(case6)).toBeFalsy();
    expect(isValidObservers(case7)).toBeFalsy();
  });
});
