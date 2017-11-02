import { filter } from '../../lib/utils';

describe('filter', function () {
  
  let array = [1, 2, 3, 4, 5];

  beforeEach(function () {
    array = filter(array, (element, index) => {
      if (element === array.length) {
        return false;
      }

      if (index + 1 === array.length) {
        return false;
      }

      return true;
    });
  });

  it('array should be equal [1, 2, 3, 4]', function () {
    expect(array).toEqual([1, 2, 3, 4]);
  });

  it('array should be equal [1, 2, 3]', function () {
    expect(array).toEqual([1, 2, 3]);
  });

  it('array should be equal [1, 2]', function () {
    expect(array).toEqual([1, 2]);
  });
});
