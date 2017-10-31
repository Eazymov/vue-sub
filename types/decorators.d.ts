export type Action = (action: string) => Decorator;
export type Subscribe = (action: string) => Decorator;
export type Once = (action: string) => Decorator;
