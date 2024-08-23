import { createContext } from 'react';

import { getDefaultMaxScreenFlags, getDefaultMinScreenFlags } from './config';
import type { ScreenMediaQueriesContextSchema } from './types';

export const ScreenMediaQueriesContext =
  createContext<ScreenMediaQueriesContextSchema>({
    ...getDefaultMinScreenFlags(),
    ...getDefaultMaxScreenFlags(),
  });
