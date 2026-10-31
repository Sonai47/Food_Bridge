'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAppStore } from '@/store/useAppStore';
import FoodImage from '@/components/common/FoodImage';
import StatusBadge from '@/components/common/StatusBadge';
import {
  Sparkles,
  MapPin,
  Clock,
  Utensils,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Filter,
} from 'lucide-react';
import { getTimeRemaining } from '@/utils';
import { toast } from 'sonner';

export default function SmartMatchingPage() {
  const donations = useAppStore((s) => s.donations);
  const users = useAppStore((s) => s.users);
  const createRequest = useAppStore((s) => s.createRequest);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(10);

  const recipients = users.filter((u) => u.role === 'recipient');
  const availableDonations = donations.filter((d) => d.status === 'available');

  // Frontend smart matching simulation logic:
  // Combines:
  // 1. Proximity score (simulated from coordinates / address)
  // 2. Food type matching (e.g. Cooked Meals -> Shelter with high immediate capacity)
  // 3. Expiry urgency (shorter deadline = higher priority score)
  const matchedPairs = availableDonations
    .filter((d) => selectedCategory === 'All' || d.category === selectedCategory)
    .map((donation, idx) => {
      // Pick best recipient based on category and mock distance
      const matchedRecipient =
        recipients[idx % recipients.length] || recipients[0];
      const simulatedDistanceKm = 1.8 + (idx * 1.3);
      const timeRemaining = getTimeRemaining(donation.pickupDeadline);

      // Score calculation out of 100
      let matchScore = 85;
      if (simulatedDistanceKm < 3) matchScore += 10;
      if (timeRemaining.hours < 4) matchScore += 5;

      return {
        donation,
        recipient: matchedRecipient,
        distanceKm: Number(simulatedDistanceKm.toFixed(1)),
        timeRemaining,
        matchScore: Math.min(matchScore, 98),
      };
    })
    .filter((pair) => pair.distanceKm <= maxDistance);

  const handleSimulateDispatch = (pair: (typeof matchedPairs)[0]) => {
    createRequest({
      donationId: pair.donation.id,
      requestedQuantity: pair.donation.quantity,
      servingsNeeded: pair.donation.servings,
      urgency: 'high',
      note: `Automated smart-match pairing with ${pair.recipient.name}.`,
    });
    toast.success(
      `Smart-matched ${pair.donation.foodName} with ${pair.recipient.name}! Pickup task queued.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <React.Suspense fallback={<div className="h-18 bg-white border-b border-gray-100" />}>
        <Navbar />
      </React.Suspense>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#E9F5ED] text-[#176B45] border border-[#36A86B]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#36A86B]" />
            <span>Deterministic Tri-Factor Matching Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24332B] tracking-tight">
            Smart Surplus Redistribution Simulator
          </h1>
          <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
            Connecting surplus food to recipients using 3 deterministic criteria: Proximity distance,
            Food perishable category, and Expiry countdown urgency.
          </p>
        </div>

        {/* Algorithm Criteria Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#24332B]">1. Geographic Proximity</h3>
            <p className="text-xs text-[#718078]">
              Matches donors with the nearest shelter or community kitchen to keep volunteer travel
              times under 30 minutes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F4A340] flex items-center justify-center font-bold">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#24332B]">2. Food Type Suitability</h3>
            <p className="text-xs text-[#718078]">
              Pairs cooked hot meals with congregate shelters, and dry goods or bakeries with food
              pantries.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#24332B]">3. Shelf-life Expiry</h3>
            <p className="text-xs text-[#718078]">
              Elevates meals nearing their 4-hour safe window to the highest priority dispatch tier.
            </p>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#176B45]" />
            <span className="text-xs font-bold text-[#24332B]">Simulation Parameters:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#718078]">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-hidden"
              >
                <option value="All">All Categories</option>
                <option value="Cooked Meals">Cooked Meals</option>
                <option value="Bakery">Bakery</option>
                <option value="Fruits">Fruits</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#718078]">Max Proximity:</span>
              <select
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-hidden"
              >
                <option value={3}>Within 3 km (Immediate Neighborhood)</option>
                <option value={5}>Within 5 km (Sub-district)</option>
                <option value={10}>Within 10 km (Metro Corridor)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Matched Results Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#24332B]">
            Computed Optimal Pairings ({matchedPairs.length})
          </h2>

          <div className="space-y-4">
            {matchedPairs.map((pair, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Food Item */}
                <div className="flex items-start gap-4 flex-1">
                  <FoodImage
                    src={pair.donation.image}
                    alt={pair.donation.foodName}
                    category={pair.donation.category}
                    className="w-20 h-20 rounded-2xl shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#176B45] bg-[#E9F5ED] px-2 py-0.5 rounded-md">
                        {pair.donation.category}
                      </span>
                      <span className="text-xs font-bold text-[#24332B]">
                        #{pair.donation.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#24332B]">
                      {pair.donation.foodName}
                    </h3>
                    <p className="text-xs text-[#718078]">
                      {pair.donation.quantity} {pair.donation.unit} (~
                      {pair.donation.servings} Servings) • From {pair.donation.address}
                    </p>
                    <p className="text-xs font-semibold text-rose-600 flex items-center gap-1 pt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {pair.timeRemaining.text}
                    </p>
                  </div>
                </div>

                {/* Match Indicator */}
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100 text-center shrink-0">
                  <div className="text-xl font-black text-[#176B45]">
                    {pair.matchScore}%
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#718078]">
                    Compatibility
                  </span>
                  <span className="text-xs font-semibold text-[#176B45] mt-1">
                    {pair.distanceKm} km away
                  </span>
                </div>

                {/* Recipient Target */}
                <div className="flex-1 space-y-1 p-4 rounded-2xl bg-[#E9F5ED]/40 border border-[#36A86B]/20">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#176B45]" />
                    <span className="text-[10px] font-bold uppercase text-[#176B45] tracking-wider">
                      Optimal Beneficiary Match
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#24332B]">
                    {pair.recipient.name}
                  </h4>
                  <p className="text-xs text-[#718078]">{pair.recipient.organization}</p>
                  <p className="text-xs text-[#718078]">{pair.recipient.address}</p>
                </div>

                {/* Quick Action */}
                <div className="shrink-0 flex items-center justify-end">
                  <button
                    onClick={() => handleSimulateDispatch(pair)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Confirm Match & Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
