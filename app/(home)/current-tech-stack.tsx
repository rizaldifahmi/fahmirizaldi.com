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
    hide: { x: -8, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <>
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
          'inline-flex max-w-full flex-wrap gap-1.5 rounded-full border border-border/70 bg-background/70 p-1.5 shadow-sm',
          'supports-[backdrop-filter]:bg-background/55 supports-[backdrop-filter]:backdrop-blur-sm',
        )}
      >
        {CURRENT_TECH.map(({ title, icon, hoverClass }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <motion.button
                type="button"
                aria-label={title}
                className={cn(
                  'inline-flex size-9 appearance-none items-center justify-center rounded-full border border-transparent bg-transparent p-2 text-muted-foreground transition-[background-color,border-color,color,box-shadow] duration-300 ease-out',
                  'hover:border-border hover:bg-card hover:shadow-border',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  '[&_svg]:size-full',
                  hoverClass,
                )}
                variants={animation}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 1.06, y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {icon}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </>
  );
};

export default CurrentTechStack;
