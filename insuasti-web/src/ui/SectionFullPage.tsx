import clsx from 'clsx';
import React from 'react';

type SectionFullPageProps = {
  children: React.ReactNode;
  className?: string;
};

export const SectionFullPage: React.FC<SectionFullPageProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'flex min-h-screen flex-col items-start justify-center px-4 md:px-8 lg:px-16',
        className,
      )}
    >
      {children}
    </div>
  );
};
