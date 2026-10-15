import type { Metadata } from 'next';
import CommunityDaysShowcase from '@/components/CommunityDaysShowcase';

export const metadata: Metadata = {
  title: 'Sayed Imran | Open Source Events',
  description: 'Sessions by Sayed Imran at open source community events',
  robots: { index: false, follow: false },
};

export default function OpenSourcePage() {
  return (
    <CommunityDaysShowcase
      heading="Open Source Events"
      tagline="Hands-on workshops on service mesh and self-hosted AI delivered at open source community events across India."
      logo="/logos/github-logo.png"
      eventPrefix="Open Source"
    />
  );
}
