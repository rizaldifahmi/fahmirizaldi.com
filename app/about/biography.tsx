import { Document, Email, GitHub, LinkedIn } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES, SITE } from '@/constants';
import { cn } from '@/lib/utils';

import TechStacks from './tech-stacks';

const Biography = () => {
  return (
    <>
      <p>
        Hi, I'm Fahmi Rizaldi — a Software Engineer who enjoys turning complex
        problems into simple, reliable products.
      </p>
      <p>
        My work is primarily in healthcare technology. I've contributed at{' '}
        <Link href="https://rskgm.bandung.go.id">RSKGM Kota Bandung</Link> in{' '}
        <Link href="https://www.google.com/maps/place/Bandung,+Jawa+Barat">Bandung</Link>
        , Indonesia, and I currently work at{' '}
        <Link href="https://www.bih.id">Bali International Hospital</Link>,
        where I focus on software that improves operational efficiency and care
        delivery.
      </p>
      <p>
        I design and ship scalable systems with a pragmatic approach: clear
        boundaries, strong fundamentals, and maintainable code. I work across{' '}
        <Link href="https://www.php.net/">PHP</Link>,{' '}
        <Link href="https://www.javascript.com/">JavaScript</Link>, and{' '}
        <Link href="https://www.typescriptlang.org/">TypeScript</Link> — using{' '}
        <Link href="https://codeigniter.com/">CodeIgniter</Link> on the backend
        and <Link href="https://reactjs.org/">React</Link> /{' '}
        <Link href="https://vuejs.org/">Vue</Link> on the frontend — to deliver
        reliable products that teams can iterate on with confidence.
      </p>
      <p>
        I collaborate closely with clinicians and stakeholders, translating
        real-world workflows into safe, efficient digital solutions that meet
        both technical constraints and regulatory needs — with measurable impact
        for providers and patients.
      </p>
      <p>
        Outside of work, I explore new technologies, tinker with side projects,
        and recharge with games and music.
      </p>
      <p>
        I consider myself a curious and inquisitive person, always eager to
        learn and improve my skills. In my free time, I enjoy working on
        personal side projects, as it provides me with an opportunity to explore
        new technologies and further my knowledge and expertise. I am also a
        continuous learner, and I actively seek out new learning opportunities
        in order to stay up-to-date with the latest industry advancements.
      </p>
      <p>
        Besides hacking, I also have a strong appreciation for video games and
        music. I find that these activities provide an important balance to my
        professional life, allowing me to relax and recharge after a long day at
        work. I believe that maintaining a healthy work-life balance is is the
        key to keeping both my code and my spirits bug-free! 🎮🎶
      </p>
      {/* Resume button moved to About page header section */}

      <h2 className={cn('font-cal text-2xl', 'lg:text-3xl')}>Tech Stack</h2>
      <TechStacks />

      <h2 className={cn('font-cal text-2xl', 'lg:text-3xl')}>Let's Connect</h2>
      <p>
        Questions or collaborations? Reach out to me at{' '}
        <Link
          href={`mailto:${SITE.author.email}?subject=Hi Fahmi!`}
          className={cn('underline')}
        >
          {SITE.author.email}
        </Link>{' '}
        or connect through social media. Let's build something amazing together!
      </p>
      <div className={cn('my-2 flex items-center gap-4')}>
        <Link
          href={SITE.author.github.url}
          className={cn(
            'text-muted-foreground transition-colors duration-200',
            'hover:text-foreground',
          )}
        >
          <GitHub className={cn('size-5')} />
        </Link>
        <Link
          href={SITE.author.linkedIn}
          className={cn(
            'text-muted-foreground transition-colors duration-200',
            'hover:text-foreground',
          )}
        >
          <LinkedIn className={cn('size-5')} />
        </Link>
        <Link
          href={`mailto:${SITE.author.email}?subject=Hi Fahmi!`}
          className={cn(
            'text-muted-foreground transition-colors duration-200',
            'hover:text-foreground',
          )}
        >
          <Email className={cn('size-5')} />
        </Link>
      </div>
    </>
  );
};

export default Biography;
