
declare global {

  interface PropertyDescriptor {
    initializer?: Function;
  }
}

export type ActionType = string|symbol;

export type Handler = Function;

export type Observers = {
  [key: string]: Handler[];
}

export type Methods = {
  [key: string]: Function;
}

export interface VueSubOptions {
  observers?: Observers;
}
