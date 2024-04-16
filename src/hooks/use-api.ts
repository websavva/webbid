import { useState } from 'react';
import flatry from 'await-to-js';

export enum UseApiStatus {
  Pending = 'pending',
  Error = 'error',
  Success = 'success',
  Initial = 'initial',
}

export type UseApiState<Args extends any[], ResponseData> = {
  makeApiCall: (...args: Args) => Promise<void>;
  reset: () => void;
} & (
  | {
      status: UseApiStatus.Initial;
      data: undefined;
      error: null;
      pending: false;
      isSuccess: false;
      isError: false;
      isInitial: false;
      isPending: false;
    }
  | {
      status: UseApiStatus.Pending;
      data: undefined;
      error: null;
      pending: true;
      isSuccess: false;
      isError: false;
      isInitial: false;
      isPending: true;
    }
  | {
      status: UseApiStatus.Error;
      data: undefined;
      error: Error;
      pending: false;
      isSuccess: false;
      isError: true;
      isInitial: false;
      isPending: false;
    }
  | {
      status: UseApiStatus.Success;
      data: ResponseData;
      error: null;
      pending: false;
      isSuccess: true;
      isError: false;
      isInitial: false;
      isPending: false;
    }
);

export const useApi = <Args extends any[], ResponseData>(
  handler: (...args: Args) => Promise<ResponseData>
) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState(UseApiStatus.Initial);
  const [data, setData] = useState<ResponseData>();

  const reset = () => {
    setData(undefined);
    setStatus(UseApiStatus.Initial);
    setError(null);
    setPending(false);
  };

  const makeApiCall = async (...args: Args) => {
    reset();

    setPending(true);
    setStatus(UseApiStatus.Pending);

    const [err, responseData] = await flatry(handler(...args));

    setPending(false);

    if (err) {
      setError(err);


      setStatus(UseApiStatus.Error);
    } else {
      setData(responseData);

      setStatus(UseApiStatus.Success);
    }

  };

  // console.log({
  //   status
  // });


  const statusFlags = Object.fromEntries(
    Object.entries(UseApiStatus).map(([statusName, statusId]) => {
      return [`is${statusName}`, status === statusId];
    })
  );

  return {
    data,
    pending,
    status,
    error,

    makeApiCall,
    reset,

    ...statusFlags,
  } as UseApiState<Args, ResponseData>;
};
