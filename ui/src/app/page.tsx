import { Hero } from '@/containers/Hero';
import { About } from './(homepage)/about';
import { SOCIAL_LINKS } from '@/lib/consts';
import { SocialLinks } from '@/containers/SocialLinks';
import { NavBar } from '@/containers/navbar/NavBar';
import { BlogShowcase } from '@/containers/BlogShowcase';
import { ProjectShowcase } from '@/containers/ProjectShowcase';
import { JsonLd } from '@/components/JsonLd';
import { homepageJsonLd } from '@/lib/jsonld';

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
