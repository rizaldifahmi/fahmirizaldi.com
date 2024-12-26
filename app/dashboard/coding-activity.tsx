'use client';

import { formatDistanceToNow } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';

import { WakaTime } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import Progress from '@/components/shared/progress';
import useStats from '@/hooks/use-stats';
import { cn, formatDate } from '@/lib/utils';
import type { CodingActivityStats } from '@/types/stats';
import type { WakaTimeSummary } from '@/types/wakatime';

import OverviewCard from './overview-card';
import Section from './section';

const CodingActivity = () => {
  const { data, isLoading } = useStats<CodingActivityStats>('wakatime');
  const [formattedLastModifiedDate, setFormattedLastModifiedDate] = useState<
    string | null
  >(null);

  useEffect(() => {
    const formatLastModified = (): void => {
      const lastModifiedDate = data?.modified_at;

      if (lastModifiedDate) {
        const zonedDate = toZonedTime(
          fromZonedTime(lastModifiedDate, 'Asia/Jakarta'),
          'Asia/Jakarta',
        );

        const distanceToNow = formatDistanceToNow(zonedDate, {
          addSuffix: true,
        });

        setFormattedLastModifiedDate(distanceToNow);
      }
    };

    formatLastModified();
  }, [data]);

  // TODO: will fix later
  // const startDate = data?.start ? formatDate(data?.start) : 'N/A';
  // const endDate = data?.end ? formatDate(data?.end) : 'N/A';
  const dailyAverage =
    data?.human_readable_daily_average_including_other_language ?? 'N/A';
  const thisWeekTotal =
    data?.human_readable_total_including_other_language ?? 'N/A';
  const bestDayDate = data?.best_day?.date;
  const bestDayText = data?.best_day?.text;
  const bestDay = bestDayDate
    ? `${formatDate(bestDayDate)} (${bestDayText})`
    : 'N/A';
  const allTimeSinceToday = data?.all_time_since_today?.text ?? 'N/A';

  const languages = data?.languages ?? [];
  const editors = data?.editors ?? [];

  const activities: Array<{
    title: string;
    data: WakaTimeSummary[];
    className: string;
  }> = [
    {
      title: 'Languages',
      data: languages,
      className: 'bg-rainbow-gradient-inverse',
    },
    {
      title: 'Editors',
      data: editors,
      className: 'bg-rainbow-gradient',
    },
  ];

  return (
    <Section
      title="Weekly Coding Activities"
      icon={<WakaTime />}
      description="My WakaTime last 7 days stats."
      isLoading={isLoading}
      appendix={
        <Link
          className={cn('text-muted-foreground hover:text-foreground')}
          href="https://wakatime.com/@fahmirizaldi"
        >
          Last modified:{' '}
          {formattedLastModifiedDate ? (
            <span>{formattedLastModifiedDate}</span>
          ) : (
            'N/A'
          )}
        </Link>
      }
    >
      <div className={cn('flex flex-col gap-4')}>
        <div className={cn('grid gap-3 py-2', 'md:grid-cols-2')}>
          {/* <OverviewCard label="Start Date" value={startDate} /> */}
          {/* <OverviewCard label="End Date" value={endDate} /> */}
          <OverviewCard label="Daily Coding Average" value={dailyAverage} />
          <OverviewCard label="This Week Coding Time" value={thisWeekTotal} />
          <OverviewCard label="Best Day Coding Time" value={bestDay} />
          <OverviewCard
            label="All Time Coding Time"
            value={allTimeSinceToday}
          />
        </div>

        <div className={cn('flex flex-col gap-4', 'sm:flex-row')}>
          {activities.map((activity) => (
            <div
              key={activity.title}
              className={cn(
                'relative flex flex-1 flex-col gap-2 rounded-xl p-0.5',
                activity.className,
              )}
            >
              <div className={cn('size-full rounded-xl bg-background')}>
                <p
                  className={cn(
                    'absolute -top-3 left-3 bg-background px-2 font-cal',
                  )}
                >
                  {activity.title}
                </p>
                <ul className={cn('flex flex-col gap-1 px-4 py-3')}>
                  {activity.data.map((item) => (
                    <li key={item.name}>
                      <Progress
                        data={item}
                        className={cn(
                          'bg-gradient-to-r from-pink-400 via-blue-500 to-purple-600',
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CodingActivity;
