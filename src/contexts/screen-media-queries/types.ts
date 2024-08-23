import type { screens as defaultScreens } from 'tailwindcss/defaultTheme';

export type ScreenName = keyof typeof defaultScreens | 'xs' | '3xl';

export type Screens = Record<ScreenName, string>;

export type MinScreenFlags = Record<ScreenName, boolean>;

export type MaxScreenFlags = Record<`max-${ScreenName}`, boolean>;

export type ScreenMediaQueriesContextSchema = MinScreenFlags & MaxScreenFlags;

export type ScreenMediaQueryCallbacks = Record<
  ScreenName,
  { mq: MediaQueryList; callback: (event: MediaQueryListEvent) => void}
>;
