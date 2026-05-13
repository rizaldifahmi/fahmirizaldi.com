import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import Container from './container';

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  centered?: boolean;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(({
  title,
  description,
  centered = false,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-grid py-8',
        'lg:py-12',
        className,
      )}
      {...props}
      ref={ref}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-gradient-to-br from-primary/30 via-sky-400/15 to-pink-400/20 opacity-70 blur-3xl',
          'md:size-96',
          'dark:opacity-50',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent',
          'motion-safe:animate-reveal-scale-x',
        )}
      />
      <Container
        className={cn(
          'pointer-events-none relative select-none overflow-hidden',
          {
            'text-center': centered,
          },
        )}
      >
        <div
          className={cn(
            'motion-safe:animate-reveal-up',
            !centered && 'motion-safe:animate-reveal-left',
          )}
        >
          <h1
            className={cn(
              'pb-2 font-cal text-4xl font-bold',
              'md:text-5xl',
              'lg:text-6xl',
            )}
          >
            {title}
          </h1>
        </div>
        {description && (
          <div
            className={cn(
              'motion-safe:animate-reveal-up animation-delay-100',
              !centered && 'motion-safe:animate-reveal-left',
            )}
          >
            <p className={cn('mt-2 font-cal text-lg')}>{description}</p>
          </div>
        )}
      </Container>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';

export default PageHeader;
