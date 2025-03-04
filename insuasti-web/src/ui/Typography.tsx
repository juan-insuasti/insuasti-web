import clsx from 'clsx';
import { JSX, FC } from 'react';

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
    h1: 'text-left text-3xl font-bold md:text-4xl lg:text-5xl',
    h2: 'text-left text-2xl font-bold md:text-3xl lg:text-4xl',
    h3: 'text-left text-xl font-bold md:text-2xl lg:text-3xl',
    h4: 'text-left text-lg font-bold md:text-xl lg:text-2xl',
    p: 'text-left text-xs  md:text-sm lg:text-base',
    small: 'text-xs text-gray-500',
  };

  return <Tag className={clsx(baseStyles[variant], className)}>{children}</Tag>;
};
