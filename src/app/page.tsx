import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';

import Link from 'next/link';

import { Container } from '@/components/UI/Container';
import { Button } from '@/components/UI/Button';
import { Perk, type PerkProps } from '@/components/Perk';
import { ProductReels } from '@/components/ProductReels';

const perks: PerkProps[] = [
  {
    title: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    title: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    title: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <section className='flex justify-center py-14 sm:py-20'>
        <Container className='flex flex-col items-center text-center max-xs:max-w-full'>
          <h1 className='w-3/4 text-[2.5rem] leading-[1.3] text-gray-900 sm:text-5xl lg:text-6xl'>
            <span className='font-bold'>Your marketplace for high-quality</span>

            <strong className='inline-block pl-2 text-primary'>
              digital assets
            </strong>
          </h1>

          <p className='mt-8 w-2/3 text-lg leading-normal text-gray-500 lg:text-xl'>
            Welcome to WebBid. Every asset on our platform is verified by
            our team to ensure our highest quality standards
          </p>

          <div className='mt-12 flex flex-col items-center gap-5 lg:flex-row'>
            <Button asChild className='text-lg'>
              <Link href='/products'>Browse trending</Link>
            </Button>

            <Button asChild variant='ghost' className='text-lg'>
              <Link href='/products'>Our quality promise &rarr;</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className='flex justify-center border-t-2 border-slate-200 bg-slate-100 py-16'>
        <Container className='flex flex-col gap-16 sm:max-lg:max-w-[60%] lg:flex-row lg:justify-between'>
          {perks.map((props) => (
            <Perk
              key={props.title}
              {...props}
              className='lg:w-3/12 lg:text-center'
            />
          ))}
        </Container>
      </section>

      <section className='flex justify-center border-t-2 py-16'>
        <Container className='w-full sm:max-lg:max-w-[60%]'>
          <div className='mb-14 text-2xl font-bold text-gray-800 lg:mb-8'>
            Brand New
          </div>

          <ProductReels className='gap-10 css-var-[--column-counts=1] lg:gap-20 lg:css-var-[--column-counts=3]' />
        </Container>
      </section>
    </>
  );
}
