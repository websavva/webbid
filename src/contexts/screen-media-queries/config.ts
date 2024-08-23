import { screens as defaultScreens } from 'tailwindcss/defaultTheme';

import type {
  ScreenName,
  Screens,
  MinScreenFlags,
  MaxScreenFlags,
} from './types';

export const screens: Screens = {
  xs: '475px',
  ...defaultScreens,
  '3xl': '1600px',
};

export const screenNames = Object.keys(screens) as ScreenName[];

export const getDefaultMinScreenFlags = () => {
  return Object.fromEntries(
    screenNames.map((screenName) => [screenName, false]),
  ) as MinScreenFlags;
};

export const getDefaultMaxScreenFlags = () => {
  return Object.fromEntries(
    screenNames.map((screenName) => [`max-${screenName}`, false]),
  ) as MaxScreenFlags;
};
