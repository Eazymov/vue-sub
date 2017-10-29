
export const isObject = (object) => {
  return typeof object === 'object' && !object.reduce;
}

export const isArray = (array) => {
  return !!array.reduce;
}

export const forEach = (array, handler) => {
  for (let i = 0; i < array.length; i++)
    handler(array[i], i);
}

export const filter = (array, filterFunc) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    filterFunc(item, i) && result.push(item);
  }

  return result;
}

export const every = (array, checkFunc) => {
  for (let i = 0; i < array.length; i++) {
    if (!checkFunc(array[i], i)) return false;
  }

  return true;
}

export const isValidObservers = (observers) => {
  if (!isObject(observers)) return false;

  return every(
    Object.keys(observers),
    (key) => {
      const handlers = observers[key];

      if (!isArray(handlers)) return false;

      return every(handlers, (handler) => {
        return typeof handler === 'function';
      });
    });
}
