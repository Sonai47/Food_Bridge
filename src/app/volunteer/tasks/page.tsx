'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { formatTime, formatDate } from '@/utils';
import {
  ClipboardList,
  MapPin,
  Clock,
  Utensils,
  Building2,
  Navigation,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AvailableTasksPage() {
  const router = useRouter();
  const deliveries = useAppStore((s) => s.deliveries);
  const donations = useAppStore((s) => s.donations);
  const requests = useAppStore((s) => s.requests);
  const users = useAppStore((s) => s.users);
  const acceptPickupTask = useAppStore((s) => s.acceptPickupTask);

  const availableTasks = deliveries.filter((d) => d.status === 'assigned');

  const handleAcceptTask = (deliveryId: string) => {
    acceptPickupTask(deliveryId);
    toast.success(`Task ${deliveryId} accepted! Opening delivery tracking console.`);
    router.push(`/volunteer/delivery/${deliveryId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#24332B]">Available Pickup Tasks</h2>
        <p className="text-xs text-[#718078] mt-0.5">
          Surplus food matched with recipients waiting for local community volunteer collection
        </p>
      </div>

      {availableTasks.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="w-8 h-8 text-[#176B45]" />}
          title="No Tasks Waiting for Pickup"
          description="All active donation requests are currently assigned or in transit. Check back shortly!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableTasks.map((del) => {
            const donation = donations.find((d) => d.id === del.donationId);
            const request = requests.find((r) => r.id === del.requestId);
            const donor = donation ? users.find((u) => u.id === donation.donorId) : null;
            const recipient = request ? users.find((u) => u.id === request.recipientId) : null;

            return (
              <div
                key={del.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#176B45]">{del.id}</span>
                      <StatusBadge status={del.status} />
                    </div>
                    <span className="text-xs font-bold text-[#176B45] bg-[#E9F5ED] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {del.distanceKm} km route
                    </span>
                  </div>

                  {/* Food summary */}
                  <div>
                    <h3 className="text-lg font-bold text-[#24332B]">
                      {donation?.foodName || 'Surplus Meal Package'}
                    </h3>
                    <p className="text-xs text-[#718078] mt-0.5">
                      Quantity: <strong>{donation?.quantity} {donation?.unit}</strong> (~
                      {donation?.servings} Servings)
                    </p>
                  </div>

                  {/* Route points */}
                  <div className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#176B45] uppercase block">
                        Pickup Location (Donor)
                      </span>
                      <p className="font-bold text-[#24332B] mt-0.5">{donor?.name || 'Verified Donor'}</p>
                      <p className="text-[#718078]">{del.donorAddress}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-200/60">
                      <span className="text-[10px] font-bold text-[#F4A340] uppercase block">
                        Drop-off Destination (Recipient)
                      </span>
                      <p className="font-bold text-[#24332B] mt-0.5">{recipient?.name || 'Community Shelter'}</p>
                      <p className="text-[#718078]">{del.recipientAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#718078]">
                    <span className="flex items-center gap-1 text-rose-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      Deadline: {formatTime(del.pickupDeadline)}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" /> Sealed packaging
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 mt-4">
                  <button
                    onClick={() => handleAcceptTask(del.id)}
                    className="w-full py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Accept Task & Start Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
