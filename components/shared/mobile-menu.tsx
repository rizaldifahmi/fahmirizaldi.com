'use client';

import { motion } from 'motion/react';
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
        className={cn(
          'fixed inset-x-2 bottom-2 z-50 h-auto rounded-2xl border bg-background/95 p-0 shadow-2xl backdrop-blur',
          'md:hidden',
        )}
      >
        <SheetHeader className={cn('border-b p-4 text-left')}>
          <SheetTitle className={cn('font-cal text-lg')}>Menu</SheetTitle>
          <SheetDescription>
            Quick navigation around Fahmi's space.
          </SheetDescription>
        </SheetHeader>

        <motion.nav
          className={cn('grid gap-1 p-2')}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.035,
              },
            },
          }}
        >
          {NAV_LINKS.map(({ path, label, icon }) => {
            const isActive =
              path === '/'
                ? pathname === path
                : pathname === path || pathname.startsWith(`${path}/`);

            return (
              <motion.div
                key={path}
                variants={{
                  hidden: { y: 10, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
              >
                <SheetClose asChild>
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
                    {isActive && (
                      <motion.span
                        layoutId="mobile-nav-active-pill"
                        className={cn(
                          'absolute inset-0 -z-10 rounded-xl bg-accent',
                        )}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
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
              </motion.div>
            );
          })}
        </motion.nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
