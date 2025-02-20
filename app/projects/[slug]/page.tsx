import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cloneElement } from 'react';

import { allProjects } from '@/.contentlayer/generated';
import Container from '@/components/shared/container';
import { GitHub } from '@/components/shared/icons';
import Link from '@/components/shared/link';
import Mdx from '@/components/shared/mdx';
import RenderIf from '@/components/shared/render-if';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ROUTES } from '@/constants';
import { STACKS } from '@/constants';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';
import type { Stack } from '@/types/stack';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return seo({
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
      url: `${ROUTES.projects}/${params.slug}`,
    });
  }

  return seo({
    title: project.title,
    description: project.description,
    url: `${ROUTES.projects}/${params.slug}`,
  });
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <article className={cn('mx-auto max-w-5xl py-8')}>
        <div className={cn('mb-8')}>
          <h1 className={cn('font-cal text-3xl font-bold', 'md:text-4xl')}>
            {project.title}
          </h1>
          <p className={cn('mt-4 text-lg text-muted-foreground')}>
            {project.description}
          </p>
          
          <RenderIf isTrue={project.deprecated}>
            <div className={cn('mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4')}>
              <div className={cn('flex items-center gap-2')}>
                <span className={cn('rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground')}>
                  Deprecated
                </span>
                <p className={cn('text-sm text-destructive dark:text-destructive-foreground')}>{project.deprecatedReason}</p>
              </div>
            </div>
          </RenderIf>
          
          <div className={cn('mt-6 flex flex-wrap gap-4')}>
            <RenderIf isTrue={Boolean(project.url)}>
              <Link href={project.url ?? ''}>
                <Button variant="outline">
                  Visit Website <ExternalLink className={cn('ml-2 size-4')} />
                </Button>
              </Link>
            </RenderIf>
            
            <RenderIf isTrue={Boolean(project.repositoryUrl)}>
              <Link href={project.repositoryUrl ?? ''}>
                <Button variant="outline">
                  Source Code <GitHub className={cn('ml-2')} />
                </Button>
              </Link>
            </RenderIf>
          </div>

          <RenderIf isTrue={Boolean(project.stacks?.length)}>
            <div className={cn('mt-6')}>
              <h2 className={cn('mb-3 font-cal text-xl font-bold')}>Tech Stack</h2>
              <div className={cn('flex flex-wrap items-end gap-3')}>
                {project.stacks?.map((stack, idx) => {
                  const stackIcon = STACKS[stack as keyof Stack];
                  if (!stackIcon) return null;
                  
                  return (
                    <Tooltip key={`${stack}-${idx}`}>
                      <TooltipTrigger asChild>
                        {cloneElement(stackIcon, {
                          className: cn(
                            'size-6',
                            (stackIcon as any)?.props?.className,
                          ),
                        })}
                      </TooltipTrigger>
                      <TooltipContent>{stack}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </RenderIf>
        </div>

        <RenderIf isTrue={Boolean(project.image)}>
          <div className={cn('relative mb-8 aspect-video w-full overflow-hidden rounded-xl')}>
            <Image
              src={project.image ?? ''}
              alt={project.title}
              fill
              className={cn('object-cover')}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </RenderIf>

        <div className={cn(
          'prose max-w-none',
          'dark:prose-invert prose-headings:font-cal prose-h2:text-2xl prose-h3:text-xl',
          'prose-strong:font-bold prose-strong:text-foreground dark:prose-strong:text-foreground',
        )}>
          <Mdx code={project.body.code} />
        </div>
      </article>
    </Container>
  );
} 