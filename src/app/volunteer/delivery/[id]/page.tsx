'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { DeliveryStatus } from '@/types';
import DeliveryTimeline from '@/components/delivery/DeliveryTimeline';
import DeliveryMap from '@/components/map/DeliveryMap';
import StatusBadge from '@/components/common/StatusBadge';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Utensils,
  Phone,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { formatTime, formatDate } from '@/utils';
import { toast } from 'sonner';

function DeliveryTrackingInner({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const deliveries = useAppStore((s) => s.deliveries);
  const donations = useAppStore((s) => s.donations);
  const requests = useAppStore((s) => s.requests);
  const users = useAppStore((s) => s.users);
  const updateDeliveryStage = useAppStore((s) => s.updateDeliveryStage);

  const delivery = deliveries.find((d) => d.id === id);
  const donation = delivery ? donations.find((d) => d.id === delivery.donationId) : null;
  const request = delivery ? requests.find((r) => r.id === delivery.requestId) : null;
  const donor = donation ? users.find((u) => u.id === donation.donorId) : null;
  const recipient = request ? users.find((u) => u.id === request.recipientId) : null;

  if (!delivery) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-[#24332B]">Delivery Record Not Found</h2>
        <p className="text-xs text-[#718078]">
          The delivery ID #{id} was not found in the dispatch log.
        </p>
        <Link
          href="/volunteer/tasks"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tasks</span>
        </Link>
      </div>
    );
  }

  const handleAdvanceStatus = (nextStatus: DeliveryStatus) => {
    updateDeliveryStage(delivery.id, nextStatus);
    toast.success(`Delivery status updated to: ${nextStatus.replace(/_/g, ' ').toUpperCase()}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/volunteer/assignments"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments</span>
        </Link>
      </div>

      {/* Header bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono font-bold text-sm text-[#176B45]">
              Delivery #{delivery.id}
            </span>
            <StatusBadge status={delivery.status} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#24332B]">
            {donation?.foodName || 'Surplus Meal Package'}
          </h2>
          <p className="text-xs text-[#718078] mt-1">
            Quantity: {donation?.quantity} {donation?.unit} (~{donation?.servings} Servings)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#E9F5ED] text-[#176B45] px-4 py-2 rounded-2xl text-xs font-bold shrink-0">
          <Navigation className="w-4 h-4" />
          <span>{delivery.distanceKm} km Direct Transit</span>
        </div>
      </div>

      {/* Main Grid: Interactive Map + 5-Stage Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Map & Address Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Leaflet Map Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#24332B] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#176B45]" />
                <span>Live Route Simulation</span>
              </h3>
              <span className="text-[10px] text-[#718078] bg-gray-100 px-2.5 py-1 rounded-full">
                OpenStreetMap GIS
              </span>
            </div>

            <DeliveryMap
              donorAddress={delivery.donorAddress}
              recipientAddress={delivery.recipientAddress}
              distanceKm={delivery.distanceKm}
            />
          </div>

          {/* Pickup & Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Donor Address */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#176B45] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Step A: Donor Pickup</span>
              </div>
              <h4 className="font-bold text-sm text-[#24332B]">
                {donor?.name || 'Verified Kitchen'}
              </h4>
              <p className="text-xs text-[#718078]">{delivery.donorAddress}</p>
              {donor?.phone && (
                <p className="text-xs text-[#24332B] font-semibold flex items-center gap-1.5 pt-1">
                  <Phone className="w-3.5 h-3.5 text-[#176B45]" /> {donor.phone}
                </p>
              )}
            </div>

            {/* Recipient Address */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F4A340] uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Step B: Recipient Hand-off</span>
              </div>
              <h4 className="font-bold text-sm text-[#24332B]">
                {recipient?.name || 'Recipient Shelter'}
              </h4>
              <p className="text-xs text-[#718078]">{delivery.recipientAddress}</p>
              {recipient?.phone && (
                <p className="text-xs text-[#24332B] font-semibold flex items-center gap-1.5 pt-1">
                  <Phone className="w-3.5 h-3.5 text-[#F4A340]" /> {recipient.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 5-Stage Timeline Tracker */}
        <div className="lg:col-span-5">
          <DeliveryTimeline
            timeline={delivery.timeline}
            currentStatus={delivery.status}
            canAdvance={true}
            onAdvanceStage={handleAdvanceStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default function DeliveryTrackingPage(props: { params: Promise<{ id: string }> }) {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-2xl mx-auto text-center py-20 text-xs text-[#718078]">
          Loading delivery tracking route...
        </div>
      }
    >
      <DeliveryTrackingInner {...props} />
    </React.Suspense>
  );
}
