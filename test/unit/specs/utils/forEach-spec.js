import { forEach } from 'lib/utils';

describe('forEach', function () {
  
  const array = [1, 2, 3];

  beforeEach(function () {
    forEach(array, (element, index) => {
      array[index] = element + 1;
    });
  });

  it('array should be equal [2, 3, 4]', function () {
    expect(array).toEqual([2, 3, 4]);
  });

  it('array should be equal [3, 4, 5]', function () {
    expect(array).toEqual([3, 4, 5]);
  });

  it('array should be equal [4, 5, 6]', function () {
    expect(array).toEqual([4, 5, 6]);
  });
});
