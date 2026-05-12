'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { GitHub, Google } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ClientAuthProvider } from './auth-card';

interface StyleGuide {
  logo: JSX.Element;
}

const providerStyleGuides: { [key: string]: StyleGuide } = {
  github: {
    logo: <GitHub />,
  },
  google: {
    logo: <Google />,
  },
};

const ProviderButton = ({ provider }: { provider: ClientAuthProvider }) => {
  const { logo } = providerStyleGuides[provider.id];
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  return (
    <Button
      key={provider.id}
      variant="shadow"
      className={cn(
        'flex items-center gap-3 border-foreground text-sm font-medium',
      )}
      onClick={() => signIn(provider.id, { redirectTo: callbackUrl })}
    >
      {logo}
      <span>Sign in with {provider.name}</span>
    </Button>
  );
};

export default ProviderButton;
