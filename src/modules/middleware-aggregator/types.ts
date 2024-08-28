import type { NextRequest, NextResponse } from 'next/server';

export type MiddlewareReturnValue = void | Response | NextResponse;

export type Middleware = (
  req: NextRequest,
  next: (
    shouldContinue?: boolean,
  ) => MiddlewareReturnValue | Promise<MiddlewareReturnValue>,
) => unknown;

export interface MiddlewarePagesMap {
  [pagePathMathcher: string]: Array<string[]>;
}

export interface MiddlewaresMap {
  [name: string]: Middleware;
}
