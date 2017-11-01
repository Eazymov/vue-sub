export type Action = (action: string) => PropertyDecorator;
export type Subscribe = (action: string) => PropertyDecorator;
export type Once = (action: string) => PropertyDecorator;
