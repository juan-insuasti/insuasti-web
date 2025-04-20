import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

type SocialLink = {
	href: string;
	src: string;
	alt: string;
};

export interface SocialProps {
	className?: string;
	socialLinks?: SocialLink[];
}

export const SocialLinks = ({ className, socialLinks = [] }: SocialProps) => {
	return (
		<div className={clsx('mt-4 flex', className)}>
			{socialLinks.map((link, index) => (
				<Link key={index} href={link.href} target="_blank" className="mr-4">
					<Image src={link.src} alt={link.alt} width={40} height={40} />
				</Link>
			))}
		</div>
	);
};
