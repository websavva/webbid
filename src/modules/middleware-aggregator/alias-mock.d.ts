import type { Middleware } from './types';

interface MiddlewarePagesMap {
  [pagePath: string]: Array<string[]>;
}

interface MiddlewaresMap {
  [name: string]: Middleware;
}

export const middlewarePagesMap: MiddlewarePagesMap;

export const middlewares: MiddlewaresMap;
