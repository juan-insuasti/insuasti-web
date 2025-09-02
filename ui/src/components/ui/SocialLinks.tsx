import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

export type SocialLink = {
  href: string;
  src?: string;
  alt: string;
  icon?: React.ReactNode;
};

export interface SocialProps {
  className?: string;
  socialLinks?: SocialLink[];
}

export const SocialLinks = ({ className, socialLinks = [] }: SocialProps) => {
  return (
    <div className={clsx('mt-4 flex gap-4', className)}>
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          aria-label={link.alt}
          target="_blank"
          className={clsx('relative', link.src && 'aspect-square h-14 md:h-16')}
        >
          {link.src && <Image src={link.src} alt={link.alt} fill />}
          {!link.src && link.icon}
        </Link>
      ))}
    </div>
  );
};
