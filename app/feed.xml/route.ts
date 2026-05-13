import { NextResponse } from 'next/server';
import RSS from 'rss';

import { BASE_URL, ROUTES, SITE } from '@/constants';
import { allPosts } from '@/lib/content/generated';

export const GET = () => {
  const feed = new RSS({
    title: SITE.title,
    description: SITE.description,
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`,
    image_url: `${BASE_URL}/media/site/logo.svg`,
  });

  allPosts
    .filter((post) => post.published)
    .map(({ title, longExcerpt, excerpt, slug, date }) => {
      feed.item({
        title,
        description: longExcerpt ?? excerpt,
        url: `${BASE_URL}${ROUTES.blog}/${slug}`,
        date,
        author: SITE.author.name,
      });
    });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
