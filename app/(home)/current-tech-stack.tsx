'use client';

import { motion } from 'framer-motion';

import {
  JavaScript,
  CodeIgniter,
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
        className={cn('flex flex-wrap gap-2')}
      >
        {CURRENT_TECH.map(({ title, icon, hoverClass }) => (
          <Tooltip key={title}>
            <TooltipTrigger asChild>
              <motion.div
                className={cn(
                  'size-6 text-muted-foreground transition-all duration-300 ease-out',
                  hoverClass
                )}
                variants={animation}
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
