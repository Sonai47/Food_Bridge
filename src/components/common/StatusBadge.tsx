import React from 'react';

type BadgeType =
  | 'available'
  | 'matched'
  | 'picked_up'
  | 'delivered'
  | 'cancelled'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'assigned'
  | 'in_transit'
  | 'confirmed'
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

interface StatusBadgeProps {
  status: BadgeType | string;
  className?: string;
}

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  // Donation / Delivery
  available: { label: 'Available', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  matched: { label: 'Matched', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
  assigned: { label: 'Pickup Assigned', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
  picked_up: { label: 'Food Collected', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
  in_transit: { label: 'In Transit', bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  delivered: { label: 'Delivered', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-600' },
  confirmed: { label: 'Confirmed', bg: 'bg-teal-50 border-teal-200', text: 'text-teal-800', dot: 'bg-teal-600' },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-50 border-gray-200', text: 'text-gray-600', dot: 'bg-gray-400' },

  // Request statuses
  pending: { label: 'Pending Review', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500' },
  approved: { label: 'Approved', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  rejected: { label: 'Declined', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500' },

  // Urgency
  low: { label: 'Standard', bg: 'bg-gray-100 border-gray-200', text: 'text-gray-700', dot: 'bg-gray-400' },
  medium: { label: 'Moderate', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
  high: { label: 'High Priority', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
  urgent: { label: 'Urgent Need', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700 animate-pulse', dot: 'bg-rose-600' },
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  const config = statusConfig[normalized] || {
    label: status.replace(/_/g, ' '),
    bg: 'bg-gray-50 border-gray-200',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${config.bg} ${config.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
