'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import StatCard from '@/components/common/StatCard';
import ImpactChart from '@/components/common/ImpactChart';
import StatusBadge from '@/components/common/StatusBadge';
import FoodImage from '@/components/common/FoodImage';
import {
  Package,
  Utensils,
  Truck,
  Inbox,
  PlusCircle,
  ArrowRight,
  Clock,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { formatDate, formatTime } from '@/utils';

export default function DonorOverviewPage() {
  const donations = useAppStore((s) => s.donations);
  const requests = useAppStore((s) => s.requests);
  const impact = useAppStore((s) => s.impact);
  const currentUser = useAppStore((s) => s.currentUser);

  // Filter donations belonging to this donor (or show all in demo if none matches)
  const myDonations = donations.filter(
    (d) => !currentUser || d.donorId === currentUser.id || d.donorId === 'USR001'
  );

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const deliveredDonations = myDonations.filter((d) => d.status === 'delivered');
  const totalFoodDonatedKg = myDonations.reduce((sum, d) => sum + (d.unit === 'kg' ? d.quantity : 5), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Quick Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
            Welcome Back
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] mt-1">
            {currentUser?.name || 'Ananya Foods Restaurant'}
          </h2>
          <p className="text-xs text-[#718078] mt-1">
            {currentUser?.organization || 'Food Donor Partner'} • Salt Lake Sector V, Kolkata
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/donor/add-donation"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Food Donation</span>
          </Link>
          <Link
            href="/donor/requests"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#E9F5ED] text-[#176B45] hover:bg-[#d5edd9] transition-all"
          >
            <Inbox className="w-4 h-4" />
            <span>Review Requests ({pendingRequests.length})</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Donations Posted"
          value={myDonations.length}
          subtext="Active surplus listings"
          icon={<Package className="w-6 h-6" />}
          accentColor="green"
        />
        <StatCard
          label="Total Food Rescued"
          value={`${totalFoodDonatedKg} kg`}
          subtext="Estimated ~320 portions"
          icon={<Utensils className="w-6 h-6" />}
          accentColor="emerald"
        />
        <StatCard
          label="Successful Deliveries"
          value={deliveredDonations.length}
          subtext="Received by shelters"
          icon={<Truck className="w-6 h-6" />}
          accentColor="blue"
        />
        <StatCard
          label="Pending Recipient Requests"
          value={pendingRequests.length}
          subtext="Awaiting your approval"
          icon={<Inbox className="w-6 h-6" />}
          accentColor="amber"
        />
      </div>

      {/* Main Grid: Analytics & Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recharts Donation Analytics */}
        <div className="lg:col-span-7">
          <ImpactChart
            data={impact.monthlyMealsSaved}
            title="Surplus Meals Donated Over Time"
            subtitle="Your kitchen contribution to community food security"
          />
        </div>

        {/* Right: Urgent Pending Requests Notification */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#24332B] flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#176B45]" />
              <span>Pending Requests</span>
            </h3>
            <Link
              href="/donor/requests"
              className="text-xs font-semibold text-[#176B45] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="flex-1 space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#718078] bg-[#F8FAF7] rounded-2xl">
                No pending requests. All recipient requests have been reviewed!
              </div>
            ) : (
              pendingRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#24332B]">{req.id}</span>
                      <StatusBadge status={req.urgency} />
                    </div>
                    <p className="text-xs text-[#718078] mt-1">
                      Requesting <strong>{req.servingsNeeded} servings</strong> ({req.requestedQuantity} portions)
                    </p>
                    {req.note && (
                      <p className="text-[11px] text-gray-500 italic mt-0.5 line-clamp-1">
                        &quot;{req.note}&quot;
                      </p>
                    )}
                  </div>
                  <Link
                    href="/donor/requests"
                    className="p-2 rounded-lg bg-white border border-gray-200 text-[#176B45] hover:bg-[#E9F5ED] text-xs font-bold transition-colors"
                  >
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Donations List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg text-[#24332B]">Recent Donations</h3>
            <p className="text-xs text-[#718078]">Latest surplus items posted from your location</p>
          </div>
          <Link
            href="/donor/donations"
            className="text-xs font-bold text-[#176B45] hover:underline flex items-center gap-1"
          >
            <span>Manage All Donations</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myDonations.slice(0, 3).map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-gray-100 p-4 bg-[#F8FAF7] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3 mb-3">
                <FoodImage
                  src={d.image}
                  alt={d.foodName}
                  category={d.category}
                  className="w-16 h-16 rounded-xl shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#176B45] bg-[#E9F5ED] px-2 py-0.5 rounded-md">
                      {d.category}
                    </span>
                    <StatusBadge status={d.status} />
                  </div>
                  <h4 className="font-bold text-sm text-[#24332B] truncate">{d.foodName}</h4>
                  <p className="text-xs text-[#718078]">
                    {d.quantity} {d.unit} • ~{d.servings} Servings
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-[#718078]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F4A340]" />
                  Pickup: {formatTime(d.pickupDeadline)}
                </span>
                <Link
                  href="/donor/donations"
                  className="font-semibold text-[#176B45] hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
