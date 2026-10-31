'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { Menu, ShieldCheck } from 'lucide-react';
import NotificationPanel from '@/components/common/NotificationPanel';
import UserAvatar from '@/components/common/UserAvatar';
import { UserRole } from '@/types';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  role: UserRole;
  onMenuToggle?: () => void;
}

export default function DashboardHeader({
  title,
  subtitle,
  role,
  onMenuToggle,
}: DashboardHeaderProps) {
  const currentUser = useAppStore((s) => s.currentUser);

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#24332B]">{title}</h1>
          {subtitle && (
            <p className="text-xs text-[#718078] hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E9F5ED] text-[#176B45] border border-[#36A86B]/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="capitalize">{role} Portal</span>
        </div>

        {/* Notifications */}
        <NotificationPanel />

        {/* User profile avatar link */}
        <Link
          href="/profile"
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <UserAvatar name={currentUser?.name || 'User'} size="sm" />
          <span className="text-xs font-semibold text-[#24332B] hidden lg:block">
            {currentUser?.name || 'My Profile'}
          </span>
        </Link>
      </div>
    </header>
  );
}
