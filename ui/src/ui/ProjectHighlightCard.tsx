import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, Zap } from 'lucide-react';
import { ProjectMeta } from '@/lib/project-types';
import { TechBadge } from './TechBadge';
import { formatDate } from '@/lib/markdown-utils';
import { cn } from '@/lib/utils';

export interface ProjectHighlightCardProps {
  project: ProjectMeta;
}

const statusConfig: Record<ProjectMeta['status'], { 
  label: string;
  classes: string;
  icon?: React.ReactNode;
  animate?: boolean;
}> = {
  planned: { 
    label: 'Planned',
    classes: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-600',
  },
  'in-progress': { 
    label: 'In Progress',
    classes: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-200 dark:border-yellow-700',
    icon: <Zap className="h-3 w-3" />,
    animate: true,
  },
  beta: { 
    label: 'Beta',
    classes: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-200 dark:border-purple-700',
    animate: true,
  },
  stable: { 
    label: 'Stable',
    classes: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-200 dark:border-green-700',
  },
  archived: { 
    label: 'Archived',
    classes: 'bg-slate-200 text-slate-600 border-slate-400 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700',
  },
};

export function ProjectHighlightCard({ project }: ProjectHighlightCardProps) {
  const MAX_TECH_VISIBLE = 4;
  const hiddenTech = project.tech.slice(MAX_TECH_VISIBLE);
  const status = statusConfig[project.status];

  return (
    <article className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Main content */}
      <div className="relative">
        {/* Image section with overlay effects */}
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status badge overlay */}
          <div className="absolute top-4 right-4 z-20">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm',
                status.classes,
                status.animate && 'animate-pulse'
              )}
            >
              {status.icon}
              {status.label}
            </span>
          </div>

          {/* Highlighted project star */}
          {project.highlighted && (
            <div className="absolute top-4 left-4 z-20">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-yellow-400/50 blur animate-ping" />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                  ⭐
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Date and blog link */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={project.date}>{formatDate(project.date)}</time>
            </div>
            {project.blogSlug && (
              <>
                <span>•</span>
                <Link
                  href={`/blog/${project.blogSlug}`}
                  className="underline decoration-dotted underline-offset-2 hover:text-primary transition-colors"
                >
                  Blog Post
                </Link>
              </>
            )}
          </div>

          {/* Tech stack with enhanced styling */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, MAX_TECH_VISIBLE).map((tech, index) => (
                <div
                  key={tech}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TechBadge tech={tech} className="bg-muted/50 border-muted-foreground/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300" />
                </div>
              ))}
              {hiddenTech.length > 0 && (
                <TechBadge 
                  tech={`+${hiddenTech.length} more`} 
                  withLabel={true}
                  className="bg-muted/30 border-dashed"
                />
              )}
            </div>
          </div>

          {/* Action buttons with enhanced styling */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-muted-foreground/20 bg-muted/50 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:text-primary group/btn"
                aria-label={`Repository for ${project.title}`}
              >
                <Github className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                Repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-primary/20 hover:to-primary/10 hover:text-primary group/btn"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
