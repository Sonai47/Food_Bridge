'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  BellRing,
  AlertTriangle,
  Send,
  CheckCircle2,
  MapPin,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';
import { formatDateTime, timeAgo } from '@/utils';
import { toast } from 'sonner';

export default function UrgentNeedAlertPage() {
  const urgentNeeds = useAppStore((s) => s.urgentNeeds);
  const createUrgentNeed = useAppStore((s) => s.createUrgentNeed);
  const currentUser = useAppStore((s) => s.currentUser);

  // Form Fields
  const [foodType, setFoodType] = useState('Cooked Meals / Khichdi / Rice');
  const [quantity, setQuantity] = useState(40);
  const [unit, setUnit] = useState('meals');
  const [servingsNeeded, setServingsNeeded] = useState(40);
  const [location, setLocation] = useState(currentUser?.address || 'Bidhannagar, Kolkata');
  const [urgency, setUrgency] = useState<'urgent' | 'high' | 'medium'>('urgent');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createUrgentNeed({
      foodType,
      quantity: Number(quantity),
      unit,
      servingsNeeded: Number(servingsNeeded),
      location,
      urgency,
      additionalDetails,
    });

    toast.success('Urgent Need SOS broadcasted to nearby donors and volunteer networks!');
    setAdditionalDetails('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Priority Emergency Dispatch</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#24332B]">
          Urgent Need SOS Alert
        </h2>
        <p className="text-xs text-[#718078] mt-1">
          When your shelter, orphanage, or community kitchen faces an unexpected food shortage,
          trigger this alert to notify all food donors and volunteers within 10 km immediately.
        </p>
      </div>

      {/* Broadcast Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Food Category Needed *
              </label>
              <input
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                placeholder="e.g. Cooked Dinner Meals / Rice & Dal"
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
                onChange={(e) => setUrgency(e.target.value as 'urgent' | 'high' | 'medium')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              >
                <option value="urgent">Critical (Immediate - Next 1 Hour)</option>
                <option value="high">High (Required for Next Meal)</option>
                <option value="medium">Moderate (Required within 6 Hours)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Estimated Servings / People *
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
                Portion Amount *
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Unit *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              >
                <option value="meals">Prepared Meals / Packets</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="boxes">Boxes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#24332B] mb-1">
              Drop-off Location / Shelter Address *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Shelter gate address for volunteer delivery"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#24332B] mb-1">
              Context & Reason for Urgent Need
            </label>
            <textarea
              rows={3}
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="e.g. Unscheduled influx of 40 families following heavy local rainfall. Kitchen facilities currently disrupted..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <BellRing className="w-4 h-4" />
              <span>Broadcast Urgent SOS Alert</span>
            </button>
          </div>
        </form>
      </div>

      {/* Active Broadcasts History */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#24332B]">Active Community Broadcasts</h3>
        <div className="space-y-3">
          {urgentNeeds.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#24332B]">{alert.id}</span>
                  <StatusBadge status={alert.urgency} />
                  <span className="text-[11px] text-[#718078] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {timeAgo(alert.createdAt)}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#24332B]">{alert.foodType}</h4>
                <p className="text-xs text-[#718078]">
                  Needed: <strong>{alert.servingsNeeded} servings</strong> ({alert.quantity}{' '}
                  {alert.unit}) for <strong>{alert.recipientName}</strong>
                </p>
                {alert.additionalDetails && (
                  <p className="text-xs text-gray-500 italic mt-1">
                    &quot;{alert.additionalDetails}&quot;
                  </p>
                )}
              </div>

              <div className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                Broadcasting to 42 Donors
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
