'use client';

import type { MDXComponents } from 'mdx/types';
import { useMemo } from 'react';
import * as runtime from 'react/jsx-runtime';

type MDXRuntime = typeof runtime;
type MDXModule = {
  default: React.ComponentType<{ components?: MDXComponents }>;
};

const getMDXComponent = (code: string) => {
  const fn = new Function(code);

  return fn(runtime as MDXRuntime) as MDXModule;
};

export const useMDXComponent = (code: string) =>
  useMemo(() => getMDXComponent(code).default, [code]);
