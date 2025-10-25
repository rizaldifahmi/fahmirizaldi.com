'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

const ScrollToTop = () => {
  const isScrolled = useScroll(100);

  const scrollToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            'fixed bottom-32 right-4 z-50',
            'md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2',
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              'rounded-full shadow-md',
              'hover:shadow-lg',
            )}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className={cn('size-4')} />
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollToTop; 