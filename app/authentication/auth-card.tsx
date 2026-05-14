'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import RenderIf from '@/components/shared/render-if';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import ProviderButton from './provider-button';

export type ClientAuthProvider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  redirectTo: string;
};

const AuthCard = ({
  providers,
}: {
  providers: Record<string, ClientAuthProvider> | null;
}) => {
  const searchParams = useSearchParams();
  const [isShowError, setIsShowError] = useState(() =>
    searchParams.has('error'),
  );

  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center justify-items-center space-y-2 will-change-[transform,opacity]',
          'xl:space-y-0',
        )}
      >
        <div className={cn('flex flex-col items-center justify-between gap-4')}>
          <RenderIf isTrue={Boolean(providers)}>
            {Object.values(providers!).map((provider) => (
              <ProviderButton key={provider.name} provider={provider} />
            ))}
          </RenderIf>
        </div>
      </div>
      <Dialog open={isShowError} onOpenChange={setIsShowError}>
        <DialogContent>
          <DialogHeader className={cn('pt-4')}>
            <DialogTitle>
              Oops! Something went wrong while authenticating your account.
            </DialogTitle>
            <DialogDescription>
              An unexpected problem occurred while I&apos;m trying to log you
              in. Please try with another provider.
            </DialogDescription>
          </DialogHeader>
          <div className={cn('text-center')}>
            <code className={cn('text-sm text-destructive')}>
              Error: {searchParams.get('error')}
            </code>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthCard;
