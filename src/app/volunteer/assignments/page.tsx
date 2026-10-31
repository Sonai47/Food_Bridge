'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { formatDate, formatTime } from '@/utils';
import { Bike, Navigation, ChevronRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function MyAssignmentsPage() {
  const deliveries = useAppStore((s) => s.deliveries);
  const donations = useAppStore((s) => s.donations);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#24332B]">My Delivery Assignments</h2>
        <p className="text-xs text-[#718078] mt-0.5">
          Active and completed pickup routes assigned to you
        </p>
      </div>

      {deliveries.length === 0 ? (
        <EmptyState
          icon={<Bike className="w-8 h-8 text-[#176B45]" />}
          title="No Active Assignments"
          description="You do not have any claimed deliveries right now. Check the Available Tasks desk!"
          actionText="Browse Available Tasks"
          actionHref="/volunteer/tasks"
        />
      ) : (
        <div className="space-y-4">
          {deliveries.map((del) => {
            const donation = donations.find((d) => d.id === del.donationId);

            return (
              <div
                key={del.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs text-[#176B45]">{del.id}</span>
                    <StatusBadge status={del.status} />
                    <span className="text-xs text-[#718078] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Must deliver by {formatTime(del.pickupDeadline)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#24332B]">
                      {donation?.foodName || 'Food Package'}
                    </h3>
                    <p className="text-xs text-[#718078]">
                      Quantity: {donation?.quantity} {donation?.unit} (~{donation?.servings} Servings)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#718078]">
                    <p className="truncate">
                      <strong>From:</strong> {del.donorAddress}
                    </p>
                    <p className="truncate">
                      <strong>To:</strong> {del.recipientAddress}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/volunteer/delivery/${del.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-xs transition-colors"
                  >
                    <span>Delivery Console</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
