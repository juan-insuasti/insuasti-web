'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

type SectionFullPageProps = {
  children: React.ReactNode;
  className?: string;
};

export const SectionFullPage: React.FC<SectionFullPageProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.max(0, windowHeight - rect.top) / (rect.height || 1);
      setScrollRatio(Math.min(Math.max(visible, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the initial scroll ratio

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        'flex min-h-screen flex-col items-start justify-center px-4 md:px-8 lg:px-16 py-32 relative opacity-[calc(3*var(--ratio))]',
        className,
      )}
      style={
        {
          '--ratio': scrollRatio,
        } as React.CSSProperties
      }
      ref={ref}
    >
      {children}
    </div>
  );
};
