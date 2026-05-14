'use client';

import Marquee from '@/components/shared/marquee';
import { STACKS } from '@/constants';
import { cn } from '@/lib/utils';

const STACK_ENTRIES = Object.entries(STACKS);

const TechStacks = () => {
  const sliders = Array.from({ length: 2 }, (_, index) => {
    const midpoint = Math.ceil(STACK_ENTRIES.length / 2);
    const stackSliders =
      index === 0
        ? STACK_ENTRIES
        : [...STACK_ENTRIES.slice(midpoint), ...STACK_ENTRIES.slice(0, midpoint)];

    return (
      <Marquee key={index} reverse={index === 1} fade duration={24}>
        {stackSliders.map(([title, icon], stackIndex) => (
          <div
            key={`${index}-${stackIndex}`}
            className={cn(
              'flex items-center gap-4 rounded-lg bg-card p-3 shadow-border',
            )}
          >
            {icon}
            <span>{title}</span>
          </div>
        ))}
      </Marquee>
    );
  });

  return <div className={cn('space-y-4 overflow-hidden')}>{sliders}</div>;
};

export default TechStacks;
