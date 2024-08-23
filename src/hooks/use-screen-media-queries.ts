import { useContext } from 'react';

import { ScreenMediaQueriesContext } from '@/contexts/screen-media-queries/context';

export const useScreenMediaQueries = () =>
  useContext(ScreenMediaQueriesContext);
