'use client';

import { Rocket } from 'lucide-react';
import { motion } from 'motion/react';

import { LiquidButton } from '@/components/animate-ui/components/buttons/liquid';
import Link from '@/components/shared/link';
import { SITE } from '@/constants';
import { cn } from '@/lib/utils';

const GetInTouch = () => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={cn('relative overflow-hidden rounded-xl bg-card p-6 shadow-border', 'sm:p-8')}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-gradient-to-br from-primary/30 via-sky-400/15 to-pink-400/20 opacity-70 blur-3xl',
          'dark:opacity-50',
        )}
      />
      <div className={cn('relative flex items-center gap-2')}>
        <Rocket className={cn('text-primary')} />
        <h3
          className={cn(
            'font-cal text-lg font-bold text-card-foreground',
            'md:text-xl',
          )}
        >
          Let's work together!
        </h3>
      </div>
      <p className={cn('relative mt-2 text-muted-foreground')}>
        I'm available for freelance projects and would love to explore potential
        collaborations. Feel free to email me, and let's discuss how we can work
        together!
      </p>
      <LiquidButton asChild className={cn('relative mt-5 h-11 px-5')}>
        <Link href={`mailto:${SITE.author.email}?subject=Hi Fahmi!`}>
          Get in touch
        </Link>
      </LiquidButton>
    </motion.div>
  );
};

export default GetInTouch;
