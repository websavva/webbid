import { createContextHook } from '@/lib/utils/create-context-hook';

import { AuthContext } from '@/contexts/auth/context';

export const useAuth = createContextHook(AuthContext);
