import type { Metadata } from 'next';

import { getEndorsements } from '@/actions/endorsements';
import Container from '@/components/shared/container';
import PageHeader from '@/components/shared/page-header';
import { ROUTES } from '@/constants';
import { seo } from '@/lib/meta';

import Endorsements from './endorsements';

export const metadata: Metadata = seo({
  title: 'Endorsements',
  description:
    'I invite you to share your experience working with me through an endorsement. Your perspective on my technical abilities and professional contributions would be deeply valued.',
  url: ROUTES.endorsements,
});

const EndorsementsPage = async () => {
  const endorsements = await getEndorsements();

  return (
    <>
      <PageHeader
        title="Endorsements"
        description="I invite you to share your experience working with me through an endorsement. Your perspective on my technical abilities and professional contributions would be deeply valued. Each endorsement helps build a comprehensive picture of my expertise in the tech industry."
      />
      <Container>
        <Endorsements fallbackData={endorsements} />
      </Container>
    </>
  );
};

export default EndorsementsPage;
