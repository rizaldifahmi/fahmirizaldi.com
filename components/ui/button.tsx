import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLMotionProps } from 'motion/react';
import * as React from 'react';

import {
  Button as ButtonPrimitive,
} from '@/components/animate-ui/primitives/buttons/button';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        shadow:
          'border border-secondary-foreground bg-background shadow-[3px_3px_rgb(0_0_0_/_20%)] hover:bg-primary hover:text-primary-foreground dark:shadow-[3px_3px_rgb(255_255_255_/_40%)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    hoverScale?: number;
    tapScale?: number;
    children?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Primitive = ButtonPrimitive as React.ComponentType<any>;

    return (
      <Primitive
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        asChild={asChild}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
