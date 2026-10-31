'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import StatCard from '@/components/common/StatCard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  Bike,
  ClipboardList,
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  ArrowRight,
  Truck,
  Award,
} from 'lucide-react';
import { formatDate, formatTime } from '@/utils';

export default function VolunteerOverviewPage() {
  const deliveries = useAppStore((s) => s.deliveries);
  const impact = useAppStore((s) => s.impact);
  const currentUser = useAppStore((s) => s.currentUser);

  const availableTasks = deliveries.filter((d) => !d.volunteerId || d.status === 'assigned');
  const activeAssignments = deliveries.filter(
    (d) => d.status === 'picked_up' || d.status === 'in_transit'
  );
  const completedDeliveries = deliveries.filter(
    (d) => d.status === 'delivered' || d.status === 'confirmed'
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
            Community Hero Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] mt-1">
            {currentUser?.name || 'Rohan Das'}
          </h2>
          <p className="text-xs text-[#718078] mt-1">
            Registered Volunteer • Sector V / New Town Area • Motorcycle Transport
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/volunteer/tasks"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Available Pickup Tasks ({availableTasks.length})</span>
          </Link>
          <Link
            href="/volunteer/assignments"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#E9F5ED] text-[#176B45] hover:bg-[#d5ebd9] transition-all"
          >
            <Bike className="w-4 h-4" />
            <span>My Active Assignments</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Available Nearby Tasks"
          value={availableTasks.length}
          subtext="Ready for collection"
          icon={<ClipboardList className="w-6 h-6" />}
          accentColor="amber"
        />
        <StatCard
          label="Active Deliveries"
          value={activeAssignments.length}
          subtext="In progress right now"
          icon={<Bike className="w-6 h-6" />}
          accentColor="green"
        />
        <StatCard
          label="Completed Deliveries"
          value={completedDeliveries.length + 18}
          subtext="Meals safely handed over"
          icon={<CheckCircle2 className="w-6 h-6" />}
          accentColor="emerald"
        />
        <StatCard
          label="Volunteer Service"
          value="46 hrs"
          subtext="Community impact credited"
          icon={<Award className="w-6 h-6" />}
          accentColor="blue"
        />
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Urgent Tasks */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#24332B] flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#176B45]" />
              <span>Available Tasks Waiting for Pickup</span>
            </h3>
            <Link
              href="/volunteer/tasks"
              className="text-xs font-semibold text-[#176B45] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {deliveries.slice(0, 2).map((del) => (
              <div
                key={del.id}
                className="p-4 rounded-2xl bg-[#F8FAF7] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#24332B]">{del.id}</span>
                    <StatusBadge status={del.status} />
                    <span className="text-[11px] text-[#718078] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F4A340]" />
                      Deadline: {formatTime(del.pickupDeadline)}
                    </span>
                  </div>

                  <div className="text-xs text-[#718078] space-y-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                      <strong>Pickup:</strong> {del.donorAddress}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F4A340]" />
                      <strong>Drop-off:</strong> {del.recipientAddress}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/volunteer/delivery/${del.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-xs text-center shrink-0"
                >
                  Track / Inspect
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Impact Feed */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#24332B] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#36A86B]" />
            <span>Recent Community Milestones</span>
          </h3>

          <div className="space-y-3">
            {impact.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#24332B]">{act.label}</p>
                  <span className="text-[10px] text-[#718078]">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
