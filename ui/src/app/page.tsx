import { Hero } from '@/ui/Hero';
import { About } from './(homepage)/about';
import { SOCIAL_LINKS } from '@/lib/consts';
import { SocialLinks } from '@/ui/SocialLinks';
import { N } from 'vitest/dist/chunks/reporters.d.CfRkRKN2.js';
import { NavBar } from '@/ui/NavBar';

export default function Home() {
  const HeroTitle = (
    <>
      Hi, I&apos;m <span className="text-green-700">Juan Insuasti</span>!
    </>
  );
  const HeroDescription =
    'A Frontend Developer turning design concepts into seamless digital experiences.';

  return (
    <>
      <NavBar />
      <div className="mb-28 flex justify-center md:mb-0">
        <div className="container">
          <Hero title={HeroTitle} description={HeroDescription}>
            <SocialLinks socialLinks={SOCIAL_LINKS} />
          </Hero>
          <a id="about" />
          <About />
        </div>
      </div>
    </>
  );
}
