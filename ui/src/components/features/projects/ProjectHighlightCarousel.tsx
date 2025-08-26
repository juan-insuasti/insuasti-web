'use client';

import React from 'react';

import { ProjectHighlightCard } from '@features/projects/ProjectHighlightCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@ui/carousel';

import { ProjectMeta } from '@lib/project-types';
import { cn } from '@lib/utils';

export interface ProjectHighlightCarouselProps {
  projects: ProjectMeta[];
}

export function ProjectHighlightCarousel({ projects }: ProjectHighlightCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!projects.length) return null;

  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-4 top-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-xl"></div>
        <div className="absolute bottom-8 right-8 h-32 w-32 animate-pulse rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-2xl delay-1000"></div>
      </div>

      <Carousel
        setApi={setApi}
        className="group mb-8"
        opts={{
          align: 'start',
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((project) => (
            <CarouselItem
              key={project.slug}
              className={cn(
                'pl-2 md:pl-4',
                'transform-gpu', // Enable GPU acceleration
              )}
            >
              <div className="group/card relative">
                {/* Spotlight effect that follows the active slide */}
                <div className={cn('absolute inset-0 -z-10 rounded-xl')} />

                {/* Enhanced project card with hover animations */}
                <div className="transform transition-all duration-300 group-hover/card:shadow-2xl group-hover/card:shadow-primary/10">
                  <ProjectHighlightCard project={project} />
                </div>

                {/* Featured badge with animation */}
                {project.highlighted && (
                  <div className="absolute -right-2 -top-2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-primary/30 blur"></div>
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-xs font-bold text-primary-foreground shadow-lg">
                        ★
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {projects.length > 1 && (
          <>
            <CarouselPrevious className="transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20" />
            <CarouselNext className="transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20" />
          </>
        )}
      </Carousel>

      {/* Enhanced carousel indicators */}
      {projects.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                current === index + 1
                  ? 'w-8 bg-primary shadow-lg shadow-primary/30'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50',
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
