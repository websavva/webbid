import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='flex flex-col space-y-10 max-w-screen-xl mx-auto py-10 items-center'>
      <section className='flex flex-col items-center space-y-5 text-center w-3/4'>
        <h1 className='text-6xl leading-[1.3]'>
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
          <Button className='text-lg'>Browse trending</Button>

          <Button className='text-lg' variant='ghost'>
            Our quality promise &rarr;
          </Button>
        </div>
      </section>
    </div>
  );
}
