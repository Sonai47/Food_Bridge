'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { formatDate, formatTime, timeAgo } from '@/utils';
import {
  Inbox,
  Clock,
  Utensils,
  MapPin,
  Truck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function MyRequestsPage() {
  const requests = useAppStore((s) => s.requests);
  const donations = useAppStore((s) => s.donations);
  const deliveries = useAppStore((s) => s.deliveries);

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = requests.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#24332B]">My Donation Requests</h2>
          <p className="text-xs text-[#718078] mt-0.5">
            Monitor the approval status and inbound volunteer transport of your requested food
          </p>
        </div>
        <Link
          href="/recipient/food"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
        >
          <Utensils className="w-4 h-4" />
          <span>Request More Food</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        {['all', 'pending', 'approved', 'rejected', 'delivered'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
              filterStatus === st
                ? 'bg-[#176B45] text-white shadow-2xs'
                : 'text-[#718078] hover:text-[#24332B] hover:bg-gray-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Requests Listing */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Inbox className="w-8 h-8 text-[#176B45]" />}
          title="No Requests in this Category"
          description="You haven't made any requests matching this filter status yet."
          actionText="Explore Available Food"
          actionHref="/recipient/food"
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => {
            const donation = donations.find((d) => d.id === req.donationId);
            const delivery = deliveries.find((del) => del.requestId === req.id);

            return (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-extrabold text-sm text-[#24332B]">{req.id}</span>
                    <StatusBadge status={req.status} />
                    <StatusBadge status={req.urgency} />
                    <span className="text-xs text-[#718078] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Requested {timeAgo(req.requestedAt)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Utensils className="w-4 h-4 text-[#176B45]" />
                        <h4 className="font-bold text-xs text-[#24332B]">
                          {donation?.foodName || 'Donation Item'}
                        </h4>
                      </div>
                      <p className="text-xs text-[#718078]">
                        Portions: <strong>{req.requestedQuantity}</strong> • Servings:{' '}
                        <strong>~{req.servingsNeeded} meals</strong>
                      </p>
                      {req.note && (
                        <p className="text-[11px] text-[#718078] italic mt-1">&quot;{req.note}&quot;</p>
                      )}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#36A86B]" />
                        <h4 className="font-bold text-xs text-[#24332B]">Pickup Location</h4>
                      </div>
                      <p className="text-xs text-[#718078] truncate">
                        {donation?.address || 'Kolkata Sector V'}
                      </p>
                      <p className="text-[11px] text-[#176B45] font-semibold mt-1">
                        Deadline: {donation ? formatTime(donation.pickupDeadline) : 'Today'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex items-center justify-end">
                  {delivery ? (
                    <Link
                      href={`/volunteer/delivery/${delivery.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E9F5ED] text-[#176B45] hover:bg-[#d5ebd9] transition-colors"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Track Inbound Delivery</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-xs text-[#718078] bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                      {req.status === 'pending'
                        ? 'Awaiting donor confirmation'
                        : req.status === 'rejected'
                        ? 'Request was declined'
                        : 'Approved – Volunteer dispatching'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
