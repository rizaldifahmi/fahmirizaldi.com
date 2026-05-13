import { env as runtimeEnv } from './env.mjs';

type Env = {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS?: string;
  NEXT_PUBLIC_GOOGLE_CLIENT_ID?: string;
  NEXT_PUBLIC_SENTRY_DSN?: string;
  NEXT_PUBLIC_AVAILABLE_FOR_HIRE: boolean;
  DATABASE_URL: string;
  DIRECT_URL: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  SENTRY_DSN?: string;
  SENTRY_AUTH_TOKEN?: string;
  GOOGLE_ID?: string;
  GOOGLE_SECRET?: string;
  GITHUB_ID?: string;
  GITHUB_SECRET?: string;
  GITHUB_READ_USER_TOKEN_PERSONAL?: string;
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_CLIENT_REFRESH_TOKEN?: string;
  WAKATIME_API_KEY?: string;
};

export const env = runtimeEnv as Env;
