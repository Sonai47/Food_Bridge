import React from 'react';
import DashboardLayoutShell from '@/components/layout/DashboardLayoutShell';

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutShell
      role="donor"
      title="Donor Management Hub"
      subtitle="Track your surplus food listings and review recipient requests"
    >
      {children}
    </DashboardLayoutShell>
  );
}
