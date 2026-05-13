import readingTime from 'reading-time';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import removeMd from 'remove-markdown';
import { defineCollection, defineConfig, s } from 'velite';

import { getBlurData, imageBlurMetadata } from './config/rehype/blur';
import { prettyCode } from './config/rehype/code';
import { getContentImagePath } from './lib/utils';

const getSlug = (path: string) =>
  path
    .split('/')
    .at(-1)
    ?.replace(/\.mdx?$/, '') ?? path;

const getPostExcerpt = ({
  content,
  defaultExcerpt,
  trimLength,
  min = 70,
  max = 150,
}: {
  content?: string | null;
  defaultExcerpt?: string;
  trimLength?: boolean;
  min?: number;
  max?: number;
}): string => {
  if (defaultExcerpt) return defaultExcerpt;
  if (!content) return defaultExcerpt ?? '';

  const text = content
    .split(/\r?\n/g)
    .filter((line) => !line.startsWith('#'))
    .map((line) => removeMd(line.trim(), { gfm: true, useImgAltText: true }))
    .filter(Boolean);

  let excerpt = '';

  if (text) {
    let lastIndex = 0;
    while (excerpt.length < max && text[lastIndex]) {
      excerpt += `${text[lastIndex]}`;
      lastIndex += 1;
    }
  }

  if (trimLength) {
    const allWords = excerpt.split(' ');
    excerpt = '';
    let lastIndex = 0;

    while (excerpt.length < max && allWords[lastIndex]) {
      const word = allWords[lastIndex];
      excerpt += `${word} `;

      if (word.endsWith('.') && !word.endsWith('etc.') && excerpt.length > min)
        break;

      lastIndex += 1;
    }
  }

  excerpt = excerpt.trim();

  if (excerpt.length > 0)
    return `${excerpt}${excerpt.endsWith('.') ? '..' : '...'}`;

  return defaultExcerpt ?? '';
};

const mdxBody = {
  path: s.path(),
  raw: s.raw().catch(''),
  code: s.mdx().catch(''),
};

const nullableString = () =>
  s
    .union([s.string(), s.null()])
    .optional()
    .transform((value) => value ?? undefined);

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/*.mdx',
  schema: s
    .object({
      ...mdxBody,
      title: s.string(),
      date: s.isodate(),
      modifiedDate: s.isodate(),
      excerpt: s.string().optional(),
      keywords: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      image: nullableString(),
      imageMeta: s.any().optional(),
      imageSource: nullableString(),
      published: s.boolean().default(true),
      pinned: s.boolean().default(false),
    })
    .transform(async ({ code, raw, path, ...post }) => {
      const image = getContentImagePath('blog', post.image);
      const slug = getSlug(path);

      return {
        ...post,
        _id: `posts/${slug}`,
        body: { code, raw },
        excerpt: getPostExcerpt({
          content: raw,
          defaultExcerpt: post.excerpt,
          trimLength: true,
        }),
        image,
        imageMeta: await getBlurData(image),
        keywords: post.keywords,
        longExcerpt: getPostExcerpt({
          content: raw,
          defaultExcerpt: post.excerpt,
        }),
        readingTime: readingTime(raw),
        slug,
        tags: post.tags,
      };
    }),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/*.mdx',
  schema: s
    .object({
      ...mdxBody,
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      published: s.boolean().default(true),
      highlight: s.boolean().default(false),
      stacks: s.array(s.string()).default([]),
      image: nullableString(),
      imageMeta: s.any().optional(),
      url: nullableString(),
      repositoryUrl: nullableString(),
      playStoreUrl: nullableString(),
      deprecated: s.boolean().default(false),
      deprecatedReason: nullableString(),
    })
    .transform(async ({ code, raw, path, ...project }) => {
      const image = getContentImagePath('projects', project.image);
      const slug = getSlug(path);

      return {
        ...project,
        _id: `projects/${slug}`,
        body: { code, raw },
        image,
        imageMeta: await getBlurData(image),
        readingTime: readingTime(raw),
        slug,
      };
    }),
});

const snippets = defineCollection({
  name: 'Snippet',
  pattern: 'snippets/*.mdx',
  schema: s
    .object({
      ...mdxBody,
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
    })
    .transform(({ code, raw, path, ...snippet }) => {
      const slug = getSlug(path);

      return {
        ...snippet,
        _id: `snippets/${slug}`,
        body: { code, raw },
        readingTime: readingTime(raw),
        slug,
      };
    }),
});

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/*.mdx',
  schema: s
    .object({
      ...mdxBody,
    })
    .transform(({ code, raw, path }) => {
      const slug = getSlug(path);

      return {
        _id: `pages/${slug}`,
        body: { code, raw },
        slug,
      };
    }),
});

export default defineConfig({
  root: 'content',
  output: {
    clean: true,
  },
  collections: { posts, projects, snippets, pages },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // @ts-expect-error rehype plugin types differ between unified versions.
      prettyCode,
      imageBlurMetadata,
      rehypeSlug,
      rehypeAccessibleEmojis,
    ],
  },
});
