import { type NextRequest } from 'next/server';
import type { NextFetchEvent, NextMiddleware } from 'next/server';

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

export const createMiddlewareAggregator = (
  middlewarePagesMap: MiddlewarePagesMap,
  middlewaresMap: MiddlewaresMap,
) => {
  return (nextMiddleware?: NextMiddleware) => {
    return async (req: NextRequest, event: NextFetchEvent) => {
      const {
        nextUrl: { pathname: currentPathname },
      } = req;

      const currentPageMiddlewareNames: string[] = [];

      for (const [pagePathMatcher, pageMiddlewareNames] of Object.entries(
        middlewarePagesMap,
      )) {
        const pagePathMatcherRegex = new RegExp(pagePathMatcher);

        if (pagePathMatcherRegex.test(currentPathname)) {
          currentPageMiddlewareNames.push(...pageMiddlewareNames);
          break;
        }
      }

      const currentPageMiddlewares = currentPageMiddlewareNames.map(
        (middlewareName) => {
          return middlewaresMap[middlewareName];
        },
      );

      const middlewareAggregatorResult = await applyMiddlewares(
        currentPageMiddlewares,
        req,
      );

      if (middlewareAggregatorResult === true) {
        return nextMiddleware?.(req, event);
      } else {
        return middlewareAggregatorResult === false
          ? null
          : middlewareAggregatorResult;
      }
    };
  };
};
