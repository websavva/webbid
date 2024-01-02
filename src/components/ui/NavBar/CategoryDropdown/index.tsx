'use client';

import { type HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

import type { ProductCategory } from '@/config/product-categories';
import { cn } from '@/lib/utils';
import { Container } from '../../Container';

export interface NavBarCategoryDropdownProps
  extends HTMLAttributes<HTMLDivElement> {
  category: ProductCategory;
  isActive: boolean;

  onToggle: (isActive: boolean) => any;
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
        className='text-base flex items-center'
        onClick={() => onToggle(!isActive)}
      >
        <span>{category.label}</span>

        <ChevronDown
          className={cn('ml-2 transition-transform w-4 h-4', {
            'rotate-180': isActive,
          })}
        />
      </Button>

      { isActive && <div className='bg-white w-full absolute left-0 top-[120px] animate-in duration-500 fade-in-0 slide-in-from-bottom-8'>
        <Container>
            <ul className='grid grid-cols-3'>
            {category.featuredItems.map(({ imageSrc, name, href }) => {
                return (
                <li key={name}>
                    <div>
                    <Image src={imageSrc} alt='' objectFit='cover' width={500} height={500} />
                    </div>

                    <Link href={href}>
                    <p>{name}</p>

                    <Button variant='ghost'>Shop now</Button>
                    </Link>
                </li>
                );
            })}
            </ul>
        </Container>
      </div>}
    </div>
  );
}
