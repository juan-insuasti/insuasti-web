import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { SectionFullPage } from '@/ui/SectionFullPage';
import { Typography } from '@/ui/Typography';

export const Hero: React.FC = () => {
  return (
    <SectionFullPage>
      <Typography as="h1" variant="h1">
        Hi, I&apos;m <span className="text-green-700">Juan Insuasti</span>!
      </Typography>

      <Typography as="p" variant="h2" className="mt-1 font-normal md:mt-2 lg:mt-4">
        A Frontend Developer turning design concepts into seamless digital experiences.
      </Typography>
      <div className="mt-4 flex">
        <Link href="https://www.linkedin.com/in/jinsuasti/" target="_blank">
          <Image src="/social-linkedin.svg" alt="Linkedin Profile" width={40} height={40} />
        </Link>
        <Link href="https://github.com/locke189" target="_blank">
          <Image src="/social-github.svg" alt="Github Repositories" width={40} height={40} />
        </Link>
      </div>
    </SectionFullPage>
  );
};
