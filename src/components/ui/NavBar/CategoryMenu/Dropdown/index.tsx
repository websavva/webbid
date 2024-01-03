'use client';

import { type HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

import type { ProductCategory } from '@/config/product-categories';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

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
  className,
  ...attrs
}: NavBarCategoryDropdownProps) {
  return (
    <div className={cn(className)} {...attrs}>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        size={'sm'}
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

      {isActive && (
        <div className='bg-white w-full absolute left-0 top-[80px] py-7 animate-in duration-500 fade-in-0 slide-in-from-bottom-8 flex justify-center shadow-sm'>
          <Container>
            <ul className='grid grid-cols-3 gap-10'>
              {category.featuredItems.map(({ imageSrc, name, href }) => {
                return (
                  <li key={name}>
                    <Image
                      src={imageSrc}
                      alt=''
                      objectFit='cover'
                      width={500}
                      height={500}
                      className='rounded-lg max-h-72 object-cover'
                    />

                    <Link href={href} className='mt-5 flex flex-col'>
                      <p className='text-gray-800 font-bold text-lg'>{name}</p>

                      <span className='inline-block mt-2 text-gray-600'>
                        Shop now
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </div>
      )}
    </div>
  );
}
