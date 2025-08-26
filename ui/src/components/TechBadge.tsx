import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';
import { SimpIcon } from './SimpIcon';
import {
  siCss,
  siEsphome,
  siHtml5,
  siJavascript,
  SimpleIcon,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siPostgresql,
  siRadixui,
  siReact,
  siReactquery,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from 'simple-icons';

export interface TechBadgeProps {
  tech: string;
  className?: string;
  withLabel?: boolean;
  tooltipTechList?: (keyof typeof techIconMap)[];
}

// Curated mapping for icons (can expand). Using simple inline SVG placeholders or existing public assets.
// For technologies not in the map, we show the uppercase first letter.
const techIconMap: Record<string, { label: string; svg?: SimpleIcon }> = {
  nextjs: { label: 'Next.js', svg: siNextdotjs },
  react: { label: 'React', svg: siReact },
  typescript: { label: 'TypeScript', svg: siTypescript },
  tailwindcss: { label: 'Tailwind CSS', svg: siTailwindcss },
  'radix-ui': { label: 'Radix UI', svg: siRadixui },
  esp32: { label: 'ESP32', svg: siEsphome },
  iot: { label: 'IoT', svg: siEsphome },
  vercel: { label: 'Vercel', svg: siVercel },
  node: { label: 'Node.js', svg: siNodedotjs },
  openai: { label: 'OpenAI', svg: siOpenai },
  html: { label: 'HTML', svg: siHtml5 },
  zustand: { label: 'Zustand' },
  css: { label: 'CSS', svg: siCss },
  javascript: { label: 'JavaScript', svg: siJavascript },
  shadcnui: { label: 'Shadcn UI', svg: siShadcnui },
  postgres: { label: 'PostgreSQL', svg: siPostgresql },
  supabase: { label: 'Supabase', svg: siSupabase },
  'react-query': { label: 'React Query', svg: siReactquery },
};

export function TechBadge({ tech, className, withLabel = true, tooltipTechList }: TechBadgeProps) {
  const key = tech.toLowerCase();
  const meta = techIconMap[key] || { label: tech };

  const tooltipText = tooltipTechList
    ? tooltipTechList
        .map((item: keyof typeof techIconMap) => techIconMap[item]?.label || item)
        .join(', ')
    : meta.label;

  const badge = (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-muted-foreground/20 bg-muted/50 px-2 py-1 text-xs font-medium text-foreground hover:border-primary/30 hover:bg-primary/10',
        className,
      )}
    >
      {meta.svg && (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-transparent text-[0.55rem] font-bold text-black">
          {<SimpIcon className="h-4 w-4 fill-black dark:fill-white" icon={meta.svg} />}
        </span>
      )}
      {withLabel && (
        <span className="align-center flex items-center justify-center">{meta.label}</span>
      )}
    </span>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className="font-bold">{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
