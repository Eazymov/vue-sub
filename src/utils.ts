import { Observers, Handler, } from 'types';

type ForEachHandler = (element?: any, index?: number) => any;
type FilterHandler = (element?: any, index?: number) => boolean;

const isObject = (object: any): boolean => {
  return typeof object === 'object' && !object.reduce;
}

const isArray = (array: Array<any>): boolean => {
  return !!array.reduce;
}

const isValidObservers = (observers: Observers): boolean => {
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

const forEach = (array: Array<any>, handler: ForEachHandler) => {
  for (let i: number = 0; i < array.length; i++)
    handler(array[i], i);
}

const filter = <T>(array: Array<T>, checker: FilterHandler): Array<T> => {
  const result: Array<any> = [];

  for (let i: number = 0; i < array.length; i++) {
    const item: any = array[i];

    checker(item, i) && result.push(item);
  }

  return result;
}

const every = (array: Array<any>, checker: FilterHandler): boolean => {
  for (let i: number = 0; i < array.length; i++) {
    if (!checker(array[i], i)) return false;
  }

  return true;
}

export {
  isObject,
  isArray,
  isValidObservers,
  forEach,
  filter,
  every,
};
