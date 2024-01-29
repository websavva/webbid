import type { User } from '#server/cms/collections/types';

export const fetchMe = async () => {
  const { user } = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/me', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  }).then((res) => res.json() as Promise<{ user: User }>);

  return user;
};
