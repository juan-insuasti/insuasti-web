import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';
import { NextdotjsIcon } from './icons/NextdotjsIcon';
import { ReactIcon } from './icons/ReactIcon';
import { TypescriptIcon } from './icons/TypescriptIcon';
import { TailwindcssIcon } from './icons/TailwindcssIcon';
import { RadixuiIcon } from './icons/RadixuiIcon';
import { EsphomeIcon } from './icons/EsphomeIcon';
import { VercelIcon } from './icons/VercelIcon';
import { NodedotjsIcon } from './icons/NodedotjsIcon';
import { OpenaiIcon } from './icons/OpenaiIcon';
import { CssIcon } from './icons/CssIcon';
import { ShadcnuiIcon } from './icons/ShadcnuiIcon';
import { PostgresIcon } from './icons/PostgresIcon';
import { ReactqueryIcon } from './icons/ReactqueryIcon';
import { SupabaseIcon } from './icons/SupabaseIcon';

export interface TechBadgeProps {
  tech: string;
  className?: string;
  withLabel?: boolean;
}

// Curated mapping for icons (can expand). Using simple inline SVG placeholders or existing public assets.
// For technologies not in the map, we show the uppercase first letter.
const techIconMap: Record<string, { label: string; svg?: React.FC<React.SVGProps<SVGSVGElement>>;  }> = {
  nextjs: { label: 'Next.js', svg: NextdotjsIcon  },
  react: { label: 'React', svg: ReactIcon, },
  typescript: { label: 'TypeScript', svg: TypescriptIcon },
  tailwindcss: { label: 'Tailwind CSS', svg: TailwindcssIcon },
  'radix-ui': { label: 'Radix UI', svg: RadixuiIcon },
  esp32: { label: 'ESP32', svg: EsphomeIcon },
  iot: { label: 'IoT', svg: EsphomeIcon },
  vercel: { label: 'Vercel', svg: VercelIcon },
  node: { label: 'Node.js', svg: NodedotjsIcon },
  openai: { label: 'OpenAI', svg: OpenaiIcon },
  html: { label: 'HTML' },
  zustand: { label: 'Zustand' },
  css: { label: 'CSS', svg: CssIcon },
  javascript: { label: 'JavaScript' },
  shadcnui: { label: 'Shadcn UI', svg: ShadcnuiIcon},
  postgres: { label: 'PostgreSQL', svg: PostgresIcon },
  supabase: { label: 'Supabase', svg: SupabaseIcon },
  'react-query': { label: 'React Query', svg: ReactqueryIcon },
};

export function TechBadge({ tech, className, withLabel = true }: TechBadgeProps) {
  const key = tech.toLowerCase();
  const meta = techIconMap[key] || { label: tech };
  const badge = (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground border-muted',
        className,
      )}
    >
      {meta.svg && <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-transparent text-[0.55rem] font-bold text-black">
            {<meta.svg className='h-4 w-4 fill-black dark:fill-white'/>}
      </span>
      }
      {withLabel && (
        <span className="align-center flex items-center justify-center">{meta.label}</span>
      )}
    </span>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>{meta.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
