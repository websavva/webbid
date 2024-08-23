import { screens as defaultScreens } from 'tailwindcss/defaultTheme';

export type ScreenName = keyof typeof defaultScreens | 'xs' | '3xl';

export type Screens = Record<ScreenName, string>;

export const screens: Screens = {
  xs: '475px',
  ...defaultScreens,
  '3xl': '1600px',
};
