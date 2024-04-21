import { CollectionBeforeChangeHook } from 'payload/types';

export const addUser: CollectionBeforeChangeHook = ({ req, data }) => {
  return {
    ...data,
    user: req.user.id,
  };
};
