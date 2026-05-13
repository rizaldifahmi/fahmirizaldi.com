'use client';

import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/animate-ui/components/radix/sheet';
import { NAV_LINKS } from '@/constants';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { MenuKebab } from './icons';
import Link from './link';

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild className={cn('flex', 'md:hidden')}>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <MenuKebab />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-2 bottom-2 z-50 h-auto rounded-2xl border bg-background p-0 shadow-xl',
          'md:hidden',
        )}
      >
        <SheetHeader className={cn('border-b p-4 text-left')}>
          <SheetTitle className={cn('font-cal text-lg')}>Menu</SheetTitle>
          <SheetDescription>
            Quick navigation around Fahmi's space.
          </SheetDescription>
        </SheetHeader>

        <nav className={cn('grid gap-1 p-2')}>
          {NAV_LINKS.map(({ path, label, icon }) => {
            const isActive =
              path === '/'
                ? pathname === path
                : pathname === path || pathname.startsWith(`${path}/`);

            return (
              <SheetClose key={path} asChild>
                <Link
                  href={path}
                  className={cn(
                    'group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors duration-150',
                    'hover:bg-accent hover:text-accent-foreground',
                    {
                      'bg-accent text-accent-foreground': isActive,
                    },
                  )}
                >
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-lg bg-background shadow-border transition-transform duration-200',
                      'group-hover:scale-105',
                    )}
                  >
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
