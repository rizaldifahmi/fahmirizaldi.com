'use client';

import { motion } from 'motion/react';

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
    description: 'Primary programming language',
    icon: <TypeScript />,
    hoverClass: 'hover:text-[#3178C6]',
  },
  {
    title: 'JavaScript',
    description: 'Secondary programming language',
    icon: <JavaScript />,
    hoverClass: 'hover:text-[#F7DF1E]',
  },
  {
    title: 'PHP',
    description: 'Backend development',
    icon: <PHP />,
    hoverClass: 'hover:text-[#777BB4]',
  },
  {
    title: 'Next.js',
    description: 'Frontend development',
    icon: <NextJS />,
    hoverClass: 'dark:hover:text-white hover:text-black',
  },
  {
    title: 'React.js',
    description: 'Frontend development',
    icon: <ReactJS />,
    hoverClass: 'hover:text-[#61DAFB]',
  },
  {
    title: 'CodeIgniter',
    description: 'Backend development',
    icon: <CodeIgniter />,
    hoverClass: 'hover:text-[#EE4323]',
  },
  {
    title: 'Tailwind CSS',
    description: 'Styling',
    icon: <TailwindCSS />,
    hoverClass: 'hover:text-[#06B6D4]',
  },
];

const CurrentTechStack = () => {
  const animation = {
    hide: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.38, duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-foreground/10 bg-card/75 p-4 shadow-border backdrop-blur',
        'sm:inline-block sm:min-w-[22rem]',
      )}
    >
      <motion.p
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.4 }}
        className={cn('mb-3 text-sm text-muted-foreground')}
      >
        Tech stack and tools
      </motion.p>
      <motion.div
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.5, staggerChildren: 0.025 }}
        className={cn('flex flex-wrap gap-2.5')}
      >
        {CURRENT_TECH.map(({ title, description, icon, hoverClass }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <motion.button
                type="button"
                aria-label={`${title}: ${description}`}
                className={cn(
                  'inline-flex size-10 appearance-none items-center justify-center rounded-xl border border-foreground/10 bg-background/80 p-2 text-muted-foreground transition-all duration-300 ease-out',
                  'md:size-9',
                  '[&_svg]:size-full',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  hoverClass,
                )}
                variants={animation}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {icon}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <div className={cn('space-y-0.5')}>
                <p className={cn('font-semibold')}>{title}</p>
                <p className={cn('text-xs text-muted-foreground')}>
                  {description}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CurrentTechStack;
