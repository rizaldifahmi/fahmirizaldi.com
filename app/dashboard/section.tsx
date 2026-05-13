'use client';

import RenderIf from '@/components/shared/render-if';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  description: string;
  icon: JSX.Element;
  children: React.ReactNode;
  appendix?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const Section = ({
  title,
  description,
  icon,
  children,
  appendix,
  isLoading,
  className,
}: SectionProps) => {
  return (
    <section className={cn('flex flex-col gap-2', className)}>
      <div
        className={cn('flex items-center gap-1 font-cal text-xl font-medium')}
      >
        {icon}
        <h2 className={cn('capitalize')}>{title}</h2>
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-2',
          'md:flex-row md:items-center',
        )}
      >
        <p>{description}</p>
        <RenderIf isTrue={Boolean(appendix)}>{appendix}</RenderIf>
      </div>
      {isLoading ? (
        <div className={cn('grid gap-3 py-2', 'md:grid-cols-3')}>
          <Skeleton className={cn('h-16 w-full')} />
          <Skeleton className={cn('h-16 w-full')} />
          <Skeleton className={cn('h-16 w-full')} />
        </div>
      ) : (
        <>{children}</>
      )}
    </section>
  );
};

export default Section;
