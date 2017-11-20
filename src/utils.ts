import { Observers, Handler } from 'types';

type ForEachHandler = (element: any, index: number) => any;
type FilterHandler = (element: any, index: number) => boolean;

const isObject = (arg: any): arg is Object => {
  return typeof arg === 'object' && !arg.reduce;
}

const isArray = (arg: any): arg is Array<any> => {
  return !!arg.reduce;
}

const isValidObservers = (arg: any): arg is Observers => {
  if (!isObject(arg)) return false;

  return every(
    Object.keys(arg),
    (key: string) => {
      const handlers: Handler[] = arg[key];

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
  every,
}
