import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Replaced problematic barrel import with explicit file imports
import { CssIcon } from './CssIcon';
import { EsphomeIcon } from './EsphomeIcon';
import { GithubIcon } from './GithubIcon';
import { GithubCopilotIcon } from './GithubCopilotIcon';
import { NextdotjsIcon } from './NextdotjsIcon';
import { NodedotjsIcon } from './NodedotjsIcon';
import { OpenaiIcon } from './OpenaiIcon';
import { PythonIcon } from './PythonIcon';
import { RadixuiIcon } from './RadixuiIcon';
import { ReactIcon } from './ReactIcon';
import { ReduxIcon } from './ReduxIcon';
import { SassIcon } from './SassIcon';
import { ShadcnuiIcon } from './ShadcnuiIcon';
import { SupabaseIcon } from './SupabaseIcon';
import { TailwindcssIcon } from './TailwindcssIcon';
import { TypescriptIcon } from './TypescriptIcon';
import { VercelIcon } from './VercelIcon';
import { WebglIcon } from './WebglIcon';

const iconEntries = [
  { name: 'CSS', Comp: CssIcon },
  { name: 'ESPHome', Comp: EsphomeIcon },
  { name: 'GitHub', Comp: GithubIcon },
  { name: 'GitHub Copilot', Comp: GithubCopilotIcon },
  { name: 'Next.js', Comp: NextdotjsIcon },
  { name: 'Node.js', Comp: NodedotjsIcon },
  { name: 'OpenAI', Comp: OpenaiIcon },
  { name: 'Python', Comp: PythonIcon },
  { name: 'Radix UI', Comp: RadixuiIcon },
  { name: 'React', Comp: ReactIcon },
  { name: 'Redux', Comp: ReduxIcon },
  { name: 'Sass', Comp: SassIcon },
  { name: 'shadcn/ui', Comp: ShadcnuiIcon },
  { name: 'Supabase', Comp: SupabaseIcon },
  { name: 'Tailwind CSS', Comp: TailwindcssIcon },
  { name: 'TypeScript', Comp: TypescriptIcon },
  { name: 'Vercel', Comp: VercelIcon },
  { name: 'WebGL', Comp: WebglIcon },
];

                    
const meta: Meta = {
  title: 'Icons/All',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Showcase of technology/logo SVG icons used in the project page.',
      },
    },
  },
};
export default meta;

export const All: StoryObj = {
  render: () => (
    <div className="flex max-w-4xl flex-wrap gap-8 p-6">
      {iconEntries.map(({ name, Comp }) => (
        <div key={name} className="flex w-32 flex-col items-center gap-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-background shadow-sm">
            <Comp className="h-10 w-10 fill-foreground" />
          </div>
          <span className="text-xs font-medium text-background">{name}</span>
        </div>
      ))}
    </div>
  ),
};
