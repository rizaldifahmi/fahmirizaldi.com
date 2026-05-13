'use client';

import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import useMounted from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

const ThemeSwitch = () => {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Theme switch button"
        className={cn('size-10 rounded-md opacity-0')}
        disabled
      />
    );
  }

  return (
    <ThemeTogglerButton
      variant="ghost"
      size="default"
      modes={['light', 'dark']}
      aria-label="Theme switch button"
      className={cn('size-10 bg-transparent')}
    />
  );
};

export default ThemeSwitch;
