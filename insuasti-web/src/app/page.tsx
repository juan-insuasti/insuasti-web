import { Hero } from '@/ui/Hero';
import { About } from './(homepage)/about';

export default function Home() {
  const HeroTitle = (
    <>
      Hi, I&apos;m <span className="text-green-700">Juan Insuasti</span>!
    </>
  );
  const HeroDescription =
    'A Frontend Developer turning design concepts into seamless digital experiences.';

  return (
    <div className="mb-28 flex justify-center md:mb-0">
      <div className="container">
        <Hero title={HeroTitle} description={HeroDescription} />
        <About />
      </div>
    </div>
  );
}
