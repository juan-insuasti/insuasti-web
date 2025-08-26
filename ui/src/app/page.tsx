import { BlogShowcase } from '@features/blog/BlogShowcase';
import { About } from '@features/homepage/About';
import { Hero } from '@features/homepage/Hero';
import { ProjectShowcase } from '@features/projects/ProjectShowcase';
import { JsonLd } from '@ui/JsonLd';

import { SOCIAL_LINKS } from '@/lib/consts';
import { homepageJsonLd } from '@/lib/jsonld';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { NavBar } from '@/components/layout/navbar/NavBar';

export default function Home() {
  const HeroTitle = (
    <>
      Hi, I&apos;m <span className="text-primary">Juan&nbsp;Insuasti</span>
    </>
  );

  const HeroDescription =
    'A Frontend Developer turning design concepts into seamless digital experiences.';

  return (
    <>
      <JsonLd data={homepageJsonLd()} />
      <NavBar />
      <div className="mb-28 flex justify-center md:mb-0">
        <div className="container">
          <Hero title={HeroTitle} description={HeroDescription}>
            <SocialLinks socialLinks={SOCIAL_LINKS} />
          </Hero>
          <a id="about" />
          <About />
          <ProjectShowcase />
          <BlogShowcase />
        </div>
      </div>
    </>
  );
}
