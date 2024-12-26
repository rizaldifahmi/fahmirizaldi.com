import { Document, Email, GitHub, LinkedIn } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES, SITE } from '@/constants';
import { cn } from '@/lib/utils';

import TechStacks from './tech-stacks';

const Biography = () => {
  return (
    <>
      <p>Hi there! Thanks for visiting my digital home on the internet.</p>
      <p>
        I'm Fahmi Rizaldi, a Software Engineer with a focus on delivery
        innovative digital solutions that drive business value. I am currently
        working at <Link href="https://rskgm.bandung.go.id">RSKGM Kota Bandung</Link>
        , a well-regarded healthcare institution located in{' '}
        <Link href="https://www.google.com/maps/place/Bandung,+Jawa+Barat">
          Bandung, Indonesia
        </Link>
        , where I have the opportunity to contribute to healthcare technology
        solutions on a daily basis.
      </p>
      <p>
        I have a wealth of experience in crafting scalable software systems that
        meet both technical and business requirements, utilizing a range of
        programming languages such as{' '}
        <Link href="https://www.php.net/">PHP</Link>,{' '}
        <Link href="https://www.javascript.com/">JavaScript</Link>, and{' '}
        <Link href="https://www.typescriptlang.org/">TypeScript</Link>.
        Leveraging my proficiency in backend frameworks like{' '}
        <Link href="https://codeigniter.com/">CodeIgniter</Link>, coupled with expertise
        in frontend frameworks such as{' '}
        <Link href="https://reactjs.org/">React</Link> and{' '}
        <Link href="https://vuejs.org/">Vue</Link>, allows me to deliver
        efficient and effective software solutions that meet the unique needs of
        healthcare organizations.
      </p>
      <p>
        In my role as a Software Engineer at RSKGM Kota Bandung, I take charge
        of designing, developing, and maintaining healthcare software systems
        that meet both technical specifications and medical requirements. I
        understand the importance of delivering high-quality products that not
        only meet technical requirements but also provide tangible value to
        healthcare providers and patients. To achieve this, I work closely with
        healthcare professionals to understand their unique needs and
        requirements, and I utilize my technical expertise to deliver customized
        solutions that enhance healthcare service delivery.
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
      <p>
        If you're interested in learning more about my professional background
        and qualifications, I encourage you to review{' '}
      </p>
      <Link href={ROUTES.resume} className={cn('text-inherit')}>
        <Button variant="shadow" className={cn('gap-x-1')}>
          <Document /> My Resume
        </Button>
      </Link>

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
