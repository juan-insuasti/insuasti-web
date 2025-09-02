import { FC, JSX } from 'react';

import clsx from 'clsx';

type TTypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';

type TTypographyProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variant: TTypographyVariants;
};

export const Typography: FC<TTypographyProps> = ({
  children,
  className,
  as: Tag = 'p',
  variant,
}) => {
  const baseStyles: Record<TTypographyVariants, string> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p text-muted-foreground',
    small: 'small',
  };

  return <Tag className={clsx(baseStyles[variant], className)}>{children}</Tag>;
};
