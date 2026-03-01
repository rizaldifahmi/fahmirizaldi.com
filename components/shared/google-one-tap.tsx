'use client';

import { useEffect, useState } from 'react';

/**
 * Google One Tap Component
 * 
 * This component provides Google One Tap authentication functionality using JWT.
 * It verifies the Google credential and creates a JWT session token.
 * 
 * Setup:
 * 1. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your environment variables
 * 2. Use the same Google OAuth client ID that you use for NextAuth Google provider
 * 3. Make sure the client ID is configured for web applications in Google Cloud Console
 * 
 * Usage:
 * <GoogleOneTap 
 *   clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
 *   autoPrompt={true}
 *   onSuccess={() => console.log('Signed in!')}
 *   onError={(error) => console.error('Error:', error)}
 * />
 */

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: string;
            state_cookie_domain?: string;
            use_fedcm_for_prompt?: boolean;
            allowed_parent_origin?: string | string[];
            intermediate_iframe_close_callback?: () => void;
            itp_support?: boolean;
          }) => void;
          prompt: (notification?: () => void) => void;
          disableAutoSelect: () => void;
          renderButton: (element: HTMLElement, config: {
            theme?: 'outline' | 'filled_blue' | 'filled_black';
            size?: 'large' | 'medium' | 'small';
            text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
            shape?: 'rectangular' | 'pill' | 'circle' | 'square';
            logo_alignment?: 'left' | 'center';
            width?: string | number;
            locale?: string;
          }) => void;
        };
      };
    };
  }
}

interface GoogleOneTapProps {
  clientId: string;
  autoPrompt?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const GoogleOneTap = ({ 
  clientId, 
  autoPrompt = true, 
  onSuccess, 
  onError 
}: GoogleOneTapProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!clientId || isInitialized) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.accounts?.id) {
        // Use Google One Tap with proper credential handling
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            try {
              setIsLoading(true);
              console.log('Google One Tap credential received');
              
              // Send credential to our API for verification
              const response = await fetch('/api/auth/google-one-tap', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential }),
              });

              if (response.ok) {
                const data = await response.json();
                console.log('Google One Tap sign in successful:', data.user);
                onSuccess?.();
                // Reload page to update auth state
                window.location.reload();
              } else {
                throw new Error('Sign in failed');
              }
              
            } catch (error) {
              console.error('Google One Tap sign in error:', error);
              onError?.(error);
            } finally {
              setIsLoading(false);
            }
          },
          auto_select: autoPrompt,
          cancel_on_tap_outside: true,
        });

        // Show the One Tap prompt if autoPrompt is enabled
        if (autoPrompt) {
          window.google.accounts.id.prompt();
        }

        setIsInitialized(true);
      }
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]',
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [clientId, isInitialized, autoPrompt, onSuccess, onError]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-4">
        <div className="text-sm text-muted-foreground">Signing in...</div>
      </div>
    );
  }

  return null; // Google One Tap renders its own UI
};

export default GoogleOneTap;
