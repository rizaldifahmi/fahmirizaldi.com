'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import type { DefaultSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Medal } from '@/components/shared/icons';
import RenderIf from '@/components/shared/render-if';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { SITE } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types/skill';

interface BadgeProps {
  skill: Skill;
  user: DefaultSession['user'];
  currentUserId?: string;
  onEndorse: (skillId: string) => Promise<void>;
  onCancelEndorsement: (skillId: string) => Promise<void>;
}

enum STATE {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

const Badge = ({
  skill,
  user,
  currentUserId,
  onEndorse,
  onCancelEndorsement,
}: BadgeProps) => {
  const { id, name, users } = skill;
  const isEndorsedByUser = skill.users.find((u) => u.id === currentUserId);
  const isLoggedIn = Boolean(user);
  const isMySelf = user?.email === SITE.author.email;
  const [state, setState] = useState(STATE.IDLE);
  const { toast } = useToast();

  const _onEndorse = async (skillId: string) => {
    setState(STATE.LOADING);

    if (!isLoggedIn) {
      await signIn('github');
      return;
    }

    try {
      await onEndorse(skillId);
      setState(STATE.SUCCESS);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'There was a problem to endorse this skill.';

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: message,
        action: (
          <ToastAction altText="Try again" onClick={() => _onEndorse(skillId)}>
            Try again
          </ToastAction>
        ),
      });
      setState(STATE.IDLE);
    }
  };

  const _onCancelEndorsement = async (skillId: string) => {
    setState(STATE.LOADING);

    try {
      await onCancelEndorsement(skillId);
      setState(STATE.IDLE);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'There was a problem to cancel this endorsement.';

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => _onCancelEndorsement(skillId)}
          >
            Try again
          </ToastAction>
        ),
      });
      setState(STATE.IDLE);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap items-stretch gap-4 rounded-xl bg-card p-4 shadow-border transition-transform duration-200 ease-out',
        'motion-safe:hover:-translate-y-0.5',
      )}
    >
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('font-cal')}>{name}</div>
        {state === STATE.LOADING ? (
          <Spinner />
        ) : (
          <RenderIf isTrue={!isMySelf}>
            {isEndorsedByUser ? (
              <Button
                variant="ghost"
                className={cn(
                  'gap-1 px-3 py-1',
                  'hover:bg-background hover:text-foreground',
                )}
                title="Cancel your endorsement"
                onClick={() => _onCancelEndorsement(id)}
              >
                <span>Endorsed</span>
                <Medal />
              </Button>
            ) : (
              <Button
                variant="shadow"
                title={`Endorse ${name}`}
                size="sm"
                onClick={() => _onEndorse(id)}
              >
                Endorse
              </Button>
            )}
          </RenderIf>
        )}
      </div>
      <div className={cn('flex flex-wrap items-center gap-y-4')}>
        {users.map((user, index) => (
          <button
            key={`${user.id}-${index}`}
            type="button"
            className={cn(
              'group relative -mr-4 rounded-full outline-none',
              'focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
            aria-label={user.name}
          >
            <Image
              height={100}
              width={100}
              src={
                user.image ??
                `https://ui-avatars.com/api/?name=${user.name}&background=B191FF&color=fff&rounded=true`
              }
              alt={user.name}
              className={cn(
                'relative !m-0 size-10 rounded-full border-2 border-card object-cover object-top !p-0 transition duration-500',
                'group-hover:z-30 group-hover:scale-105',
              )}
            />
            <span
              className={cn(
                'pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-3 scale-75 opacity-0',
                'transition-[opacity,transform] duration-200 ease-out',
                'group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100',
                'group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100',
              )}
            >
              <span
                className={cn(
                  'relative block rounded-md bg-background px-4 py-2 text-foreground shadow-xl',
                )}
              >
                <span className="absolute inset-x-10 -bottom-px z-30 h-px w-1/5 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                <span className="absolute -bottom-px left-8 z-30 h-px w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="relative z-30 block whitespace-nowrap text-sm font-bold">
                  {user.name}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <RenderIf isTrue={users.length > 0}>
        <div className={cn('text-sm')}>
          <p>
            <strong>{users.length}</strong>{' '}
            {`${name} endorsement${users.length > 1 ? 's' : ''} from:`}
          </p>
          <p>{users.map((user) => user.name).join(',')}</p>
        </div>
      </RenderIf>
      <RenderIf isTrue={state === STATE.SUCCESS}>
        <p
          className={cn(
            'my-1 flex items-center gap-x-1 text-sm text-green-500',
            'sm:my-2',
          )}
        >
          <Check />
          Thank you for endorsing this skill!
        </p>
      </RenderIf>
    </div>
  );
};

export default Badge;
