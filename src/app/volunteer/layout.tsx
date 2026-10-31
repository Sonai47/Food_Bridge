import React from 'react';
import DashboardLayoutShell from '@/components/layout/DashboardLayoutShell';

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutShell
      role="volunteer"
      title="Volunteer Logistics Desk"
      subtitle="Accept pickup tasks and deliver meals safely across your neighborhood"
    >
      {children}
    </DashboardLayoutShell>
  );
}
