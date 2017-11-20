
declare global {

  interface PropertyDescriptor {
    initializer?: (...args: any[]) => any;
  }
}

export type ActionType = string|symbol;

export type Handler = (...args: any[]) => any;

export type Observers = {
  [key: string]: Handler[];
}

export type Methods = {
  [key: string]: (...args: any[]) => any;
}

export interface VueSubOptions {
  observers?: Observers;
}
