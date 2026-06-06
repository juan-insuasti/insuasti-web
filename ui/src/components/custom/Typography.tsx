import { FC } from 'react';

import clsx from 'clsx';

type TTypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';

type TTypographyProps = {
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: string;
  variant: TTypographyVariants;
};

export const Typography: FC<TTypographyProps> = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as: Tag = 'p' as unknown as React.ComponentType<any>,
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

  return (
    <Tag className={clsx(baseStyles[variant], className)}>
      <>{children}</>
    </Tag>
  );
};
