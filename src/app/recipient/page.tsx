'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import StatCard from '@/components/common/StatCard';
import FoodCard from '@/components/food/FoodCard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  ShoppingBag,
  Inbox,
  Utensils,
  Truck,
  BellRing,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { formatDate, formatTime } from '@/utils';

export default function RecipientOverviewPage() {
  const donations = useAppStore((s) => s.donations);
  const requests = useAppStore((s) => s.requests);
  const deliveries = useAppStore((s) => s.deliveries);
  const currentUser = useAppStore((s) => s.currentUser);

  const availableDonations = donations.filter((d) => d.status === 'available');
  const activeRequests = requests.filter(
    (r) => r.status === 'pending' || r.status === 'approved'
  );
  const completedDeliveries = deliveries.filter(
    (d) => d.status === 'delivered' || d.status === 'confirmed'
  );

  return (
    <div className="space-y-8">
      {/* Recipient Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
            Verified Beneficiary Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] mt-1">
            {currentUser?.organization || currentUser?.name || 'Hope Foundation Shelter'}
          </h2>
          <p className="text-xs text-[#718078] mt-1">
            {currentUser?.address || 'Bidhannagar, Kolkata'} • Proximity Radius: 5 km
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/recipient/food"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Available Food</span>
          </Link>
          <Link
            href="/recipient/urgent-need"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all"
          >
            <BellRing className="w-4 h-4 text-amber-600" />
            <span>Urgent Need SOS Alert</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Available Food Nearby"
          value={availableDonations.length}
          subtext="Ready for immediate request"
          icon={<ShoppingBag className="w-6 h-6" />}
          accentColor="green"
        />
        <StatCard
          label="Active Inbound Requests"
          value={activeRequests.length}
          subtext="Pending & in transit"
          icon={<Inbox className="w-6 h-6" />}
          accentColor="amber"
        />
        <StatCard
          label="Completed Meal Deliveries"
          value={completedDeliveries.length}
          subtext="Successfully handed over"
          icon={<Truck className="w-6 h-6" />}
          accentColor="emerald"
        />
        <StatCard
          label="Total Servings Received"
          value="480+"
          subtext="Direct hunger alleviation"
          icon={<Utensils className="w-6 h-6" />}
          accentColor="blue"
        />
      </div>

      {/* Recommended Food Near You */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#24332B] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#176B45]" />
              <span>Recommended Surplus Food Near You</span>
            </h3>
            <p className="text-xs text-[#718078]">
              Distance-prioritized donations with active shelf-life
            </p>
          </div>
          <Link
            href="/recipient/food"
            className="text-xs font-bold text-[#176B45] hover:underline"
          >
            View full catalog ({availableDonations.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableDonations.slice(0, 3).map((d) => (
            <FoodCard key={d.id} donation={d} />
          ))}
        </div>
      </div>

      {/* Two Column Section: Active Inbound Tracking & Inbound Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Deliveries */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#24332B] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#176B45]" />
              <span>Active Delivery Tracking</span>
            </h3>
            <Link
              href="/recipient/requests"
              className="text-xs font-semibold text-[#176B45] hover:underline"
            >
              See all
            </Link>
          </div>

          <div className="space-y-4">
            {deliveries.slice(0, 2).map((del) => (
              <div
                key={del.id}
                className="p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#176B45]">{del.id}</span>
                  <StatusBadge status={del.status} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#718078] block">From:</span>
                    <strong className="text-[#24332B] truncate block">{del.donorAddress}</strong>
                  </div>
                  <div>
                    <span className="text-[#718078] block">To:</span>
                    <strong className="text-[#24332B] truncate block">{del.recipientAddress}</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs text-[#718078]">
                  <span>Estimated distance: {del.distanceKm} km</span>
                  <span className="font-semibold text-[#176B45]">Transit priority: High</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests Status */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#24332B] flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#F4A340]" />
                <span>My Request Status</span>
              </h3>
              <Link
                href="/recipient/requests"
                className="text-xs font-semibold text-[#176B45] hover:underline"
              >
                Details
              </Link>
            </div>

            <div className="space-y-3">
              {requests.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-xl bg-[#F8FAF7] border border-gray-100 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#24332B]">{r.id}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-[11px] text-[#718078] mt-0.5">
                      {r.servingsNeeded} servings • {formatTime(r.requestedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/recipient/urgent-need"
              className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-[#E9F5ED] text-[#176B45] hover:bg-[#d5ebd9] transition-colors flex items-center justify-center gap-2"
            >
              <BellRing className="w-4 h-4" />
              <span>Broadcast Immediate Hunger Need</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
