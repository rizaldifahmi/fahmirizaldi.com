'use client';

import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useEffect, useRef } from 'react';

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
  const x = useMotionValue(reverse ? '-50%' : '0%');
  const y = useMotionValue('0%');
  const progressRef = useRef(0);
  const isPausedRef = useRef(false);
  const linearGradientDirectionClass =
    direction === 'left' ? 'to right' : 'to bottom';

  useEffect(() => {
    progressRef.current = 0;
    const value = reverse ? '-50%' : '0%';

    if (direction === 'left') {
      x.set(value);
      y.set('0%');
      return;
    }

    x.set('0%');
    y.set(value);
  }, [direction, reverse, x, y]);

  useAnimationFrame((_, delta) => {
    if (isPausedRef.current) return;

    const step = (delta / (duration * 1000)) * 50;
    const nextProgress = (progressRef.current + step) % 50;
    const value = reverse ? nextProgress - 50 : -nextProgress;

    progressRef.current = nextProgress;

    if (direction === 'left') {
      x.set(`${value}%`);
      return;
    }

    y.set(`${value}%`);
  });

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;

    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;

    isPausedRef.current = false;
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
        style={{ x, y }}
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
