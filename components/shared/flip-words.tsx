'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const FlipWords = ({
  words,
  duration = 1000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const [currentWord, setCurrentWord] = useState<string>(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] ?? words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (isAnimating) return;

    const timeout = window.setTimeout(() => {
      startAnimation();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [isAnimating, startAnimation, duration]);

  const letters = currentWord.split('');

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: isMobile ? -10 : -40,
          x: isMobile ? 0 : 40,
          filter: isMobile ? 'none' : 'blur(8px)',
          scale: isMobile ? 0.98 : 2,
          position: 'absolute',
        }}
        className={cn('relative z-10 inline-block text-left', className)}
        key={currentWord}
      >
        {isMobile
          ? currentWord
          : letters.map((letter, index) => (
              <motion.span
                key={currentWord + index}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FlipWords;
