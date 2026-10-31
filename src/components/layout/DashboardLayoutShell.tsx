'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { UserRole } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface DashboardLayoutShellProps {
  children: React.ReactNode;
  role: UserRole;
  title: string;
  subtitle?: string;
}

export default function DashboardLayoutShell({
  children,
  role,
  title,
  subtitle,
}: DashboardLayoutShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeRole = useAppStore((s) => s.activeRole);
  const loginAsRole = useAppStore((s) => s.loginAsRole);

  // If role mismatch in demo, offer immediate auto-sync
  const isRoleMismatch = activeRole && activeRole !== role;

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex">
      {/* Sidebar with Suspense */}
      <React.Suspense fallback={<div className="w-64 bg-white hidden md:block border-r border-gray-100" />}>
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </React.Suspense>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen">
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          role={role}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        {/* Role Sync Banner for Demo convenience */}
        {isRoleMismatch && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center justify-between gap-2">
            <span>
              You are currently viewing the <strong>{role}</strong> dashboard while logged in as <strong>{activeRole}</strong>.
            </span>
            <button
              onClick={() => loginAsRole(role)}
              className="px-2.5 py-1 rounded bg-amber-600 text-white font-semibold hover:bg-amber-700 cursor-pointer shrink-0"
            >
              Switch demo identity to {role}
            </button>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
