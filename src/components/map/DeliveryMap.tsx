'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const DynamicMap = dynamic(() => import('./DeliveryMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-[#718078] gap-2 border border-gray-200">
      <MapPin className="w-6 h-6 animate-bounce text-[#176B45]" />
      <span className="text-xs">Loading route map...</span>
    </div>
  ),
});

interface DeliveryMapProps {
  donorAddress: string;
  recipientAddress: string;
  donorCoords?: [number, number];
  recipientCoords?: [number, number];
  distanceKm?: number;
}

export default function DeliveryMap(props: DeliveryMapProps) {
  return <DynamicMap {...props} />;
}
