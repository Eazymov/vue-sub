
declare type Handler = (...args: any[]) => any;

declare type Observers = {
  [key: string]: Handler[];
}

declare type ForEachHandler = (element?: any, index?: number) => any;
declare type FilterHandler = (element?: any, index?: number) => boolean;

declare interface VueSubOptions {
  observers?: Observers;
}
