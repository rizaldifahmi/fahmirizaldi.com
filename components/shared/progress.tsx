'use client';

import { motion } from 'framer-motion';

import useMounted from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

import RenderIf from './render-if';

const Progress = ({
  data,
  className,
  items,
}: {
  data: { name: string; percent?: number; total_seconds: number };
  className?: string;
  items?: Array<{ total_seconds: number }>;
}) => {
  const { name, total_seconds } = data;

  const totalSeconds = items?.reduce((acc, curr) => acc + curr.total_seconds, 0) || 0;
  const percent = totalSeconds > 0 ? (total_seconds / totalSeconds) * 100 : 0;

  const variants = {
    initial: { width: 0 },
    animate: {
      width: `${percent}%`,
      transition: { delay: 0.8 },
    },
  };

  const isMounted = useMounted();

  const formattedPercent = percent < 1 ? percent.toFixed(1) : percent.toFixed(0);

  return (
    <RenderIf isTrue={isMounted}>
      <div className={cn('flex items-center justify-between gap-3')}>
        <div className={cn('w-24')}>{name}</div>
        <div
          className={cn(
            'relative flex h-3 flex-1 justify-center rounded-full bg-muted',
          )}
        >
          <motion.span
            initial="initial"
            animate="animate"
            variants={variants}
            className={cn(
              'absolute left-0 top-0 h-3 rounded-full px-3',
              className,
            )}
          >
            &ensp;
          </motion.span>
        </div>
        <div className={cn('w-8 text-right')}>{formattedPercent}%</div>
      </div>
    </RenderIf>
  );
};

export default Progress;
