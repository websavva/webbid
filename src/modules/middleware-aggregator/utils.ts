import { type NextRequest } from 'next/server';
import type { NextMiddleware } from 'next/server';

import type { Middleware, MiddlewarePagesMap, MiddlewaresMap } from './types';

export const defineMiddleware = (middleware: Middleware) => middleware;

export const applyMiddlewares = async (
  middlewares: Middleware[],
  req: NextRequest,
) => {
  let _shouldContinue: boolean = true;

  const next = (shouldContinue?: boolean) => {
    _shouldContinue = shouldContinue ?? true;
  };

  for (const middleware of middlewares) {
    const middlewareResult = await middleware(req, next);

    if (middlewareResult) return middlewareResult;

    if (_shouldContinue) return false;
  }

  return true;
};

export const createMiddlewareAggregator = (middlewarePagesMap: MiddlewarePagesMap, middlewaresMap: MiddlewaresMap) => {
  return (nextMiddleware: NextMiddleware) => {
    return (req: NextRequest) => {
      const {
        nextUrl: {
          pathname: currentPathname
        }
      } = req;
    }
  }
}

