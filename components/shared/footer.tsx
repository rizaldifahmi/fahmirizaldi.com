'use client';

import { FOOTER_ICON_LINKS, FOOTER_LINKS, SITE } from '@/constants';
import { cn } from '@/lib/utils';

import Container from './container';
import Link from './link';
import NowPlaying from './now-playing';

const Footer = () => {
  return (
    <footer className={cn('bg-grid mb-10 mt-24 pt-16 text-sm')}>
      <Container>
        <nav className={cn('mb-8 grid grid-cols-2 gap-y-2', 'sm:grid-cols-3')}>
          {FOOTER_LINKS.map((groups, index) => (
            <div
              key={`footerGroup${index}`}
              className={cn('flex flex-col items-start gap-2')}
            >
              {groups.map(({ title, path }) => (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    'font-medium text-muted-foreground transition-colors duration-200',
                    'hover:text-foreground',
                  )}
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </Container>
      <div className={cn('md:hidden')}>
        <Container>
          <NowPlaying />
        </Container>
      </div>
      <Container>
        <div className={cn('flex items-center justify-between gap-4')}>
          <div className={cn('font-medium')}>
            &copy; {new Date().getFullYear()}{' '}
            <Link href="/">{SITE.author.name}</Link> ——{' '}
            <em className={cn('text-muted-foreground')}>currently in Denpasar, Bali, Indonesia</em>
          </div>
          <div className={cn('flex gap-4')}>
            {FOOTER_ICON_LINKS.map(({ title, url, icon, className }, index) => (
              <Link
                key={`footerIcon-${title}-${index}`}
                href={url}
                title={title}
                className={cn(
                  'text-muted-foreground transition-colors duration-200 ease-out',
                  className,
                )}
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
