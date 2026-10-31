'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { HeartHandshake, Utensils, Building2, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SelectRolePage() {
  const router = useRouter();
  const loginAsRole = useAppStore((s) => s.loginAsRole);

  const roles = [
    {
      id: 'donor' as UserRole,
      title: 'Food Donor',
      subtitle: 'Restaurants, Bakeries, Supermarkets, Caterers',
      description:
        'Post surplus food listings, manage pickup schedules, verify packaging standards, and track your total community meals contributed.',
      color: 'bg-[#E9F5ED] text-[#176B45]',
      borderHover: 'hover:border-[#176B45]',
      badgeBg: 'bg-emerald-50 text-emerald-800',
      icon: Utensils,
      buttonText: 'Enter as Food Donor',
      href: '/donor',
      bullets: [
        'Quick 2-minute surplus food listing',
        'Direct connection to verified local charities',
        'Comprehensive donation history analytics',
      ],
    },
    {
      id: 'recipient' as UserRole,
      title: 'Recipient / NGO',
      subtitle: 'Shelters, Food Banks, Community Kitchens, Families',
      description:
        'Browse available fresh surplus donations nearby, submit requests with portion requirements, and trigger urgent SOS alerts when food runs low.',
      color: 'bg-amber-50 text-[#F4A340]',
      borderHover: 'hover:border-[#F4A340]',
      badgeBg: 'bg-amber-50 text-amber-900',
      icon: Building2,
      buttonText: 'Enter as Food Recipient',
      href: '/recipient',
      bullets: [
        'Real-time catalog of available edible food',
        'Distance and urgency filtering',
        'Track inbound volunteer delivery status',
      ],
    },
    {
      id: 'volunteer' as UserRole,
      title: 'Community Volunteer',
      subtitle: 'Local Champions, Students, Social Workers',
      description:
        'Pick up safe food containers from local donors, coordinate transit, deliver directly to shelters, and verify meal counts at hand-off.',
      color: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-900',
      icon: Truck,
      buttonText: 'Enter as Volunteer',
      href: '/volunteer',
      bullets: [
        'Browse local pickup tasks with route distance',
        'Interactive 5-stage milestone progression',
        'Record volunteer service hours & impact',
      ],
    },
  ];

  const handleSelectRole = (role: UserRole, targetHref: string) => {
    loginAsRole(role);
    toast.success(`Active role set to ${role.toUpperCase()}`);
    router.push(targetHref);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-[#176B45]">
              Food<span className="text-[#36A86B]">Bridge</span>
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24332B] tracking-tight">
            Select Your Role to Enter the Demo
          </h1>
          <p className="text-sm text-[#718078] max-w-xl mx-auto">
            FoodBridge provides three tailored dashboards. Choose the perspective you want to
            experience. You can switch roles at any time from the sidebar.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className={`bg-white rounded-3xl p-8 border-2 border-gray-100 ${r.borderHover} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${r.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#24332B] mb-1">{r.title}</h3>
                  <p className="text-[11px] font-semibold text-[#718078] uppercase tracking-wider mb-4">
                    {r.subtitle}
                  </p>
                  <p className="text-xs text-[#718078] leading-relaxed mb-6">
                    {r.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-gray-100 mb-8">
                    {r.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#24332B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#176B45] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectRole(r.id, r.href)}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{r.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
