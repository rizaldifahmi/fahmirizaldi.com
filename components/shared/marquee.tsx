'use client';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'up';
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  className?: string;
  loopSize?: number;
  duration?: number;
}

const Marquee = ({
  children,
  direction = 'left',
  reverse = false,
  fade = false,
  className,
  loopSize = 2,
  duration = 32,
}: MarqueeProps) => {
  const linearGradientDirectionClass =
    direction === 'left' ? 'to right' : 'to bottom';
  const animate =
    direction === 'left'
      ? { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }
      : { y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] };

  return (
    <div
      className={cn(
        'group flex gap-4 overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className,
      )}
      style={{
        '--duration': `${duration}s`,
        maskImage: fade
          ? `linear-gradient(${linearGradientDirectionClass}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fade
          ? `linear-gradient(${linearGradientDirectionClass}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
      } as React.CSSProperties}
    >
      <motion.div
        className={cn(
          'flex w-max shrink-0 gap-4 will-change-transform',
          direction === 'left' ? 'flex-row' : 'flex-col',
        )}
        animate={animate}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {Array.from({ length: loopSize }, (_, index) => (
          <div
            key={index}
            aria-hidden={index > 0}
            className={cn(
              'flex shrink-0 justify-around gap-4',
              direction === 'left' ? 'flex-row' : 'flex-col',
            )}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
