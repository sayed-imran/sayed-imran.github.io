import type { Metadata } from 'next';
import CommunityDaysShowcase from '@/components/CommunityDaysShowcase';

export const metadata: Metadata = {
  title: 'Sayed Imran | Google Cloud Community Days',
  description: 'Sessions by Sayed Imran at Google Cloud Community Days',
  robots: { index: false, follow: false },
};

export default function CloudCommunityDaysPage() {
  return (
    <CommunityDaysShowcase
      heading="Google Cloud Community Days"
      tagline="Sessions on multi-cloud Kubernetes, GKE and Istio delivered at Google Cloud Community Days across India."
      logo="/logos/google-cloud-icon-2048x1646-7admxejz.png"
      eventPrefix="Google Cloud Community Days"
    />
  );
}
