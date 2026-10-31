'use client';

import React from 'react';
import Link from 'next/link';
import { Donation } from '@/types';
import FoodImage from '@/components/common/FoodImage';
import StatusBadge from '@/components/common/StatusBadge';
import { getTimeRemaining } from '@/utils';
import { Clock, MapPin, Users, ShieldCheck, ChevronRight } from 'lucide-react';

interface FoodCardProps {
  donation: Donation;
  donorName?: string;
  distanceKm?: number;
  onRequestClick?: (donation: Donation) => void;
  showActionButton?: boolean;
}

export default function FoodCard({
  donation,
  donorName,
  distanceKm = 2.4,
  onRequestClick,
  showActionButton = true,
}: FoodCardProps) {
  const timeInfo = getTimeRemaining(donation.pickupDeadline);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Food Image & Category Badge */}
      <div className="relative h-48 w-full">
        <FoodImage
          src={donation.image}
          alt={donation.foodName}
          category={donation.category}
          className="h-full w-full"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-xs text-[#176B45] shadow-xs">
            {donation.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge status={donation.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-lg text-[#24332B] group-hover:text-[#176B45] transition-colors line-clamp-1">
              {donation.foodName}
            </h3>
          </div>

          <p className="text-xs text-[#718078] line-clamp-2 mb-4">
            {donation.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#F8FAF7] border border-gray-100 mb-4 text-xs text-[#24332B]">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#176B45]" />
              <span>
                {donation.quantity} {donation.unit}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-[#36A86B]" />
              <span>~{donation.servings} Servings</span>
            </div>
          </div>

          {/* Logistics & Safety Details */}
          <div className="space-y-2 text-xs text-[#718078] mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#176B45] shrink-0" />
              <span className="truncate">{donation.address}</span>
              <span className="ml-auto font-medium text-[#176B45] shrink-0">
                {distanceKm.toFixed(1)} km
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#F4A340] shrink-0" />
              <span className={timeInfo.isExpired ? 'text-rose-600 font-medium' : 'text-[#24332B]'}>
                {timeInfo.text}
              </span>
            </div>

            {donation.foodSafety?.packaged && (
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Packaged food-grade containers</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        {showActionButton && (
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
            <Link
              href={`/recipient/food/${donation.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border border-gray-200 text-[#24332B] hover:bg-gray-50 transition-colors"
            >
              Details
            </Link>

            {donation.status === 'available' ? (
              <button
                onClick={() => onRequestClick?.(donation)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#176B45] text-white hover:bg-[#125737] shadow-xs hover:shadow transition-all cursor-pointer"
              >
                Request
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-medium bg-gray-100 text-gray-500">
                Unavailable
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
