import { loadAuthContext } from '../auth/load';

export const loadAppContext = async (
  headers?: Record<string, any> | Headers,
) => {
  const [authContextValue] = await Promise.all([loadAuthContext(headers)]);

  return {
    authContextValue,
  };
};

export type AppContext = Awaited<ReturnType<typeof loadAppContext>>;
