
declare type Handler = (...args: any[]) => any;

declare type Observers = {
  [key: string]: Handler[];
}

declare type Subscriber = {
  once: boolean;
  action: string;
}

declare interface Subscribers {
  [key: string]: Subscriber;
}

declare type Methods = {
  [key: string]: (...args: any[]) => any;
}

declare type ForEachHandler = (element?: any, index?: number) => any;
declare type FilterHandler = (element?: any, index?: number) => boolean;

declare interface Descriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?: () => any;
  set?: (value: any) => any;
  initializer?: (...args: any[]) => any;
}

declare type Decorator = (
  target: any,
  property: string|symbol,
  descriptor: Descriptor,
) => void;

interface VueSubOptions {
  observers?: Observers;
}
