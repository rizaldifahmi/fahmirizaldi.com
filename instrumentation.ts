import * as Sentry from '@sentry/nextjs';

export const onRequestError = Sentry.captureRequestError;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const SENTRY_DSN =
      process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 0.2,
    });
  }
}
