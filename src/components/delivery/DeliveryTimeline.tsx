'use client';

import React from 'react';
import { DeliveryStatus, DeliveryTimelineItem } from '@/types';
import { CheckCircle2, Circle, Clock, PackageCheck, Bike, Truck, CheckCheck } from 'lucide-react';
import { formatTime } from '@/utils';

interface DeliveryTimelineProps {
  timeline: DeliveryTimelineItem[];
  currentStatus: DeliveryStatus;
  onAdvanceStage?: (nextStatus: DeliveryStatus) => void;
  canAdvance?: boolean;
}

const statusOrder: DeliveryStatus[] = ['assigned', 'picked_up', 'in_transit', 'delivered', 'confirmed'];

const stageIcons: Record<DeliveryStatus, React.ReactNode> = {
  assigned: <Clock className="w-4 h-4" />,
  picked_up: <PackageCheck className="w-4 h-4" />,
  in_transit: <Bike className="w-4 h-4" />,
  delivered: <Truck className="w-4 h-4" />,
  confirmed: <CheckCheck className="w-4 h-4" />,
};

export default function DeliveryTimeline({
  timeline,
  currentStatus,
  onAdvanceStage,
  canAdvance = false,
}: DeliveryTimelineProps) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
      <h3 className="text-base font-bold text-[#24332B] mb-6">Delivery Progress</h3>

      <div className="relative">
        <div className="space-y-6">
          {timeline.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const hasTime = !!step.time;

            return (
              <div key={step.status} className="flex items-start gap-4 relative">
                {/* Connecting Line */}
                {idx < timeline.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                      idx < currentIndex ? 'bg-[#176B45]' : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Status Dot/Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                    isCompleted
                      ? 'bg-[#176B45] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                  } ${isCurrent ? 'ring-4 ring-[#E9F5ED]' : ''}`}
                >
                  {isCompleted ? stageIcons[step.status] : <Circle className="w-3.5 h-3.5" />}
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm font-semibold ${
                        isCurrent
                          ? 'text-[#176B45]'
                          : isCompleted
                          ? 'text-[#24332B]'
                          : 'text-[#718078]'
                      }`}
                    >
                      {step.label}
                    </p>
                    {hasTime && (
                      <span className="text-xs text-[#718078] bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                        {formatTime(step.time!)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#718078] mt-0.5">
                    {step.status === 'assigned' && 'Volunteer assigned for local pickup.'}
                    {step.status === 'picked_up' && 'Volunteer inspected packaging and collected food.'}
                    {step.status === 'in_transit' && 'On route to recipient location.'}
                    {step.status === 'delivered' && 'Food handed over at destination.'}
                    {step.status === 'confirmed' && 'Recipient verified condition and meal count.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advance Stage Control */}
      {canAdvance && currentIndex < statusOrder.length - 1 && onAdvanceStage && (
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-[#718078]">
            Next Step: <strong className="text-[#24332B]">{timeline[currentIndex + 1]?.label}</strong>
          </p>
          <button
            onClick={() => onAdvanceStage(statusOrder[currentIndex + 1])}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#176B45] text-white hover:bg-[#125737] shadow-xs transition-colors cursor-pointer"
          >
            Mark as {timeline[currentIndex + 1]?.label}
          </button>
        </div>
      )}
    </div>
  );
}
