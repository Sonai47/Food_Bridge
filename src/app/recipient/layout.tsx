import React from 'react';
import DashboardLayoutShell from '@/components/layout/DashboardLayoutShell';

export default function RecipientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutShell
      role="recipient"
      title="Recipient Food Portal"
      subtitle="Discover fresh surplus food donations and monitor inbound deliveries"
    >
      {children}
    </DashboardLayoutShell>
  );
}
