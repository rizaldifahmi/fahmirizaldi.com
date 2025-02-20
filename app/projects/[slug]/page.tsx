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
import { ChevronLeft } from 'lucide-react';

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
      <article className={cn('mx-auto max-w-5xl py-12')}>
        {/* Back Button */}
        <div className={cn('mb-8')}>
          <Link href={ROUTES.projects} className={cn('group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground')}>
            <ChevronLeft className={cn('size-4 transition-transform group-hover:-translate-x-1')} />
            Kembali ke Projects
          </Link>
        </div>

        {/* Header Section */}
        <header className={cn('mb-12 space-y-8')}>
          <div className={cn('space-y-4')}>
            <h1 className={cn(
              'font-cal text-4xl font-bold tracking-tight',
              'md:text-5xl lg:text-6xl'
            )}>
              {project.title}
            </h1>
            <p className={cn('text-xl text-muted-foreground leading-relaxed max-w-3xl')}>
              {project.description}
            </p>
          </div>
          
          <RenderIf isTrue={project.deprecated}>
            <div className={cn('rounded-xl border border-destructive/50 bg-destructive/10 p-6')}>
              <div className={cn('flex items-start gap-3')}>
                <span className={cn('rounded-md bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground')}>
                  Deprecated
                </span>
                <p className={cn('text-base text-destructive dark:text-destructive-foreground')}>{project.deprecatedReason}</p>
              </div>
            </div>
          </RenderIf>
          
          <div className={cn('flex flex-col gap-6 sm:flex-row sm:items-center')}>
            <div className={cn('flex flex-wrap gap-4')}>
              <RenderIf isTrue={Boolean(project.url)}>
                <Link href={project.url ?? ''}>
                  <Button size="lg" variant="default">
                    Visit Website <ExternalLink className={cn('ml-2 size-4')} />
                  </Button>
                </Link>
              </RenderIf>
              
              <RenderIf isTrue={Boolean(project.repositoryUrl)}>
                <Link href={project.repositoryUrl ?? ''}>
                  <Button size="lg" variant="outline">
                    Source Code <GitHub className={cn('ml-2')} />
                  </Button>
                </Link>
              </RenderIf>
            </div>

            <RenderIf isTrue={Boolean(project.stacks?.length)}>
              <div className={cn('flex items-center gap-4', {
                'border-l pl-4 sm:ml-4': Boolean(project.url) || Boolean(project.repositoryUrl)
              })}>
                <span className={cn('text-sm font-medium text-muted-foreground')}>Built with:</span>
                <div className={cn('flex flex-wrap items-center gap-3')}>
                  {project.stacks?.map((stack, idx) => {
                    const stackIcon = STACKS[stack as keyof Stack];
                    if (!stackIcon) return null;
                    
                    return (
                      <Tooltip key={`${stack}-${idx}`}>
                        <TooltipTrigger asChild>
                          <div className={cn('group flex items-center gap-2 rounded-lg border bg-background p-2 transition-colors hover:bg-muted')}>
                            {cloneElement(stackIcon, {
                              className: cn(
                                'size-5',
                                (stackIcon as any)?.props?.className,
                              ),
                            })}
                            <span className={cn('text-xs font-medium')}>{stack}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{stack}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </RenderIf>
          </div>
        </header>

        <RenderIf isTrue={Boolean(project.image)}>
          <div className={cn('mb-12')}>
            <div className={cn('relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-lg')}>
              <Image
                src={project.image ?? ''}
                alt={project.title}
                fill
                className={cn('object-cover transition-transform duration-500 hover:scale-105')}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </RenderIf>

        <div className={cn(
          'prose max-w-none',
          'dark:prose-invert',
          'prose-headings:font-cal prose-headings:tracking-tight',
          'prose-h2:text-3xl prose-h3:text-2xl',
          'prose-p:text-base prose-p:leading-relaxed',
          'prose-strong:font-bold prose-strong:text-foreground dark:prose-strong:text-foreground',
          'prose-pre:rounded-xl prose-pre:border prose-pre:bg-muted',
          'prose-img:rounded-xl prose-img:border prose-img:bg-muted',
        )}>
          <Mdx code={project.body.code} />
        </div>
      </article>
    </Container>
  );
} 