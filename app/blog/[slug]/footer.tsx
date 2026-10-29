'use client';

import { usePostContext } from '@/components/providers/post-provider';
import Container from '@/components/shared/container';
import { cn, formatDate } from '@/lib/utils';

const Footer = () => {
  const { slug, modifiedDate } = usePostContext();
  const modifiedTime = formatDate(modifiedDate);

  return (
    <Container>
      <div className={cn('my-8 flex justify-end')}>
        <div className={cn('text-muted-foreground')}>
          Last updated: {modifiedTime}
        </div>
      </div>
    </Container>
  );
};

export default Footer;
