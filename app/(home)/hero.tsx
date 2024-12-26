'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import Container from '@/components/shared/container';
import FlipWords from '@/components/shared/flip-words';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

import CurrentTechStack from './current-tech-stack';

const Hero = () => {
  return (
    <div className={cn('bg-grid py-16', 'lg:py-20')}>
      <Container>
        <div className={cn('font-cal')}>
          <motion.h1
            className={cn(
              'mb-4 flex flex-col justify-center gap-1 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text pb-2 text-4xl font-bold text-transparent',
              'sm:text-5xl',
              'lg:text-6xl',
            )}
            initial={{ x: -32, opacity: 0 }}
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
              'bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text font-bold text-transparent',
              'md:text-xl',
            )}
          >
            I craft{' '}
            <FlipWords
              words={['innovative', 'scalable', 'elegant', 'powerful']}
              className={cn('font-black text-primary')}
            />{' '}
            digital solutions that make an impact.
          </motion.p>
        </div>

        <div className={cn('mt-6', 'md:mt-8')}>
          <motion.div
            className={cn('relative')}
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="shadow" asChild className={cn('group')}>
              <Link href={ROUTES.about}>
                Explore more{' '}
                <ChevronRight
                  className={cn(
                    'transition-transform duration-200 group-hover:translate-x-1',
                  )}
                />
              </Link>
            </Button>
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
