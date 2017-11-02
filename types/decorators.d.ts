import { ActionType } from './options';

export type Action = (action: ActionType) => PropertyDecorator;
export type Subscribe = (action: ActionType) => MethodDecorator;
export type Once = (action: ActionType) => MethodDecorator;
