import { headers } from 'next/headers';

const DEFAULT_SELECTED_HEADERS = ['cookie'];

export const requestHeaders = (
  currentHeaders = headers(),
  selectedHeaders: string[] = DEFAULT_SELECTED_HEADERS,
) =>
  Object.fromEntries(
    Array.from(currentHeaders.entries()).filter(([name]) =>
      selectedHeaders.includes(name),
    ),
  );
