import { JSX } from 'react';

import { cva } from 'class-variance-authority';

import { ButtonProps, Button as ShadButton } from '@ui/shad-button';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'group/btn border border-foreground/50 bg-muted/10 text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary',
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'group/btn   border border-primary/20 bg-linear-to-r from-primary/10 to-primary/5  transition-all duration-300 hover:from-primary/20 hover:to-primary/10 hover:text-primary',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          'group relative inline-flex items-center gap-3 rounded-lg border-2 border-transparent bg-linear-to-r from-primary to-primary/90 font-semibold text-foreground transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/25',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      effect: {
        shiny: '',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-14 rounded-md px-8 py-4 text-xl [&_svg]:size-5',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const Button = ({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps & {
  effect?: 'shiny';
}): JSX.Element => {
  return (
    <ShadButton {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </ShadButton>
  );
};
