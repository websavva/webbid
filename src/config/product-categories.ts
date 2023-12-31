import type { LinkProps } from 'next/link';

export interface ProductCategoryFeaturedItem {
  name: string;
  href: LinkProps['href'];
  imageSrc: string;
}

export interface ProductCategory {
  label: string;
  id: string;

  featuredItems: ProductCategoryFeaturedItem[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    label: 'UI Kits',
    id: 'ui_kits' as const,
    featuredItems: [
      {
        name: 'Editor picks',
        href: {
          pathname: '/products',
          query: {
            category: 'ui_kits',
          },
        },
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: {
          pathname: '/products',
          query: {
            category: 'ui_kits',
            sort: 'desc',
          },
        },
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: {
          pathname: '/products',
          query: {
            category: 'ui_kits',
          },
        },
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
  {
    label: 'Icons',
    id: 'icons' as const,
    featuredItems: [
      {
        name: 'Favorite Icon Picks',
        href: {
          pathname: '/products',
          query: {
            category: 'icons',
          },
        },
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: {
          pathname: '/products',
          query: {
            category: 'icons',
            sort: 'desc',
          },
        },
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Bestselling Icons',
        href: {
          pathname: '/products',
          query: {
            category: 'icons',
          },
        },
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
];
