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
      <section className='flex justify-center py-20'>
        <Container className='flex flex-col items-center space-y-5 text-center sm:css-var-[--css=1rem]'>
          <h1 className='text-6xl w-3/4 leading-[1.3] text-gray-900'>
            <span className='font-bold'>Your marketplace for high-quality</span>

            <strong className='inline-block pl-2 text-primary'>
              digital assets
            </strong>
          </h1>

          <p className='text-gray-500 text-xl leading-normal w-2/3 mt-8'>
            Welcome to DigitalMonkey. Every asset on our platform is verified by
            our team to ensure our highest quality standards
          </p>

          <div className='flex items-center space-x-5 pt-6'>
            <Button asChild className='text-lg'>
              <Link href='/products'>
                Browse trending
              </Link>
            </Button>

            <Button asChild variant='ghost' className='text-lg'>
              <Link href='/products'>
                Our quality promise &rarr;
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className='py-16 bg-slate-100 border-t-2 border-slate-200 flex justify-center'>
        <Container className='flex lg:justify-between flex-col lg:flex-row items-center max-lg:gap-16'>
          {perks.map((props) => (
            <Perk key={props.title} {...props} className='text-center w-3/12' />
          ))}
        </Container>
      </section>

      <section className='py-16 border-t-2 flex justify-center'>
        <Container className='w-full'>
          <div className='text-2xl text-gray-800 font-bold mb-8'>Brand New</div>

          <ProductReels title='Brand New' className='gap-20' />
        </Container>
      </section>
    </>
  );
}
