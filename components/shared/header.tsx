'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { NAV_LINKS } from '@/constants';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

import LogoDark from '../../assets/images/logo-dark.svg';
import LogoLight from '../../assets/images/logo-light.svg';
import { Separator } from '../ui/separator';
import CommandPalette from './command-palette';
import Container from './container';
import Link from './link';
import MobileMenu from './mobile-menu';
import ThemeSwitch from './theme-switch';

const Header = () => {
  const isScrolled = useScroll();
  const pathname = usePathname();
  const { resolvedTheme: theme } = useTheme();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 bg-background transition-colors duration-200',
        isScrolled ? 'shadow-sm' : 'saturate-110',
      )}
    >
      <Container>
        <div className={cn('flex h-full flex-1 items-center justify-between')}>
          <div className={cn('flex items-center gap-4')}>
            <Link
              href="/"
              className={cn('flex items-center justify-center gap-2')}
            >
              {theme === 'dark' ? (
                <Image
                  src={LogoDark}
                  alt="Fahmi Rizaldi"
                  className={cn('h-7 w-auto')}
                  priority
                />
              ) : (
                <Image
                  src={LogoLight}
                  alt="Fahmi Rizaldi"
                  className={cn('h-7 w-auto')}
                  priority
                />
              )}
              <span
                className={cn(
                  'hidden font-extrabold tracking-tight',
                  'md:flex',
                )}
              >
                Fahmi Rizaldi
              </span>
            </Link>
            <nav className={cn('hidden', 'md:flex')}>
              <ul className={cn('flex', 'md:gap-x-0.5')}>
                {NAV_LINKS.filter(
                  ({ onlyShowOnDropdownMenu }) => !onlyShowOnDropdownMenu,
                ).map(({ path, label }) => {
                  const isActive =
                    path === '/'
                      ? pathname === path
                      : pathname === path || pathname.startsWith(`${path}/`);

                  return (
                    <li key={path} className={cn('relative')}>
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className={cn(
                            'absolute inset-0 rounded-md bg-accent shadow-sm',
                          )}
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      <Link
                        href={path}
                        className={cn(
                          'relative z-10 flex items-center rounded px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 hover:text-foreground',
                          isActive
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className={cn('flex items-center gap-1')}>
            <Separator orientation="vertical" className={cn('h-6')} />
            <ThemeSwitch />
            <CommandPalette />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
