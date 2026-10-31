'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAppStore } from '@/store/useAppStore';
import {
  Settings,
  Bell,
  RefreshCw,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const activeRole = useAppStore((s) => s.activeRole);
  const resetDemoData = useAppStore((s) => s.resetDemoData);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsUrgent, setSmsUrgent] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [autoMatchNotification, setAutoMatchNotification] = useState(true);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification and dashboard preferences updated!');
  };

  const handleResetData = () => {
    if (
      confirm(
        'Are you sure you want to restore the default JSON demo state? All local modifications will be reset.'
      )
    ) {
      resetDemoData();
      toast.success('FoodBridge demo state successfully reset to initial JSON files!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <React.Suspense fallback={<div className="h-18 bg-white border-b border-gray-100" />}>
        <Navbar />
      </React.Suspense>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <Link
            href={`/${activeRole || 'donor'}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] hover:underline mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B]">
            System & Notification Settings
          </h1>
          <p className="text-xs text-[#718078] mt-0.5">
            Configure automated alerts, communication preferences, and demo environment settings
          </p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <Bell className="w-5 h-5 text-[#176B45]" />
            <h3 className="font-bold text-base text-[#24332B]">Alerts & Broadcast Preferences</h3>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-4">
            <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100 cursor-pointer">
              <div className="text-xs space-y-0.5">
                <strong className="text-[#24332B] block">Urgent Need SOS Alerts</strong>
                <span className="text-[#718078]">
                  Receive high-priority notifications when emergency food shortages are broadcasted
                  within 10 km.
                </span>
              </div>
              <input
                type="checkbox"
                checked={smsUrgent}
                onChange={(e) => setSmsUrgent(e.target.checked)}
                className="mt-1 rounded text-[#176B45] focus:ring-[#176B45]"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100 cursor-pointer">
              <div className="text-xs space-y-0.5">
                <strong className="text-[#24332B] block">Smart Matching Notifications</strong>
                <span className="text-[#718078]">
                  Notify immediately when surplus food compatibility score exceeds 85%.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoMatchNotification}
                onChange={(e) => setAutoMatchNotification(e.target.checked)}
                className="mt-1 rounded text-[#176B45] focus:ring-[#176B45]"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100 cursor-pointer">
              <div className="text-xs space-y-0.5">
                <strong className="text-[#24332B] block">Delivery Milestone Updates</strong>
                <span className="text-[#718078]">
                  Push notifications as volunteers advance pickup, transit, and drop-off stages.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="mt-1 rounded text-[#176B45] focus:ring-[#176B45]"
              />
            </label>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all cursor-pointer"
              >
                Save Notification Preferences
              </button>
            </div>
          </form>
        </div>

        {/* Demo Persistence & Reset Control */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <RefreshCw className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-[#24332B]">Demo Environment Controls</h3>
          </div>

          <p className="text-xs text-[#718078] leading-relaxed">
            All your interactions (created donations, submitted requests, completed delivery steps,
            read notifications) are currently stored in browser LocalStorage. You can reset to the
            baseline mock dataset at any time.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#718078]">Storage key: foodbridge_storage_v1</span>
            <button
              onClick={handleResetData}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset Demo to Initial JSON Data</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
