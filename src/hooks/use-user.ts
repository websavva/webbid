import { createContextHook } from '@/lib/utils/create-context-hook';

import { UserContext } from '@/contexts/user/context';

export const useUser = createContextHook(UserContext);
