import type { Metadata } from 'next';
import CommunityDaysShowcase from '@/components/CommunityDaysShowcase';

export const metadata: Metadata = {
  title: 'Sayed Imran | Kubernetes Community Days',
  description: 'Sessions by Sayed Imran at Kubernetes Community Days',
  robots: { index: false, follow: false },
};

export default function KubernetesCommunityDaysPage() {
  return (
    <CommunityDaysShowcase
      heading="Kubernetes Community Days"
      tagline="Sessions on service mesh, multi-cluster networking and platform engineering delivered at Kubernetes Community Days across India."
      logo="/logos/Kubernetes_logo_without_workmark.svg.png"
      eventPrefix="Kubernetes Community Days"
    />
  );
}
