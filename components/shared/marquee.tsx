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
  const linearGradientDirectionClass =
    direction === 'left' ? 'to right' : 'to bottom';
  const animationName =
    direction === 'left' ? 'marquee-track-left' : 'marquee-track-up';

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
      <div
        className={cn(
          'marquee-track flex w-max shrink-0 gap-4 will-change-transform',
          direction === 'left' ? 'flex-row' : 'flex-col',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: `var(--duration, ${duration}s)`,
          animationIterationCount: 'infinite',
          animationName,
          animationPlayState: 'running',
          animationTimingFunction: 'linear',
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
      </div>
    </div>
  );
};

export default Marquee;
