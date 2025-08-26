import Link from 'next/link';
import { getHighlightedProjects } from '@/lib/project-utils';
import { ProjectHighlightCarousel } from './ProjectHighlightCarousel';
import { Typography } from './Typography';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SectionFullPage } from '../components/SectionFullPage';
import { Button } from '@/components/Button';

export async function ProjectShowcase() {
  const highlightedProjects = getHighlightedProjects(5); // Get up to 5 highlighted projects

  // Don't render the section if we have no highlighted projects
  if (!highlightedProjects.length) {
    return null;
  }

  return (
    <SectionFullPage>
      <div className="container mx-auto mb-24">
        {/* Section Header with Spotlight Effect */}
        <div className="relative mb-16 text-center">
          {/* Animated background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/10 blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="mb-12 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse text-primary" />
              <span className="text-sm font-medium uppercase tracking-wide text-primary">
                Featured Work
              </span>
              <Sparkles className="h-5 w-5 animate-pulse text-primary" />
            </div>

            <Typography
              as="h2"
              variant="h2"
              className="mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
            >
              Spotlight Projects
            </Typography>

            <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
              {`This is an example of the projects I've built. These are mostly tools that I use in my hobbies or to learn new technologies.`}
            </Typography>
          </div>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Gradient borders for extra flair */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-sm"></div>

          <ProjectHighlightCarousel projects={highlightedProjects} />
        </div>

        {/* Call to Action with Enhanced Styling */}
        <div className="mt-16 text-center">
          <Button asChild variant="ghost" size="lg">
            <Link href="/projects">
              <span>Explore All Projects</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              {/* Animated sparkle elements */}
              <div className="absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full bg-black duration-2000 dark:bg-white/80"></div>
              <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 animate-ping rounded-full bg-black delay-700 duration-3000 dark:bg-white/60"></div>
            </Link>
          </Button>
        </div>
      </div>
    </SectionFullPage>
  );
}
