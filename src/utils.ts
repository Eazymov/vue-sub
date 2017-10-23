
function isObject (object: any): boolean {
  return typeof object === 'object' && !object.reduce;
}

function isArray (array: any): boolean {
  return !!array.reduce;
}

function forEach (array: any[], handler: AnyFunc): void {
  for (let i = 0; i < array.length; i++)
    handler(array[i], i);
}

function filter<T> (array: T[], filterFunc: AnyFunc): T[] {
  const result: T[] = [];

  for (let i = 0; i < array.length; i++) {
    const item: any = array[i];
    filterFunc(item, i) && result.push(item);
  }

  return result;
}

function every (array: any[], checkFunc: AnyFunc): boolean {
  for (let i = 0; i < array.length; i++) {
    if (!checkFunc(array[i], i)) return false;
  }

  return true;
}

function isValidObservers (observers: Observers): boolean {
  if (!isObject(observers)) return false;

  return every(
    Object.keys(observers),
    (key: string) => {
      const handlers: Handler[] = observers[key];

      if (!isArray(handlers)) return false;

      return every(handlers, (handler: Handler) => {
        return typeof handler === 'function';
      });
    });
}

export {
  isObject,
  isArray,
  forEach,
  filter,
  every,
  isValidObservers,
};
