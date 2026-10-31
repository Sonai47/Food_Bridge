'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import FoodCard from '@/components/food/FoodCard';
import ImpactChart from '@/components/common/ImpactChart';
import {
  HeartHandshake,
  Utensils,
  Truck,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { formatNumber } from '@/utils';

export default function LandingPage() {
  const donations = useAppStore((s) => s.donations);
  const impact = useAppStore((s) => s.impact);
  const loginAsRole = useAppStore((s) => s.loginAsRole);

  const featuredDonations = donations.slice(0, 3);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E9F5ED] rounded-full blur-3xl -z-10 opacity-70" />
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-amber-50 rounded-full blur-2xl -z-10 opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E9F5ED] text-[#176B45] border border-[#36A86B]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Hunger • Zero Food Waste Community Initiative</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#24332B] tracking-tight leading-[1.15]">
                Good Food Deserves a{' '}
                <span className="text-[#176B45] underline decoration-[#36A86B]/40">
                  Second Chance.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#718078] max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Connecting surplus food with people who need it. Donate food, support communities,
                and help us build a world with less food waste and greater human dignity.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/donor/add-donation"
                  onClick={() => loginAsRole('donor')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-[#176B45] text-white hover:bg-[#125737] shadow-lg shadow-[#176B45]/20 hover:shadow-xl transition-all"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Donate Food</span>
                </Link>

                <Link
                  href="/recipient/food"
                  onClick={() => loginAsRole('recipient')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-white text-[#176B45] border-2 border-[#176B45] hover:bg-[#E9F5ED] transition-all"
                >
                  <span>Find Food</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#718078]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#176B45]" />
                  <span>Verified Safe Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F4A340]" />
                  <span>Under 2-Hour Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#36A86B]" />
                  <span>Trained Volunteers</span>
                </div>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center font-bold">
                      FB
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#24332B]">Live Dispatch Activity</h4>
                      <p className="text-[10px] text-[#718078]">Kolkata Metro Corridor</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Active Now
                  </span>
                </div>

                <div className="space-y-3">
                  {impact.recentActivity.slice(0, 3).map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAF7] border border-gray-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#176B45] shrink-0">
                        {act.type === 'donation' ? (
                          <Utensils className="w-4 h-4" />
                        ) : (
                          <Truck className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#24332B] truncate">{act.label}</p>
                        <p className="text-[10px] text-[#718078]">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[#718078]">Average Transit Time</span>
                  <span className="font-bold text-[#176B45]">32 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-[#24332B]">Real-Time Community Impact</h2>
            <p className="text-xs text-[#718078] mt-1">
              Measurable difference driven by everyday donors, community kitchens, and volunteers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#F8FAF7]">
              <p className="text-2xl lg:text-3xl font-extrabold text-[#176B45]">
                {formatNumber(impact.summary.mealsSaved)}+
              </p>
              <p className="text-xs font-semibold text-[#718078] mt-1">Meals Saved</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAF7]">
              <p className="text-2xl lg:text-3xl font-extrabold text-[#36A86B]">
                {formatNumber(impact.summary.foodRescuedKg)} kg
              </p>
              <p className="text-xs font-semibold text-[#718078] mt-1">Food Rescued</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAF7]">
              <p className="text-2xl lg:text-3xl font-extrabold text-[#24332B]">
                {impact.summary.activeDonors}
              </p>
              <p className="text-xs font-semibold text-[#718078] mt-1">Active Donors</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAF7]">
              <p className="text-2xl lg:text-3xl font-extrabold text-[#F4A340]">
                {impact.summary.ngoPartners}
              </p>
              <p className="text-xs font-semibold text-[#718078] mt-1">NGO Partners</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAF7]">
              <p className="text-2xl lg:text-3xl font-extrabold text-[#176B45]">
                {impact.summary.activeVolunteers}
              </p>
              <p className="text-xs font-semibold text-[#718078] mt-1">Volunteers</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAF7]">
              <p className="text-2xl lg:text-3xl font-extrabold text-[#36A86B]">
                {impact.summary.completedDeliveries}
              </p>
              <p className="text-xs font-semibold text-[#718078] mt-1">Deliveries</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How FoodBridge Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-[#E9F5ED] px-3 py-1 rounded-full">
            Transparent Workflow
          </span>
          <h2 className="text-3xl font-bold text-[#24332B] mt-3">How FoodBridge Works</h2>
          <p className="text-sm text-[#718078] mt-2">
            A reliable 3-stage process bridging surplus edible food to local dining tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col relative">
            <div className="w-12 h-12 rounded-2xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center font-bold text-lg mb-6">
              1
            </div>
            <h3 className="text-lg font-bold text-[#24332B] mb-2">Donate Surplus Food</h3>
            <p className="text-xs text-[#718078] leading-relaxed mb-4">
              Restaurants, caterers, bakeries or households list surplus meals in under 2 minutes,
              specifying portions, preparation time, and packaging compliance.
            </p>
            <div className="mt-auto text-xs text-[#176B45] font-semibold flex items-center gap-1">
              Food safety protocol checklist included <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A340] flex items-center justify-center font-bold text-lg mb-6">
              2
            </div>
            <h3 className="text-lg font-bold text-[#24332B] mb-2">Smart Matching</h3>
            <p className="text-xs text-[#718078] leading-relaxed mb-4">
              Our distance and expiry-aware algorithm recommends donations to the nearest shelter,
              charity, or community kitchen before perishable items expire.
            </p>
            <div className="mt-auto text-xs text-[#F4A340] font-semibold flex items-center gap-1">
              Zero-latency urgent need notifications <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-6">
              3
            </div>
            <h3 className="text-lg font-bold text-[#24332B] mb-2">Volunteers Collect & Deliver</h3>
            <p className="text-xs text-[#718078] leading-relaxed mb-4">
              Nearby community volunteers accept the task, safely pick up containers, and deliver
              them directly to the recipient location with live status milestones.
            </p>
            <div className="mt-auto text-xs text-emerald-600 font-semibold flex items-center gap-1">
              Five-stage verification pipeline <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. User Role Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-[#24332B]">Designed For Every Stakeholder</h2>
          <p className="text-sm text-[#718078] mt-2">
            Choose your role to explore the dedicated dashboard tailored to your daily operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donor */}
          <div className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-[#176B45] transition-all shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center mb-5">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#24332B] mb-2">Food Donors</h3>
            <p className="text-xs text-[#718078] mb-6 flex-1">
              Ideal for restaurants, event caterers, supermarkets, and individuals with surplus
              quality food.
            </p>
            <ul className="space-y-2 text-xs text-[#24332B] mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#176B45]" /> Fast listing form with photo
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#176B45]" /> Automated recipient matching
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#176B45]" /> Zero transport hassle
              </li>
            </ul>
            <Link
              href="/donor"
              onClick={() => loginAsRole('donor')}
              className="w-full py-3 rounded-xl text-center text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] transition-colors"
            >
              Enter Donor Hub
            </Link>
          </div>

          {/* Recipient */}
          <div className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-[#F4A340] transition-all shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A340] flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#24332B] mb-2">Recipients & NGOs</h3>
            <p className="text-xs text-[#718078] mb-6 flex-1">
              For shelters, community kitchens, charitable trusts, and low-income families needing
              fresh meals.
            </p>
            <ul className="space-y-2 text-xs text-[#24332B] mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F4A340]" /> Live catalog of nearby food
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F4A340]" /> Urgent Need SOS alerts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F4A340]" /> Inbound delivery tracking
              </li>
            </ul>
            <Link
              href="/recipient"
              onClick={() => loginAsRole('recipient')}
              className="w-full py-3 rounded-xl text-center text-xs font-bold bg-[#F4A340] text-white hover:bg-[#de8f2f] transition-colors"
            >
              Enter Recipient Portal
            </Link>
          </div>

          {/* Volunteer */}
          <div className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-emerald-600 transition-all shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#24332B] mb-2">Community Volunteers</h3>
            <p className="text-xs text-[#718078] mb-6 flex-1">
              For local champions who handle pickup and delivery using bikes, cars, or on foot.
            </p>
            <ul className="space-y-2 text-xs text-[#24332B] mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Choose nearby delivery tasks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 5-stage progress updater
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Track volunteer impact hours
              </li>
            </ul>
            <Link
              href="/volunteer"
              onClick={() => loginAsRole('volunteer')}
              className="w-full py-3 rounded-xl text-center text-xs font-bold bg-[#36A86B] text-white hover:bg-[#2e8f5b] transition-colors"
            >
              Enter Volunteer Desk
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Featured Food Donations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
              Available Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#24332B] mt-1">
              Featured Surplus Donations
            </h2>
          </div>
          <Link
            href="/recipient/food"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] hover:underline"
          >
            <span>View All Available Food</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDonations.map((donation) => (
            <FoodCard key={donation.id} donation={donation} showActionButton={true} />
          ))}
        </div>
      </section>

      {/* 6. Community Impact Analytics Chart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImpactChart data={impact.monthlyMealsSaved} />
      </section>

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#176B45] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Turn Surplus Food Into Smiles?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Whether you are a chef with extra portions, an NGO feeding children, or a volunteer
              with an hour to spare—your action saves food and feeds families today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/select-role"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-[#176B45] hover:bg-gray-100 shadow-md transition-all"
              >
                Choose Your Role & Join
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                Learn About Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
