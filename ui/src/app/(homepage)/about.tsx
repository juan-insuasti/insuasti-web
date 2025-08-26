import { SectionFullPage } from '@/containers/SectionFullPage';
import { Typography } from '@/containers/Typography';
import Image from 'next/image';
import React from 'react';

export const About: React.FC = () => {
  return (
    <SectionFullPage>
      <Typography as="h2" variant="h1" className="">
        About Me
      </Typography>

      <div className="mt-6 grid w-full grid-cols-8 gap-10 md:grid-cols-12">
        <div className="col-span-2 md:hidden"></div>
        <div className="col-span-4 flex justify-center md:col-span-4">
          <div className="max-h-max overflow-hidden rounded-lg shadow-lg">
            <Image src="/Insua2.jpg" alt="Juan Insuasti" width={1829} height={2048} />
          </div>
        </div>
        <div className="col-span-8">
          <Typography as="p" variant="p" className="md:mt-0 lg:mt-0">
            I’m a frontend developer who loves building sleek, accessible, and high-performance web
            applications. I have a strong background in React, TypeScript, and modern UI frameworks,
            focusing on creating scalable and intuitive digital experiences. I enjoy tackling
            complex UI challenges, fine-tuning performance, and adding polish through animations and
            thoughtful interactions. My experience with Remix, Next.js, and various UI libraries
            helps me build flexible and maintainable interfaces that feel great to use.
          </Typography>
          <div className="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Typography as="h3" variant="h3" className="text-primary">
                Skills & Tech
              </Typography>
              <ul className="mt-1 text-muted-foreground md:mt-2 lg:mt-4">
                <li>React & TypeScript</li>
                <li>Next.js / Remix</li>
                <li>GraphQL & REST</li>
                <li>UI/UX & Accessibility</li>
              </ul>
            </div>
            <div>
              <Typography as="h3" variant="h3" className="text-primary">
                Soft Skills
              </Typography>
              <ul className="mt-1 text-muted-foreground md:mt-2 lg:mt-4">
                <li>Problem-Solving</li>
                <li>Adaptability</li>
                <li>Collaboration</li>
                <li>Communication</li>
              </ul>
            </div>
          </div>
          <Typography as="h3" variant="h3" className="mb-4 mt-6 text-primary">
            Current Focus
          </Typography>
          <Typography as="p" variant="p">
            Right now, I’m honing my skills in building fast, scalable UIs while working on projects
            that push my limits. I’m actively developing a D&D campaign platform, where I’m
            experimenting with animations, accessibility, and intuitive interactions. I’m also
            diving deeper into full-stack development, exploring server components, edge functions,
            and modern API strategies to create more dynamic and efficient applications.
          </Typography>
        </div>
      </div>
    </SectionFullPage>
  );
};
