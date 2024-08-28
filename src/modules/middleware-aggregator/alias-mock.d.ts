import type { NextMiddleware } from 'next/server';

import type { Middleware } from './types';

interface MiddlewarePagesMap {
  [pagePath: string]: Array<string[]>;
}

interface MiddlewaresMap {
  [name: string]: Middleware;
}

export const applyMiddlewareAggregator: (
  nextMidlleware: NextMiddleware,
) => NextMiddleware;
