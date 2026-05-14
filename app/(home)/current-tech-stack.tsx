'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import {
  CodeIgniter,
  JavaScript,
  NextJS,
  PHP,
  ReactJS,
  TailwindCSS,
  TypeScript,
} from '@/components/shared/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const CURRENT_TECH = [
  {
    title: 'TypeScript',
    description: 'Typed foundation for safer interfaces and APIs',
    icon: <TypeScript />,
    hoverClass: 'hover:text-[#3178C6]',
    activeClass: 'text-[#3178C6]',
  },
  {
    title: 'JavaScript',
    description: 'Runtime glue for interactive product details',
    icon: <JavaScript />,
    hoverClass: 'hover:text-[#F7DF1E]',
    activeClass: 'text-[#F7DF1E]',
  },
  {
    title: 'PHP',
    description: 'Reliable server-side work for business systems',
    icon: <PHP />,
    hoverClass: 'hover:text-[#777BB4]',
    activeClass: 'text-[#777BB4]',
  },
  {
    title: 'Next.js',
    description: 'Full-stack React framework for web apps',
    icon: <NextJS />,
    hoverClass: 'dark:hover:text-white hover:text-black',
    activeClass: 'text-black dark:text-white',
  },
  {
    title: 'React.js',
    description: 'Composable interfaces and client-side interactions',
    icon: <ReactJS />,
    hoverClass: 'hover:text-[#61DAFB]',
    activeClass: 'text-[#61DAFB]',
  },
  {
    title: 'CodeIgniter',
    description: 'Pragmatic backend framework for fast delivery',
    icon: <CodeIgniter />,
    hoverClass: 'hover:text-[#EE4323]',
    activeClass: 'text-[#EE4323]',
  },
  {
    title: 'Tailwind CSS',
    description: 'Design system styling without leaving markup',
    icon: <TailwindCSS />,
    hoverClass: 'hover:text-[#06B6D4]',
    activeClass: 'text-[#06B6D4]',
  },
];

const CurrentTechStack = () => {
  const [activeTitle, setActiveTitle] = useState(CURRENT_TECH[0]?.title);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const pausedUntilRef = useRef(0);

  const animation = {
    hide: { x: -8, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  const activeTech =
    CURRENT_TECH.find((tech) => tech.title === activeTitle) ?? CURRENT_TECH[0];

  const pauseAutoRotate = () => {
    pausedUntilRef.current = Date.now() + 4500;
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current || openTooltip) return;

      setActiveTitle((current) => {
        const currentIndex = CURRENT_TECH.findIndex(
          (tech) => tech.title === current,
        );
        const nextIndex = (currentIndex + 1) % CURRENT_TECH.length;

        return CURRENT_TECH[nextIndex]?.title;
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, [openTooltip]);

  return (
    <div className={cn('max-w-md')}>
      <motion.p
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.4 }}
        className={cn('mb-2 text-sm text-muted-foreground')}
      >
        Tech stack and tools
      </motion.p>
      <motion.div
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.5, staggerChildren: 0.015 }}
        className={cn(
          'inline-flex max-w-full flex-wrap gap-1.5 rounded-xl border border-dashed border-border bg-background/65 p-1.5',
        )}
      >
        {CURRENT_TECH.map(
          ({ title, description, icon, hoverClass, activeClass }) => {
          const isActive = activeTech?.title === title;

          return (
            <Tooltip
              key={title}
              open={openTooltip === title}
              onOpenChange={(open) => setOpenTooltip(open ? title : null)}
            >
              <TooltipTrigger asChild>
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label={`${title}: ${description}`}
                  aria-pressed={isActive}
                  onClick={() => {
                    pauseAutoRotate();
                    setActiveTitle(title);
                    setOpenTooltip((current) =>
                      current === title ? null : title,
                    );
                  }}
                  onMouseEnter={() => {
                    pauseAutoRotate();
                    setActiveTitle(title);
                  }}
                  className={cn(
                    'inline-flex size-8 cursor-pointer appearance-none items-center justify-center rounded-lg border border-transparent bg-transparent p-1.5 text-muted-foreground transition-[background-color,border-color,color,box-shadow] duration-200 ease-out',
                    'hover:border-border hover:bg-card hover:shadow-border',
                    isActive && 'border-border bg-card shadow-border',
                    isActive && activeClass,
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    '[&_svg]:size-full',
                    hoverClass,
                  )}
                  variants={animation}
                >
                  {icon}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>{title}</TooltipContent>
            </Tooltip>
          );
        })}
      </motion.div>
      <motion.div
        key={activeTech?.title}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16 }}
        className={cn('mt-2 text-sm text-muted-foreground')}
      >
        <span className={cn('font-cal text-foreground')}>
          {activeTech?.title}
        </span>{' '}
        <span>{activeTech?.description}</span>
      </motion.div>
    </div>
  );
};

export default CurrentTechStack;
