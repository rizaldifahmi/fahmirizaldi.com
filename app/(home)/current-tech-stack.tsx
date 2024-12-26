'use client';

import { motion } from 'framer-motion';

import {
  JavaScript,
  Laravel,
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
  },
  {
    title: 'JavaScript',
    description: 'Secondary programming language',
    icon: <JavaScript />,
  },
  {
    title: 'PHP',
    description: 'Backend development',
    icon: <PHP />,
  },
  {
    title: 'Next.js',
    description: 'Frontend development',
    icon: <NextJS />,
  },
  {
    title: 'React.js',
    description: 'Frontend development',
    icon: <ReactJS />,
  },
  {
    title: 'Laravel',
    description: 'Backend development',
    icon: <Laravel />,
  },
  {
    title: 'Tailwind CSS',
    description: 'Styling',
    icon: <TailwindCSS />,
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
        className={cn('flex flex-wrap gap-2')}
      >
        {CURRENT_TECH.map(({ title, icon }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <motion.div
                className={cn(
                  'size-6 text-muted-foreground transition duration-200',
                )}
                variants={animation}
              >
                {icon}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </>
  );
};

export default CurrentTechStack;
