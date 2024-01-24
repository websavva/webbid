export const getPromiseWithResolvers = <T = unknown>() => {
  let resolve: (value: T) => void;
  let reject: (reason: any) => void;

  const promise = new Promise((internalResolve, internalReject) => {
    resolve = internalResolve;
    reject = internalReject;
  });

  return {
    promise,

    resolve: resolve!,
    reject: reject!,
  };
};
