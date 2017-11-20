import { forEach } from 'src/utils';

describe('forEach', function (): void {
  
  const array: Array<number> = [1, 2, 3];

  beforeEach(function (): void {
    forEach(array, (element: number, index: number): void => {
      array[index] = element + 1;
    });
  });

  it('array should be equal [2, 3, 4]', function (): void {
    expect(array).toEqual([2, 3, 4]);
  });

  it('array should be equal [3, 4, 5]', function (): void {
    expect(array).toEqual([3, 4, 5]);
  });

  it('array should be equal [4, 5, 6]', function (): void {
    expect(array).toEqual([4, 5, 6]);
  });
});
