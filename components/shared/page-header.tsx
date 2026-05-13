import { motion } from 'motion/react';
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import Container from './container';

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  centered?: boolean;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, centered = false, className, ...props }, ref) => {
    const animation = {
      hide: centered ? { y: 32, opacity: 0 } : { x: -32, opacity: 0 },
      show: centered ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 },
    };

    return (
      <div
        className={cn(
          'relative overflow-hidden bg-grid py-8',
          'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_15%,hsl(var(--primary)/0.14),transparent_26%),linear-gradient(90deg,transparent,hsl(var(--primary)/0.08),transparent)]',
          'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border after:to-transparent',
          'lg:py-12',
          className,
        )}
        {...props}
        ref={ref}
      >
        <Container
          className={cn('pointer-events-none relative select-none overflow-hidden', {
            'text-center': centered,
          })}
        >
          <motion.div
            initial={animation.hide}
            animate={animation.show}
            transition={{ delay: 0.1 }}
          >
            <h1
              className={cn(
                'pb-2 font-cal text-4xl font-bold',
                'md:text-5xl',
                'lg:text-6xl',
              )}
            >
              {title}
            </h1>
          </motion.div>
          {description && (
            <motion.div
              initial={animation.hide}
              animate={animation.show}
              transition={{ delay: 0.2 }}
            >
              <p className={cn('mt-2 font-cal text-lg')}>{description}</p>
            </motion.div>
          )}
        </Container>
      </div>
    );
  },
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
