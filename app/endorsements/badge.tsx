'use client';

import { motion } from 'framer-motion';
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SITE } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types/skill';

interface BadgeProps {
  skill: Skill;
  user: DefaultSession['user'];
  currentUserId?: string;
  onEndorse: (skillId: string) => Promise<void>;
}

enum STATE {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

const Badge = ({ skill, user, currentUserId, onEndorse }: BadgeProps) => {
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

  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap items-stretch gap-4 rounded-xl bg-card p-4 shadow-border',
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
                  'disabled:cursor-not-allowed disabled:opacity-100',
                )}
                title="You already endorsed this skill!"
                disabled
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
          <Tooltip key={`${user.id}-${index}`}>
            <TooltipTrigger asChild>
              <button
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
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={10}
              className={cn(
                'overflow-visible bg-transparent p-0 shadow-none',
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 12, scale: 0.6 }}
                className={cn(
                  'relative rounded-md bg-background px-4 py-2 text-foreground shadow-xl',
                )}
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-1/5 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                <div className="absolute -bottom-px left-8 z-30 h-px w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="relative z-30 whitespace-nowrap text-sm font-bold">
                  {user.name}
                </div>
              </motion.div>
            </TooltipContent>
          </Tooltip>
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
