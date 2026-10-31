'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

interface DeliveryMapInnerProps {
  donorAddress: string;
  recipientAddress: string;
  donorCoords?: [number, number];
  recipientCoords?: [number, number];
  distanceKm?: number;
}

// Custom DivIcons for beautiful modern markers
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${color};
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-size: 11px;
        font-weight: bold;
      ">
        ${label}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const donorIcon = createCustomIcon('#176B45', 'D');
const recipientIcon = createCustomIcon('#F4A340', 'R');

export default function DeliveryMapInner({
  donorAddress,
  recipientAddress,
  donorCoords = [22.5985, 88.4285], // Kestopur
  recipientCoords = [22.58, 88.41], // Bidhannagar
  distanceKm = 4.2,
}: DeliveryMapInnerProps) {
  const center: [number, number] = [
    (donorCoords[0] + recipientCoords[0]) / 2,
    (donorCoords[1] + recipientCoords[1]) / 2,
  ];

  // Illustrative route waypoint
  const midpoint: [number, number] = [
    (donorCoords[0] + recipientCoords[0]) / 2 + 0.005,
    (donorCoords[1] + recipientCoords[1]) / 2 - 0.002,
  ];

  const polylineCoords = [donorCoords, midpoint, recipientCoords];

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-200 relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={donorCoords} icon={donorIcon}>
          <Popup>
            <div className="text-xs">
              <strong className="text-[#176B45]">Pickup Point (Donor)</strong>
              <p className="mt-1">{donorAddress}</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={recipientCoords} icon={recipientIcon}>
          <Popup>
            <div className="text-xs">
              <strong className="text-[#F4A340]">Drop-off Point (Recipient)</strong>
              <p className="mt-1">{recipientAddress}</p>
            </div>
          </Popup>
        </Marker>

        <Polyline
          positions={polylineCoords}
          pathOptions={{
            color: '#176B45',
            weight: 4,
            dashArray: '8, 8',
            opacity: 0.85,
          }}
        />
      </MapContainer>

      {/* Map Badge Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-gray-200 text-xs shadow-md flex items-center gap-2">
        <Navigation className="w-3.5 h-3.5 text-[#176B45]" />
        <span className="font-semibold text-[#24332B]">{distanceKm} km route</span>
        <span className="text-[#718078]">(Illustrative coordinates)</span>
      </div>
    </div>
  );
}
