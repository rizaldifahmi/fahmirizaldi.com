import Image from 'next/image';
import { cloneElement, useMemo } from 'react';

import type { Project } from '@/.contentlayer/generated';
import { ROUTES, STACKS } from '@/constants';
import { cn } from '@/lib/utils';
import type { Stack } from '@/types/stack';

import Link from './shared/link';
import RenderIf from './shared/render-if';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const ProjectCard = ({ project }: { project: Project }) => {
  const {
    _id,
    title,
    description,
    slug,
    image,
    imageMeta,
    url,
    playStoreUrl,
    stacks,
  } = project;

  const extraImageProps = useMemo(() => {
    if (image && imageMeta?.blur64) {
      return { placeholder: 'blur', blurDataURL: imageMeta?.blur64 } as {
        placeholder: 'blur' | 'empty';
        blurDataURL?: string;
      };
    }

    return {};
  }, [image, imageMeta]);

  let projectUrl = url ?? `${ROUTES.projects}/${slug}`;
  if (playStoreUrl) projectUrl = playStoreUrl;

  return (
    <Link
      key={_id}
      href={projectUrl}
      className={cn(
        'group rounded-xl bg-card shadow-border transition-colors duration-200',
      )}
    >
      <div
        className={cn(
          'relative aspect-video w-full overflow-hidden bg-cover bg-no-repeat',
        )}
      >
        <div className={cn('absolute h-full w-full')} />
        <Image
          src={image ?? ''}
          alt={title}
          fill
          className={cn('rounded-t-xl object-cover')}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          {...extraImageProps}
        />
      </div>
      <div
        className={cn(
          'flex flex-col p-4 transition-transform duration-200 ease-out',
          'group-hover:translate-x-0.5',
        )}
      >
        <h2
          className={cn(
            'font-cal text-lg font-bold text-card-foreground',
            'md:text-xl',
          )}
        >
          {title}
        </h2>
        <p className={cn('mt-2 text-muted-foreground')}>{description}</p>
      </div>
      <RenderIf isTrue={Boolean(stacks?.length)}>
        <div className={cn('mt-2 flex flex-wrap items-end gap-2 px-4 pb-4')}>
          {stacks?.map((stack, idx) => {
            const stackIcon = STACKS[stack as keyof Stack];
            if (!stackIcon) return null;
            
            return (
              <Tooltip key={`${stack}-${idx}`}>
                <TooltipTrigger asChild>
                  {cloneElement(stackIcon, {
                    className: cn('size-5', (stackIcon as any)?.props?.className)
                  })}
                </TooltipTrigger>
                <TooltipContent>{stack}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </RenderIf>
    </Link>
  );
};

export default ProjectCard;
