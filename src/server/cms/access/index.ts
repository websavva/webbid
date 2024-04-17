import type { Access, } from 'payload/config';
import type { PayloadRequest } from 'payload/types';

import { Role } from '@/consts/roles';

export interface ContextWithRequest {
  req: PayloadRequest;
};

export const isAdmin = <T extends ContextWithRequest>({ req }: T) => req.user?.role === Role.Admin;

export const isAuthenticated: Access = ({ req }) => Boolean(req.user);
