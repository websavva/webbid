import { headers } from 'next/headers';

export const requestHeaders = () => Object.fromEntries(headers().entries());
