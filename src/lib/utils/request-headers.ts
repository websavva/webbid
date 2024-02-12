import { headers } from 'next/headers';

const DEFAULT_SELECTED_HEADERS = ['cookie'];

export const requestHeaders = (
  selectedHeaders: string[] = DEFAULT_SELECTED_HEADERS
) =>
  Object.fromEntries(
    Array.from(headers().entries()).filter(([name]) =>
      selectedHeaders.includes(name)
    )
  );
