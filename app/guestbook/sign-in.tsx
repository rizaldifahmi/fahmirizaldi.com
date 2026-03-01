import { signIn } from 'next-auth/react';

import GoogleOneTap from '@/components/shared/google-one-tap';
import { GitHub, Google } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { env } from '@/lib/env';
import { useAuth } from '@/hooks/use-auth';

const SignIn = ({ message = 'Kindly login to start a conversation.' }: { message?: string }) => {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div className={cn('flex flex-col border-t border-muted')}>
        <div className={cn('space-y-3 p-4')}>
          <p className={cn('text-center text-sm')}>
            You are already signed in!
          </p>
          <Button
            variant="ghost"
            className={cn('w-full')}
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col border-t border-muted')}>
      <div className={cn('space-y-3 p-4')}>
        <p className={cn('text-center text-sm')}>
          {message}
        </p>
        
        {/* Google Sign-In Button */}
        {env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
          <GoogleOneTap 
            clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            autoPrompt={true}
            onSuccess={() => {
              console.log('Google Sign-In successful');
            }}
            onError={(error) => {
              console.error('Google Sign-In error:', error);
            }}
          />
        )}
        
        <div className={cn('grid grid-cols-2 gap-2', 'md:gap-4')}>
          <Button
            variant="ghost"
            className={cn(
              'flex items-center gap-3 border border-foreground text-sm font-medium',
            )}
            onClick={() => signIn('github')}
          >
            <GitHub className={cn('hidden', 'sm:flex')} />
            <span>Sign in with GitHub</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'flex items-center gap-3 border border-foreground text-sm font-medium',
            )}
            onClick={() => signIn('google')}
          >
            <Google className={cn('hidden', 'sm:flex')} />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
