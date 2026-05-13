import { compareDesc } from 'date-fns';
import { ChevronRight } from 'lucide-react';

import ProjectCard from '@/components/project-card';
import EmptyState from '@/components/shared/empty-state';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { allProjects, type Project } from '@/lib/content/generated';
import { cn } from '@/lib/utils';

const MAX_DISPLAY = 2;

const getHighlightedProjects = (
  maxDisplay: number = MAX_DISPLAY,
): Array<Project> =>
  allProjects
    .filter((project) => project.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxDisplay);

const HighlightedProjects = () => {
  const projects = getHighlightedProjects();

  return (
    <section
      className={cn(
        'motion-safe:animate-reveal-up will-change-[transform,opacity]',
      )}
    >
      <div className={cn('mb-4 flex flex-col')}>
        <h2 className={cn('font-cal font-bold text-primary')}>
          Highlighted Projects
        </h2>
        <p
          className={cn(
            'font-cal text-xl text-secondary-foreground',
            'md:text-2xl',
          )}
        >
          What I've been working on
        </p>
      </div>
      {projects.length ? (
        <>
          <div
            className={cn(
              'grid auto-cols-fr grid-cols-1 gap-4',
              'md:grid-cols-2',
            )}
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          <div className={cn('my-4 flex items-center justify-center')}>
            <Link href={ROUTES.projects}>
              <Button variant="outline">
                See all projects <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="The projects are probably off having a party somewhere without us!" />
      )}
    </section>
  );
};

export default HighlightedProjects;
