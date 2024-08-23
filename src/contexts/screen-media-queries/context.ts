import { createContext } from 'react';

import { screens, type ScreenName } from './config';

export type ScreenMediaQueriesContextSchema = Record<
  ScreenName | `max-${ScreenName}`,
  boolean
>;

const defaultContextValue = Object.fromEntries(
  Object.keys(screens)
    .map((screenName) => [
      [screenName, false],
      [`max-${screenName}`, false],
    ])
    .flat(),
);

export const ScreenMediaQueriesContext =
  createContext<ScreenMediaQueriesContextSchema>(defaultContextValue);
