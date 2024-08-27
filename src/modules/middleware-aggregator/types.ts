import {type  NextRequest, NextResponse } from 'next/server';

export type Middleware = (
  req: NextRequest,
  res: NextResponse<unknown>,
  next: (shouldContinue?: boolean) => void,
) => unknown;
