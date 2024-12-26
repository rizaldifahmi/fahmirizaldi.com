'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import Link from '@/components/shared/link';
import RenderIf from '@/components/shared/render-if';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import useEndorsements from '@/hooks/use-endorsements';
import { cn } from '@/lib/utils';
import type { SkillCategory } from '@/types/skill';

import SignIn from '../guestbook/sign-in';
import Badge from './badge';

const Endorsements = ({ fallbackData }: { fallbackData: SkillCategory[] }) => {
  const { data: session } = useSession();
  const { endorsements, error, addEndorsement } = useEndorsements({
    fallbackData,
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return (
    <>
      <div className={cn('flex items-center justify-center py-4')}>
        <div
          className={cn(
            'relative max-w-lg rounded-lg border border-transparent bg-background p-3',
            'after:absolute after:-inset-1 after:-z-10 after:rounded-[calc(8px+3px)] after:bg-rainbow-gradient after:content-[""]',
          )}
        >
          {session?.user ? (
            <>
              <p>
                You are currently logged in as{' '}
                <span className={cn('font-cal font-bold')}>
                  {session.user.name}
                </span>
              </p>
              {isAuthenticating ? (
                <Spinner />
              ) : (
                <Link
                  href="/api/auth/signout"
                  className={cn('font-semibold underline')}
                  onClick={async (e) => {
                    e.preventDefault();
                    setIsAuthenticating(true);
                    await signOut();
                  }}
                >
                  Logout
                </Link>
              )}
            </>
          ) : (
            <div className={cn('flex flex-col items-start')}>
              <h2 className={cn('font-cal font-bold')}>
                Sign in to give endorsements
              </h2>
              <p className={cn('text-sm text-muted-foreground')}>
                Your information, including name and profile picture, will only be used
                to display your identity as an endorser.
              </p>
              <SignIn message="Kindly login to give endorsements for skills." />
            </div>
          )}
        </div>
      </div>

      <div>
        <RenderIf isTrue={endorsements && !error}>
          <div className={cn('flex flex-col')}>
            <h3 className={cn('font-cal text-xl font-bold', 'md:text-2xl')}>
              Skills
            </h3>
            <div className={cn('space-y-8')}>
              {endorsements.map((category) => (
                <div key={category.name}>
                  <h4
                    className={cn(
                      'my-4 font-cal text-lg font-bold leading-5 text-accent-foreground',
                      'md:text-xl',
                    )}
                  >
                    {category.name}
                  </h4>
                  <div
                    className={cn(
                      'grid grid-flow-row auto-rows-auto grid-cols-1 gap-4',
                      'md:grid-cols-2',
                    )}
                  >
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        skill={skill}
                        user={session?.user}
                        currentUserId={session?.id}
                        onEndorse={addEndorsement}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RenderIf>
      </div>
    </>
  );
};

export default Endorsements;
