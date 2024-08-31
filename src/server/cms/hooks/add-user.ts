import type { CollectionBeforeChangeHook } from 'payload/types';

export const addUser: CollectionBeforeChangeHook = ({ req, data }) => {
  if (!req.user) return data;

  return {
    ...data,
    user: req.user.id,
  };
};
