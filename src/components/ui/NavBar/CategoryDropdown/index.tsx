'use client';

import type { HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

import type { ProductCategory } from '@/config/product-categories';

export interface NavBarCategoryDropdownProps extends HTMLAttributes<HTMLDivElement> {
  category: ProductCategory;
  isActive: boolean;

  onToggle: (id: string, isActive: boolean) => any;
}

export function NavBarCategoryDropdown({
  isActive,
  category,
  onToggle,
}: NavBarCategoryDropdownProps) {
  return (
    <div>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        onClick={() => onToggle(category.id, !isActive)}
      >
        <span>{category.label}</span>

        <ChevronDown />
      </Button>

      <div>
        <ul>
          {category.featuredItems.map(({ imageSrc, name, href }) => {
            return (
              <li key={name}>
                <div>
                  <Image src={imageSrc} alt='' objectFit='cover' />
                </div>

                <Link href={href}>
                  <p>{name}</p>

                  <Button variant='ghost'>Shop now</Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
