import { getPromiseWithResolvers } from './promise-with-resolvers';

export const wait = (timeout = 0) => {
  const { resolve, promise } = getPromiseWithResolvers();

  setTimeout(resolve, timeout);

  return promise;
};
