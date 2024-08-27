import { type NextRequest, NextResponse } from 'next/server';

import type { Middleware } from './types';

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
    await middleware(req, NextResponse, next);

    if (_shouldContinue) return false;
  }

  return true;
};
