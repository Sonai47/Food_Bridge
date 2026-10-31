'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import FoodImage from '@/components/common/FoodImage';
import StatusBadge from '@/components/common/StatusBadge';
import {
  Utensils,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Send,
} from 'lucide-react';
import { formatDate, formatTime, getTimeRemaining } from '@/utils';
import { toast } from 'sonner';

function FoodDetailsInner({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const donations = useAppStore((s) => s.donations);
  const users = useAppStore((s) => s.users);
  const createRequest = useAppStore((s) => s.createRequest);

  const donation = donations.find((d) => d.id === id);
  const donor = donation ? users.find((u) => u.id === donation.donorId) : null;

  // Form State
  const [requestedQuantity, setRequestedQuantity] = useState(
    donation ? donation.quantity : 10
  );
  const [servingsNeeded, setServingsNeeded] = useState(
    donation ? donation.servings : 25
  );
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('high');
  const [note, setNote] = useState('');

  if (!donation) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-[#24332B]">Food Listing Not Found</h2>
        <p className="text-xs text-[#718078]">
          The food donation item you are looking for has expired or was removed.
        </p>
        <Link
          href="/recipient/food"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const timeInfo = getTimeRemaining(donation.pickupDeadline);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createRequest({
      donationId: donation.id,
      requestedQuantity: Number(requestedQuantity),
      servingsNeeded: Number(servingsNeeded),
      urgency,
      note: note || 'Needed for evening community shelter meal distribution.',
    });

    toast.success(`Request submitted for ${donation.foodName}!`);
    router.push('/recipient/requests');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/recipient/food"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Available Food</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs">
            <div className="relative h-72 sm:h-96 w-full">
              <FoodImage
                src={donation.image}
                alt={donation.foodName}
                category={donation.category}
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#176B45] shadow-xs">
                  {donation.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <StatusBadge status={donation.status} />
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs text-[#718078] font-mono">Ref ID: #{donation.id}</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] mt-1">
                  {donation.foodName}
                </h1>
                <p className="text-xs sm:text-sm text-[#718078] leading-relaxed mt-2">
                  {donation.description}
                </p>
              </div>

              {/* Quantity Highlights */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100">
                <div>
                  <span className="text-xs text-[#718078] block">Available Quantity</span>
                  <p className="text-xl font-bold text-[#24332B] mt-0.5">
                    {donation.quantity} {donation.unit}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#718078] block">Estimated Servings</span>
                  <p className="text-xl font-bold text-[#176B45] mt-0.5">
                    ~{donation.servings} Meals
                  </p>
                </div>
              </div>

              {/* Timing & Logistics */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-[#718078] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F4A340]" />
                    Prepared At
                  </span>
                  <span className="font-semibold">{formatTime(donation.preparedAt)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-[#718078] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-500" />
                    Pickup Deadline
                  </span>
                  <span className="font-bold text-rose-600">
                    {formatTime(donation.pickupDeadline)} ({timeInfo.text})
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-[#718078] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#176B45]" />
                    Pickup Location
                  </span>
                  <span className="font-semibold text-right">{donation.address}</span>
                </div>
              </div>

              {/* Food Safety Guarantee Card */}
              {donation.foodSafety && (
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Food Safety Protocols & Allergen Disclosure</span>
                  </div>
                  <div className="text-xs text-emerald-950 space-y-1">
                    <p>
                      <strong>Allergens:</strong> {donation.foodSafety.allergens}
                    </p>
                    <p>
                      <strong>Storage & Handling:</strong> {donation.foodSafety.storage}
                    </p>
                    <p>
                      <strong>Packaging:</strong> Food-grade sealed container confirmed by donor.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Request Reservation Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6 sticky top-24">
          <div>
            <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider">
              Reserve Meals
            </span>
            <h3 className="text-xl font-bold text-[#24332B] mt-1">Request This Donation</h3>
            <p className="text-xs text-[#718078] mt-1">
              Specify your beneficiary count. Once approved, local volunteers will handle pickup.
            </p>
          </div>

          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Requested Quantity ({donation.unit}) *
              </label>
              <input
                type="number"
                min="1"
                max={donation.quantity}
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
              <span className="text-[10px] text-[#718078]">
                Max available: {donation.quantity} {donation.unit}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Portions / Servings Needed *
              </label>
              <input
                type="number"
                min="1"
                value={servingsNeeded}
                onChange={(e) => setServingsNeeded(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Urgency Level *
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              >
                <option value="high">High Priority (Needed Today)</option>
                <option value="medium">Moderate (Next 12 Hours)</option>
                <option value="low">Standard Distribution</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Distribution Purpose / Notes
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Briefly state who will receive these meals (e.g. night shelter residents)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={donation.status !== 'available'}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Submit Donation Request</span>
            </button>
          </form>

          {/* Donor Info Pill */}
          {donor && (
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center font-bold text-xs">
                {donor.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-[#718078] block">Listed By Verified Donor</span>
                <p className="text-xs font-bold text-[#24332B] truncate">{donor.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FoodDetailsPage(props: { params: Promise<{ id: string }> }) {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-2xl mx-auto text-center py-20 text-xs text-[#718078]">
          Loading donation specifications...
        </div>
      }
    >
      <FoodDetailsInner {...props} />
    </React.Suspense>
  );
}
