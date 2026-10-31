'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import {
  HeartHandshake,
  LayoutDashboard,
  PlusCircle,
  Package,
  Inbox,
  History,
  ShoppingBag,
  BellRing,
  Bike,
  ClipboardList,
  MapPin,
  UserCheck,
  Settings,
  LogOut,
  RefreshCw,
  Sparkles,
  X,
} from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';

interface SidebarProps {
  role: UserRole;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useAppStore((s) => s.currentUser);
  const logout = useAppStore((s) => s.logout);
  const loginAsRole = useAppStore((s) => s.loginAsRole);

  const donorLinks = [
    { name: 'Overview', href: '/donor', icon: LayoutDashboard },
    { name: 'Add Donation', href: '/donor/add-donation', icon: PlusCircle },
    { name: 'My Donations', href: '/donor/donations', icon: Package },
    { name: 'Pickup Requests', href: '/donor/requests', icon: Inbox },
    { name: 'Donation History', href: '/donor/history', icon: History },
  ];

  const recipientLinks = [
    { name: 'Overview', href: '/recipient', icon: LayoutDashboard },
    { name: 'Available Food', href: '/recipient/food', icon: ShoppingBag },
    { name: 'My Requests', href: '/recipient/requests', icon: Inbox },
    { name: 'Urgent Need Alert', href: '/recipient/urgent-need', icon: BellRing },
  ];

  const volunteerLinks = [
    { name: 'Overview', href: '/volunteer', icon: LayoutDashboard },
    { name: 'Available Tasks', href: '/volunteer/tasks', icon: ClipboardList },
    { name: 'My Assignments', href: '/volunteer/assignments', icon: Bike },
  ];

  const commonLinks = [
    { name: 'Smart Matching', href: '/matching', icon: Sparkles },
    { name: 'Profile', href: '/profile', icon: UserCheck },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const currentRoleLinks =
    role === 'donor'
      ? donorLinks
      : role === 'recipient'
      ? recipientLinks
      : volunteerLinks;

  const handleRoleSwitch = (newRole: UserRole) => {
    loginAsRole(newRole);
    router.push(`/${newRole}`);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#176B45] text-white flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-[#176B45]">
              Food<span className="text-[#36A86B]">Bridge</span>
            </span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Snapshot & Role Switcher */}
        <div className="p-4 border-b border-gray-100 bg-[#F8FAF7]">
          <div className="flex items-center gap-3 mb-2.5">
            <UserAvatar name={currentUser?.name || 'User'} size="md" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#24332B] truncate">
                {currentUser?.name || 'FoodBridge Demo'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#E9F5ED] text-[#176B45]">
                {role}
              </span>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="mt-2 pt-2 border-t border-gray-200/60">
            <p className="text-[10px] text-[#718078] font-medium mb-1.5 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Quick Switch Demo Role:
            </p>
            <div className="grid grid-cols-3 gap-1">
              {(['donor', 'recipient', 'volunteer'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`text-[11px] py-1 px-1.5 rounded-md font-medium capitalize text-center transition-all cursor-pointer ${
                    role === r
                      ? 'bg-[#176B45] text-white shadow-2xs'
                      : 'bg-white border border-gray-200 text-[#718078] hover:text-[#24332B]'
                  }`}
                >
                  {r === 'volunteer' ? 'Vol.' : r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-[11px] font-bold text-[#718078] uppercase tracking-wider px-3 mb-2">
              {role} Navigation
            </p>
            <nav className="space-y-1">
              {currentRoleLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E9F5ED] text-[#176B45] font-semibold'
                        : 'text-[#24332B] hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#176B45]' : 'text-[#718078]'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-bold text-[#718078] uppercase tracking-wider px-3 mb-2">
              General
            </p>
            <nav className="space-y-1">
              {commonLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E9F5ED] text-[#176B45] font-semibold'
                        : 'text-[#24332B] hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#176B45]' : 'text-[#718078]'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-gray-100 bg-[#F8FAF7]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
