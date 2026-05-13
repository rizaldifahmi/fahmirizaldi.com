import { compareDesc } from 'date-fns';
import { ChevronRight } from 'lucide-react';

import PostCard from '@/components/post-card';
import EmptyState from '@/components/shared/empty-state';
import Link from '@/components/shared/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import type { Post } from '@/lib/content/generated';
import { allPosts } from '@/lib/content/generated';
import { cn } from '@/lib/utils';

const MAX_DISPLAY = 4;

const getLatestPosts = (maxDisplay: number = MAX_DISPLAY): Array<Post> =>
  allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxDisplay);

const LatestPosts = () => {
  const posts = getLatestPosts();

  return (
    <section
      className={cn(
        'motion-safe:animate-reveal-up will-change-[transform,opacity]',
      )}
    >
      <div className={cn('mb-4 flex flex-col')}>
        <h2 className={cn('font-cal font-bold text-primary')}>Writing</h2>
        <p
          className={cn(
            'font-cal text-xl text-secondary-foreground',
            'md:text-2xl',
          )}
        >
          Latest posts
        </p>
      </div>
      {posts.length ? (
        <>
          <div
            className={cn(
              'grid auto-cols-fr grid-cols-1 gap-4',
              'md:grid-cols-2',
            )}
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className={cn('my-4 flex items-center justify-center')}>
            <Link href={ROUTES.blog}>
              <Button variant="outline">
                See all posts <ChevronRight />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptyState message="The posts are playing hide and seek." />
      )}
    </section>
  );
};

export default LatestPosts;
