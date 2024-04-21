import { DefineProps } from '@/types';

import { Logo } from '../Logo';
import { Container } from '../Container';
import { NavBarCategoryMenu } from './CategoryMenu';
import { NavBarRightMenu } from './RightMenu';
import { trpcClient } from '@/lib/trpc';

export type NavBarProps = DefineProps<{}, HTMLElement>;

export async function NavBar({ className, ...attrs }: NavBarProps) {
  const { docs: categories } =
    await trpcClient.products.categories.getCategories.query({
      perPage: 3,
    });

  return (
    <nav
      className='flex justify-center sticky h-20 top-0 bg-white w-full z-40'
      {...attrs}
    >
      <Container className='flex justify-between items-center border-b-2 border-gray-100 w-full'>
        <div className='flex items-center'>
          <Logo className='w-10 h-10 mr-8' />

          <NavBarCategoryMenu categories={categories} />
        </div>

        <NavBarRightMenu />
      </Container>
    </nav>
  );
}
