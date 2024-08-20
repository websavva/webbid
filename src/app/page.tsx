import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';

import { Container } from '@/components/UI/Container';
import { Button } from '@/components/UI/Button';
import { Perk, type PerkProps } from '@/components/Perk';
import { ProductReels } from '@/components/ProductReels';
import Link from 'next/link';

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

export default async function Home() {
  return (
    <>
      <section className='flex justify-center py-14 sm:py-20'>
        <Container className='flex flex-col items-center text-center'>
          <h1 className='text-[2.5rem] sm:text-5xl lg:text-6xl w-3/4 leading-[1.3] text-gray-900'>
            <span className='font-bold'>Your marketplace for high-quality</span>

            <strong className='inline-block pl-2 text-primary'>
              digital assets
            </strong>
          </h1>

          <p className='text-gray-500 text-lg lg:text-xl leading-normal w-2/3 mt-8'>
            Welcome to DigitalMonkey. Every asset on our platform is verified by
            our team to ensure our highest quality standards
          </p>

          <div className='flex flex-col lg:flex-row items-center gap-5 mt-12'>
            <Button asChild className='text-lg'>
              <Link href='/products'>Browse trending</Link>
            </Button>

            <Button asChild variant='ghost' className='text-lg'>
              <Link href='/products'>Our quality promise &rarr;</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className='py-16 bg-slate-100 border-t-2 border-slate-200 flex justify-center'>
        <Container className='flex lg:justify-between flex-col lg:flex-row gap-16 sm:max-lg:max-w-[60%]'>
          {perks.map((props) => (
            <Perk key={props.title} {...props} className='lg:text-center lg:w-3/12' />
          ))}
        </Container>
      </section>

      <section className='py-16 border-t-2 flex justify-center'>
        <Container className='sm:max-lg:max-w-[60%] w-full'>
          <div className='text-2xl text-gray-800 font-bold mb-14 lg:mb-8'>Brand New</div>

          <ProductReels className='gap-10 lg:gap-20 css-var-[--column-counts=1] lg:css-var-[--column-counts=3]' />
        </Container>
      </section>
    </>
  );
}
