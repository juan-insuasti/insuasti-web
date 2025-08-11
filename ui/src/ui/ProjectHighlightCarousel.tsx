'use client';
import { ProjectMeta } from '@/lib/project-types';
import { ProjectCard } from './ProjectCard';
import React from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export interface ProjectHighlightCarouselProps {
  projects: ProjectMeta[];
}

export function ProjectHighlightCarousel({ projects }: ProjectHighlightCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      // Do something on select.
    });
  }, [api]);

  if (!projects.length) return null;
  return (
    <Carousel setApi={setApi} className="mb-8">
      <CarouselContent>
        {projects.map((p) => (
          <CarouselItem key={p.slug} className="w-full">
            <ProjectCard project={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {projects.length > 1 &&<>
        <CarouselPrevious />
      <CarouselNext />
      </>
      }
    </Carousel>
  );
}
