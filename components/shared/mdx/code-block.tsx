'use client';

import { CheckCircle2 } from 'lucide-react';
import {
  Children,
  type DetailedHTMLProps,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
} from 'react';

import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CodeBlockProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  'data-theme'?: string;
}

const getTextContent = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return '';
};

const CodeBlock = ({
  children,
  'data-theme': dataTheme = '',
  className,
  ...props
}: CodeBlockProps) => {
  const { toast } = useToast();
  const code = Children.toArray(children).map(getTextContent).join('');

  const onCopiedChange = (copied: boolean) => {
    if (copied) {
      toast({
        description: (
          <span className={cn('flex items-center gap-2')}>
            <CheckCircle2 /> Copied to clipboard!
          </span>
        ),
        className: 'p-4',
      });
    }
  };

  return (
    <>
      <pre
        data-theme={dataTheme}
        className={cn(
          'border border-foreground/10 border-t-transparent',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      <div className={cn('absolute right-0.5 top-0.5')}>
        <CopyButton
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
          content={code}
          variant="ghost"
          size="default"
          delay={900}
          onCopiedChange={onCopiedChange}
          className={cn('size-10 hover:bg-background/60')}
        />
      </div>
    </>
  );
};

export default CodeBlock;
