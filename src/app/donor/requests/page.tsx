'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { formatDateTime, timeAgo } from '@/utils';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Building2,
  Clock,
  Utensils,
  MapPin,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DonorRequestsPage() {
  const requests = useAppStore((s) => s.requests);
  const donations = useAppStore((s) => s.donations);
  const users = useAppStore((s) => s.users);
  const updateRequestStatus = useAppStore((s) => s.updateRequestStatus);

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'all') return true;
    return r.status === activeTab;
  });

  const handleAccept = (requestId: string) => {
    updateRequestStatus(requestId, 'approved');
    toast.success(`Request ${requestId} accepted! Volunteer pickup task created.`);
  };

  const handleReject = (requestId: string) => {
    updateRequestStatus(requestId, 'rejected');
    toast.info(`Request ${requestId} declined.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#24332B]">Recipient Pickup Requests</h2>
        <p className="text-xs text-[#718078] mt-0.5">
          Review inbound donation requests from verified food banks, shelters, and community kitchens
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
              activeTab === tab
                ? 'bg-[#176B45] text-white shadow-2xs'
                : 'text-[#718078] hover:text-[#24332B] hover:bg-gray-100'
            }`}
          >
            {tab}
            {tab === 'pending' && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-amber-950 font-black">
                {requests.filter((r) => r.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          icon={<Inbox className="w-8 h-8 text-[#176B45]" />}
          title="No Requests in this View"
          description="There are currently no inbound requests matching this filter status."
        />
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const donation = donations.find((d) => d.id === req.donationId);
            const recipient = users.find((u) => u.id === req.recipientId);

            return (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-extrabold text-sm text-[#24332B]">{req.id}</span>
                    <StatusBadge status={req.status} />
                    <StatusBadge status={req.urgency} />
                    <span className="text-xs text-[#718078] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {timeAgo(req.requestedAt)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Recipient Details */}
                    <div className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-[#176B45]" />
                        <h4 className="font-bold text-xs text-[#24332B]">
                          {recipient?.name || 'Community Recipient'}
                        </h4>
                      </div>
                      <p className="text-xs text-[#718078]">{recipient?.organization || 'Registered Shelter'}</p>
                      <p className="text-[11px] text-[#718078] mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {recipient?.address || 'Kolkata'}
                      </p>
                    </div>

                    {/* Food Requested */}
                    <div className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Utensils className="w-4 h-4 text-[#36A86B]" />
                        <h4 className="font-bold text-xs text-[#24332B]">
                          {donation?.foodName || 'Donation Item'}
                        </h4>
                      </div>
                      <p className="text-xs text-[#24332B] font-semibold">
                        Needed: {req.servingsNeeded} servings ({req.requestedQuantity} portions)
                      </p>
                      {req.note && (
                        <p className="text-[11px] text-[#718078] italic mt-1">
                          &quot;{req.note}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col items-center justify-end gap-2 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="w-full sm:w-auto lg:w-36 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="w-full sm:w-auto lg:w-36 px-4 py-2.5 rounded-xl text-xs font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : (
                    <div className="text-xs text-[#718078] font-semibold py-2 px-3 rounded-xl bg-gray-50 border border-gray-100">
                      Decision Recorded ({req.status})
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
