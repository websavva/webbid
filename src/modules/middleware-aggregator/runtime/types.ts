import type { NextRequest, NextResponse } from 'next/server';

export type MiddlewareResult = void | Response | NextResponse;

export type Middleware = (
  req: NextRequest,
  next: (shouldContinue?: boolean) => void,
) => MiddlewareResult | Promise<MiddlewareResult>;

export interface MiddlewarePagesMap {
  [pagePathMathcher: string]: string[];
}

export interface MiddlewaresMap {
  [name: string]: Middleware;
}
