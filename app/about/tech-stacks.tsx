'use client';

import { useState } from 'react';

import Marquee from '@/components/shared/marquee';
import { STACKS } from '@/constants';
import { cn } from '@/lib/utils';

const TechStacks = () => {
  const [shuffledStacks, setShuffledStacks] = useState<
    Array<[string, React.ReactNode]>
  >(() => Object.entries(STACKS).sort(() => Math.random() - 0.5));

  const sliders = Array.from({ length: 2 }, (_, index) => {
    const stackSliders = [...shuffledStacks].sort(() => Math.random() - 0.5);

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
