import React from 'react';
import { SectionFullPage } from '@/ui/SectionFullPage';
import { Typography } from '@/ui/Typography';

import '@/app/globals.css';
import { Social, SocialProps } from './Social';

interface HeroProps {
	title: React.ReactNode;
	description: React.ReactNode;
	social?: SocialProps;
}

export const Hero = ({ title, description, social }: HeroProps) => {
	return (
		<SectionFullPage>
			<Typography as="h1" variant="h1">
				{title}
			</Typography>
			<Typography as="p" variant="h2" className="mt-1 font-normal md:mt-2 lg:mt-4">
				{description}
			</Typography>
			{social && <Social {...social} />}
		</SectionFullPage>
	);
};
