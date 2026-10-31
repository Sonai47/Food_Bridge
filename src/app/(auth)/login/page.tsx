'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { HeartHandshake, ShieldAlert, ArrowRight, Utensils, Building2, Truck } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const loginWithEmail = useAppStore((s) => s.loginWithEmail);
  const loginAsRole = useAppStore((s) => s.loginAsRole);

  const [email, setEmail] = useState('donor@foodbridge.demo');
  const [password, setPassword] = useState('demo1234');
  const [role, setRole] = useState<UserRole>('donor');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }

    loginWithEmail(email, role);
    toast.success(`Logged in successfully as ${role}!`);
    router.push(`/${role}`);
  };

  const handleQuickDemoLogin = (targetRole: UserRole) => {
    loginAsRole(targetRole);
    toast.success(`Demo access activated: ${targetRole.toUpperCase()}`);
    router.push(`/${targetRole}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#176B45]">
            Food<span className="text-[#36A86B]">Bridge</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-[#24332B] tracking-tight">
          Sign In to Your Portal
        </h2>
        <p className="text-xs text-[#718078] mt-1">
          Select a 1-click role demo account or enter your credentials
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-gray-100 shadow-md space-y-6">
          {/* Quick Demo Access Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#718078] mb-2.5">
              1-Click Instant Demo Login
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('donor')}
                className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-[#176B45] text-xs font-bold flex flex-col items-center gap-1 transition-colors cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Donor</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('recipient')}
                className="p-3 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex flex-col items-center gap-1 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Recipient</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('volunteer')}
                className="p-3 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-800 text-xs font-bold flex flex-col items-center gap-1 transition-colors cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Volunteer</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase">
              Or Sign In With Email
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Demo Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="donor@foodbridge.demo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Target Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden capitalize"
              >
                <option value="donor">Food Donor</option>
                <option value="recipient">Food Recipient (NGO / Shelter)</option>
                <option value="volunteer">Community Volunteer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demonstration Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-amber-900 leading-snug">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Authentication Only:</strong> LocalStorage-based session state.
              No external credentials or passwords are transmitted.
            </span>
          </div>

          <div className="text-center text-xs text-[#718078] pt-2">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-[#176B45] hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
