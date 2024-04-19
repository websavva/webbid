import type { Access } from 'payload/config';
import type { PayloadRequest, FieldAccess, Where } from 'payload/types';

import { Role } from '@/consts/roles';

export interface ContextWithRequest {
  req: PayloadRequest;
}

export const isAdmin = <T extends ContextWithRequest>({ req }: T) =>
  req.user?.role === Role.Admin;

export const isAuthenticated = <T extends ContextWithRequest>({ req }: T) =>
  Boolean(req.user);

export const mergeFieldAccesses = (...accesses: FieldAccess[]): FieldAccess => {
  return async (...args: Parameters<FieldAccess>) => {
    for (const access of accesses) {
      const isAccessAllowed = await access(...args);

      if (!isAccessAllowed) return false;
    }

    return true;
  };
};

export const mergeCollectionAccesses = (...accesses: Access[]): Access => {
  return async (...args: Parameters<Access>) => {
    let derivedWhere: Where | null = null;

    for (const access of accesses) {
      const accessResult = await access(...args);

      if (typeof accessResult === 'object') {
        if (!derivedWhere) derivedWhere = {};

        Object.assign(derivedWhere, accessResult);
      } else if (!accessResult) {
        return false;
      }
    }

    return derivedWhere || true;
  };
};
