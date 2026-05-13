'use client';

import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

import { LiquidButton } from '@/components/animate-ui/components/buttons/liquid';
import Container from '@/components/shared/container';
import FlipWords from '@/components/shared/flip-words';
import Link from '@/components/shared/link';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

import CurrentTechStack from './current-tech-stack';

const Hero = () => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-grid py-12',
        'sm:py-16',
        'lg:py-20',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-28 top-8 size-72 rounded-full bg-gradient-to-br from-primary/35 via-sky-400/20 to-pink-400/25 opacity-80 blur-3xl',
          'sm:size-96',
          'dark:opacity-60',
        )}
      />
      <motion.div
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-4 top-20 size-28 rounded-full border border-primary/20',
          'sm:left-auto sm:right-1/4 sm:size-36',
        )}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
      />
      <Container className={cn('relative')}>
        <div className={cn('max-w-4xl font-cal')}>
          <motion.h1
            className={cn(
              'mb-4 flex flex-col justify-center gap-1 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text pb-2 text-4xl font-bold leading-[0.98] text-transparent',
              'sm:text-5xl',
              'lg:text-6xl',
            )}
            initial={{ y: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span>
              Hi, I'm{' '}
              <span className={cn('text-primary')}>Fahmi Rizaldi</span>
            </span>
            <span>Software Engineer</span>
          </motion.h1>
          <motion.p
            className={cn(
              'max-w-2xl bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text font-bold text-transparent',
              'text-lg',
              'md:text-xl',
            )}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            I craft{' '}
            <FlipWords
              words={['innovative', 'scalable', 'elegant', 'powerful']}
              className={cn('font-black text-primary')}
            />{' '}
            digital solutions that make an impact.
          </motion.p>
        </div>

        <div className={cn('mt-6 flex flex-wrap gap-3', 'md:mt-8')}>
          <motion.div
            className={cn('relative')}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <LiquidButton asChild className={cn('group h-11 px-5')}>
              <Link href={ROUTES.about}>
                Explore more{' '}
                <ChevronRight
                  className={cn(
                    'transition-transform duration-200 group-hover:translate-x-1',
                  )}
                />
              </Link>
            </LiquidButton>
          </motion.div>
        </div>

        <div className={cn('mt-16', 'lg:mt-20')}>
          <CurrentTechStack />
        </div>
      </Container>
    </div>
  );
};

export default Hero;
