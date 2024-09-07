import { trpcClient } from '@/lib/trpc';

import { ClientNavBar, type ClientNavBarProps } from './index_client';

export type NavBarProps = Omit<ClientNavBarProps, 'categories'>;

export async function NavBar({ className, ...attrs }: NavBarProps) {
  const { docs: categories } =
    await trpcClient.products.categories.getCategories.query({
      perPage: 3,
    });

  return <ClientNavBar {...attrs} categories={categories} />;
}
