'use client';

import { motion, useAnimationControls } from 'motion/react';
import { useEffect, useMemo } from 'react';

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
  pauseOnHover = false,
  reverse = false,
  fade = false,
  className,
  loopSize = 2,
  duration = 32,
}: MarqueeProps) => {
  const controls = useAnimationControls();
  const linearGradientDirectionClass =
    direction === 'left' ? 'to right' : 'to bottom';
  const animate = useMemo(
    () =>
      direction === 'left'
        ? { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }
        : { y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] },
    [direction, reverse],
  );
  const transition = useMemo(
    () => ({
      duration,
      ease: 'linear' as const,
      repeat: Infinity,
      repeatType: 'loop' as const,
    }),
    [duration],
  );

  useEffect(() => {
    controls.start({ ...animate, transition });
  }, [animate, controls, transition]);

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;

    controls.stop();
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;

    controls.start({ ...animate, transition });
  };

  return (
    <div
      className={cn(
        'group flex gap-4 overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        animate={controls}
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
