'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { formatDate, formatTime } from '@/utils';
import { History, CheckCircle2, Calendar, Utensils } from 'lucide-react';

export default function DonorHistoryPage() {
  const donations = useAppStore((s) => s.donations);
  const currentUser = useAppStore((s) => s.currentUser);

  const pastDonations = donations.filter(
    (d) => d.status === 'delivered' || d.status === 'matched'
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#24332B]">Donation History & Records</h2>
        <p className="text-xs text-[#718078] mt-0.5">
          Archived record of all surplus meals safely redistributed through FoodBridge
        </p>
      </div>

      {pastDonations.length === 0 ? (
        <EmptyState
          icon={<History className="w-8 h-8 text-[#176B45]" />}
          title="No History Records Yet"
          description="Your completed and delivered donations will automatically appear in this historical archive."
        />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAF7] text-[#718078] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Donation ID</th>
                  <th className="py-3.5 px-4">Item Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Quantity / Portions</th>
                  <th className="py-3.5 px-4">Pickup Date</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[#24332B]">
                {pastDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#176B45]">{d.id}</td>
                    <td className="py-3.5 px-4 font-bold">{d.foodName}</td>
                    <td className="py-3.5 px-4">{d.category}</td>
                    <td className="py-3.5 px-4">
                      {d.quantity} {d.unit} (~{d.servings} Servings)
                    </td>
                    <td className="py-3.5 px-4">{formatDate(d.pickupDeadline)}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
