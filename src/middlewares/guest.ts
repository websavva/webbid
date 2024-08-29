import { NextResponse } from 'next/server';

import { defineMiddleware } from '@/modules/middleware-aggregator/runtime/utils';

const guestMiddleware = defineMiddleware((req) => {
  if (req.cookies.has('webbid-token')) {
    const profileUrl = new URL('/profile', req.url);

    return NextResponse.redirect(profileUrl);
  }
});

export default guestMiddleware;
