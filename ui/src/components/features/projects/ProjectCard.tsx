import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { ProjectMeta } from '@/lib/project-types';
import { TechBadge } from '../../ui/TechBadge';
import { formatDate } from '@/lib/markdown-utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { siGithub } from 'simple-icons';
import { SimpIcon } from '../../ui/SimpIcon';

export interface ProjectCardProps {
  project: ProjectMeta;
}

const statusColorClasses: Record<ProjectMeta['status'], string> = {
  planned: 'bg-muted text-foreground border-border',
  'in-progress':
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800',
  beta: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 border-purple-300 dark:border-purple-800',
  stable:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-300 dark:border-green-800',
  archived:
    'bg-slate-200 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 border-slate-400 dark:border-slate-700',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const MAX_TECH_VISIBLE = 5;
  const hiddenTech = project.tech.slice(MAX_TECH_VISIBLE);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative aspect-video w-full overflow-hidden md:w-1/3">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-col p-6 md:w-2/3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              {project.title}
            </h3>
            <span
              className={cn(
                'whitespace-nowrap rounded-md border px-2 py-1 text-xs font-medium',
                statusColorClasses[project.status],
              )}
            >
              {project.status.replace('-', ' ')}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground md:text-base">
            {project.summary}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={project.date}>{formatDate(project.date)}</time>
            {project.blogSlug && (
              <>
                <span>•</span>
                <Link
                  href={`/blog/${project.blogSlug}`}
                  className="underline decoration-dotted underline-offset-2 hover:text-primary"
                >
                  Blog Post
                </Link>
              </>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, MAX_TECH_VISIBLE).map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
            {hiddenTech.length > 0 && (
              <TechBadge
                tech={`+${hiddenTech.length} more`}
                withLabel={true}
                tooltipTechList={hiddenTech}
              />
            )}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.repoUrl && (
              <Button asChild>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Repository for ${project.title}`}
                >
                  <SimpIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12"
                    icon={siGithub}
                  />{' '}
                  Repository
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-12" />{' '}
                  Live Demo
                </a>
              </Button>
            )}
            {project.blogSlug && (
              <Link
                href={`/blog/${project.blogSlug}`}
                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
                aria-label={`Blog post related to ${project.title}`}
              >
                <ExternalLink className="h-4 w-4" /> Blog
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
