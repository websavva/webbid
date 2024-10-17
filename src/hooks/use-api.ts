'use client';

import { useReducer } from 'react';
import flatry from 'await-to-js';

export enum UseApiStatus {
  Pending = 'pending',
  Error = 'error',
  Success = 'success',
  Initial = 'initial',
}

export type UseApiReturnValue<Args extends any[], ResponseData> = {
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

export interface UseApiState<ResponseData> {
  status: UseApiStatus;
  error: Error | null;
  data: ResponseData | undefined;
  pending: boolean;
}

export type ReducerAction<ResponseData> =
  | {
      type: UseApiStatus.Initial | UseApiStatus.Pending;
    }
  | {
      type: UseApiStatus.Error;
      payload: Error;
    }
  | {
      type: UseApiStatus.Success;
      payload: ResponseData;
    };

export const DEFAULT_STATE = {
  status: UseApiStatus.Initial,
  error: null,
  data: undefined,

  pending: false,
};

export const useApi = <Args extends any[], ResponseData>(
  handler: (...args: Args) => Promise<ResponseData>,
  {
    onSuccess,
    onError,
    initialStatus = UseApiStatus.Initial,
  }: {
    onSuccess?: (data: ResponseData) => any;
    onError?: (error: Error) => any;
    initialStatus?: UseApiStatus;
  } = {},
) => {
  const derivedDefaultState = {
    ...DEFAULT_STATE,
    status: initialStatus,
  };

  const [apiState, dispatch] = useReducer(
    (_: UseApiState<ResponseData>, action: ReducerAction<ResponseData>) => {
      switch (action.type) {
        case UseApiStatus.Success:
          return {
            ...derivedDefaultState,

            status: UseApiStatus.Success,
            data: action.payload,
          };

        case UseApiStatus.Error:
          return {
            ...derivedDefaultState,

            status: UseApiStatus.Error,
            error: action.payload,
          };

        case UseApiStatus.Pending:
          return {
            ...derivedDefaultState,

            status: UseApiStatus.Pending,
            pending: true,
          };

        default:
        case UseApiStatus.Initial:
          return {
            ...derivedDefaultState,
          };
      }
    },
    {
      ...derivedDefaultState,
    },
  );

  const reset = () => {
    dispatch({
      type: UseApiStatus.Initial,
    });
  };

  const makeApiCall = async (...args: Args) => {
    reset();

    dispatch({
      type: UseApiStatus.Pending,
    });

    const [err, responseData] = await flatry(handler(...args));

    if (err) {
      await onError?.(err);

      dispatch({
        type: UseApiStatus.Error,
        payload: err,
      });
    } else {
      await onSuccess?.(responseData);

      dispatch({
        type: UseApiStatus.Success,
        payload: responseData,
      });
    }
  };

  const statusFlags = Object.fromEntries(
    Object.entries(UseApiStatus).map(([statusName, statusId]) => {
      return [`is${statusName}`, apiState.status === statusId];
    }),
  );

  return {
    ...apiState,

    makeApiCall,
    reset,

    ...statusFlags,
  } as UseApiReturnValue<Args, ResponseData>;
};
