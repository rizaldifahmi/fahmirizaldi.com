import { env } from '@/lib/env';

interface Author {
  name: string;
  url: string;
  avatar: string;
  email: string;
  linkedIn: string;
  github: {
    username: string;
    url: string;
  };
  twitter?: string;
}

interface Site {
  url: string;
  name: string;
  title: string;
  description: string;
  author: Author;
  keywords?: string[];
}

export const BASE_URL = env.NEXT_PUBLIC_APP_URL;

export const SITE: Site = {
  url: BASE_URL,
  name: "Fahmi Rizaldi's portfolio",
  title: 'Fahmi Rizaldi',
  description:
    'Passionate Software engineer who focused on solving problems with digital products.',
  author: {
    name: 'Fahmi Rizaldi',
    url: 'https://fahmirizaldi.com',
    email: 'fahmirizaldi@live.com',
    linkedIn: 'https://www.linkedin.com/in/fahmirizaldi',
    github: {
      username: 'rizaldifahmi',
      url: 'https://www.github.com/rizaldifahmi',
    },
    avatar: '/media/profile/fahmi.jpg',
    twitter: '@fahmirizaidi',
  },
  keywords: [
    'Fahmi Rizaldi',
    'developer',
    'portfolio',
    'developer portfolio website',
    'portfolio website',
    'full-stack',
    'back-end',
    'front-end',
    'software engineer',
  ],
};
