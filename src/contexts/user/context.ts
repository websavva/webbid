import { createContext, type PropsWithChildren } from 'react';

import type { User } from '#server/cms/collections/types';

export interface UserContextValue {
  user: User | null;
  refresh: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  refresh: async () => {},
});
