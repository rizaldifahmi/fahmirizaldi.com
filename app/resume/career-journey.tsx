import { differenceInMonths, differenceInYears, format } from 'date-fns';
import Image from 'next/image';

import { Document } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { env } from '@/lib/env';
import { EXPERIENCES } from '@/constants';
import { cn, formatDate } from '@/lib/utils';

const CareerJourney = () => {
  const lastUpdated = formatDate('2025-06-13');
  const isAvailableForDownload = env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE;

  return (
    <>
      <div className={cn('mb-12', 'md:mb-16')}>
        {isAvailableForDownload ? (
          <Link
            href="/resume/download"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center gap-x-1',
              'rounded-md bg-secondary px-4 py-2 text-sm font-medium',
              'text-secondary-foreground',
              'shadow-sm transition-colors',
              'hover:bg-secondary/80',
              'touch-manipulation'
            )}
          >
            <Document /> Download resume
          </Link>
        ) : (
          <>
            <div className={cn('md:hidden')}>
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      'inline-flex items-center justify-center gap-x-1',
                      'rounded-md bg-secondary px-4 py-2 text-sm font-medium',
                      'text-secondary-foreground',
                      'shadow-sm transition-colors',
                      'hover:bg-secondary/80',
                      'cursor-not-allowed opacity-50',
                      'touch-manipulation'
                    )}
                    role="button"
                    aria-disabled
                  >
                    <Document /> Download resume
                  </div>
                </PopoverTrigger>
                <PopoverContent side="bottom" className="text-sm w-auto max-w-[calc(100vw-2rem)] whitespace-nowrap p-2">
                  Not available at this time
                </PopoverContent>
              </Popover>
            </div>
            <div className={cn('hidden md:block')}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'inline-flex items-center justify-center gap-x-1',
                      'rounded-md bg-secondary px-4 py-2 text-sm font-medium',
                      'text-secondary-foreground',
                      'shadow-sm transition-colors',
                      'hover:bg-secondary/80',
                      'cursor-not-allowed opacity-50',
                      'touch-manipulation'
                    )}
                    role="button"
                    aria-disabled
                  >
                    <Document /> Download resume
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-sm">
                  Not available at this time
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        )}
      </div>
      <div className={cn('prose max-w-none px-4', 'dark:prose-dark')}>
        <ol className={cn('list-none space-y-4 border-l border-border pl-10')}>
          {EXPERIENCES.map(
            ({
              company,
              role,
              startDate,
              endDate,
              stacks,
              accomplishments,
            }) => {
              const start = new Date(startDate);
              const end = endDate ? new Date(endDate) : new Date();

              const durationInYears = differenceInYears(end, start);
              const durationInMonths = differenceInMonths(end, start) % 12;

              let durationText = '';

              if (durationInYears > 0) {
                durationText += `${durationInYears} yr${durationInYears > 1 ? 's' : ''} `;
              }

              if (durationInMonths > 0 || durationInYears === 0) {
                durationText += `${durationInMonths} mo${durationInMonths > 1 ? 's' : ''}`;
              }

              return (
                <li key={company.name} className={cn('relative h-full')}>
                  <div
                    className={cn('absolute -left-[60px] bottom-0 mt-0 h-full')}
                  >
                    <div className={cn('sticky top-20 flex items-start')}>
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={40}
                        height={40}
                        className={cn('ml-0 rounded-full')}
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      'flex flex-col items-start gap-1',
                      'md:flex-row',
                    )}
                  >
                    <div className={cn('flex flex-col space-y-1 leading-snug')}>
                      <h2 className={cn('my-0 font-cal text-lg')}>{role}</h2>
                      <div
                        className={cn(
                          'flex items-center gap-1 text-muted-foreground',
                        )}
                      >
                        <Link
                          href={company.url}
                          className={cn(
                            'text-muted-foreground underline',
                            'hover:text-foreground',
                          )}
                        >
                          {company.name}
                        </Link>
                        <span>&middot;</span>
                        <span>{company.jobType}</span>
                      </div>
                      <div className={cn('flex gap-1 text-muted-foreground')}>
                        <div className={cn('flex gap-1')}>
                          <span>{format(start, 'MMM yyyy')}</span> -{' '}
                          <span>
                            {endDate ? format(end, 'MMM yyyy') : 'Present'}
                          </span>
                        </div>
                        <span>&middot;</span>
                        <span>{durationText}</span>
                      </div>
                      <div
                        className={cn(
                          'flex items-center gap-1 text-muted-foreground',
                        )}
                      >
                        <span>{company.location}</span>
                        <span>&middot;</span>
                        <span>{company.workplaceType}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn('my-4 flex flex-row flex-wrap gap-1')}>
                    {stacks.map(({ name, icon }) => (
                      <Tooltip key={name}>
                        <TooltipTrigger asChild>
                          <div className={cn('rounded-lg bg-card p-1.5')}>
                            {icon}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  <ul className={cn('pl-0')}>
                    {accomplishments.map((accomplishment, index) => (
                      <li key={index} className={cn('my-1 leading-snug')}>
                        <span className={cn('text-muted-foreground')}>
                          {accomplishment}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            },
          )}
        </ol>
        <div className={cn('mt-12')}>
          <p className={cn('text-muted-foreground')}>
            Last updated at{' '}
            <time dateTime={lastUpdated} className={cn('font-cal')}>
              {lastUpdated}
            </time>
          </p>
        </div>
      </div>
    </>
  );
};

export default CareerJourney;
