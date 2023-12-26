import { cn } from "@/lib/utils";

export default function Home() {
  return <div className='flex flex-col space-y-10 max-w-screen-xl mx-auto py-10'>
    <section className="flex flex-col items-center space-y-5 text-center w-3/4">
      <h1 className='font-bold text-6xl leading-normal max-w-prose'>
        <span>
          Your marketplace for high-quality
        </span> 
        
        <strong className="inline-block pl-2 text-primary">
          digital assets
        </strong>
      </h1>

    </section>
  </div>
}
