import React from 'react';
import Link from 'next/link';
import {
  Utensils,
  Sparkles,
  Truck,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Donor Lists Surplus Food',
      subtitle: 'Restaurants, Bakeries, Caterers, Households',
      description:
        'Donors access a quick, standardized listing form. They specify food items, preparation time, quantity, portion counts, and complete a mandatory 4-point food safety checklist.',
      highlights: [
        'Photo upload for visual verification',
        'Declaration of ingredients and potential allergens',
        'Packaging guidelines (food-grade containers, proper sealing)',
        'Expiry / safe consumption window setting',
      ],
      icon: Utensils,
      color: 'bg-[#E9F5ED] text-[#176B45]',
    },
    {
      number: '02',
      title: 'Smart Matching & Alerting',
      subtitle: 'Distance, Food Type & Urgency Balancing',
      description:
        'FoodBridge continuously runs matching criteria to pair surplus items with the most appropriate nearby beneficiaries, giving priority to urgent community needs.',
      highlights: [
        'Proximity-first routing to keep transit under 30-45 minutes',
        'Cooked perishable meals dispatched immediately',
        'Dry groceries and bakery goods matched to pantry banks',
        'Instant SOS alert broadcast for high-volume donations',
      ],
      icon: Sparkles,
      color: 'bg-amber-50 text-[#F4A340]',
    },
    {
      number: '03',
      title: 'Volunteer Pickup & Safe Drop-off',
      subtitle: 'Community Volunteers & Local Logistics',
      description:
        'A local volunteer accepts the pickup route, physically verifies the packaging condition at the donor location, and transports it directly to the designated shelter or recipient.',
      highlights: [
        'Five-stage delivery tracker from dispatch to confirmation',
        'Digital recipient verification and quality rating',
        'Zero transport cost barrier for donating kitchens',
        'Full transparency and community impact logging',
      ],
      icon: Truck,
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  const safetyProtocols = [
    {
      title: 'Temperature & Timing',
      desc: 'Cooked food must be distributed within 4 hours of preparation or kept properly cooled.',
    },
    {
      title: 'Sealed Containers',
      desc: 'All donations must be sealed in sanitary, food-grade packaging before pickup.',
    },
    {
      title: 'Transparent Labelling',
      desc: 'Allergens (nuts, dairy, gluten) and vegetarian status must be clearly declared.',
    },
    {
      title: 'Recipient Rating',
      desc: 'Recipients confirm freshness upon receipt, keeping donors accountable and trusted.',
    },
  ];

  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-[#E9F5ED] px-3.5 py-1.5 rounded-full">
          Step-by-Step Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24332B] tracking-tight">
          How FoodBridge Connects Surplus with Need
        </h1>
        <p className="text-base text-[#718078] leading-relaxed">
          Developed under a rigorous Design Thinking framework at Heritage Institute of
          Technology, FoodBridge removes the 3 biggest barriers to food donation: safety concerns,
          coordination headaches, and transport logistics.
        </p>
      </div>

      {/* 3 Step Detailed Flow */}
      <div className="space-y-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={step.number}
              className={`bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-[#176B45]/30">{step.number}</span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#24332B]">{step.title}</h3>
                <p className="text-xs font-semibold text-[#176B45] uppercase tracking-wider">
                  {step.subtitle}
                </p>
                <p className="text-sm text-[#718078] leading-relaxed">{step.description}</p>
              </div>

              <div className="lg:col-span-7 bg-[#F8FAF7] rounded-2xl p-6 sm:p-8 border border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#24332B] mb-4">
                  Key Operational Safeguards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#24332B]">
                      <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Food Safety Commitment Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#24332B]">
            Our Food Safety & Trust Framework
          </h2>
          <p className="text-xs sm:text-sm text-[#718078]">
            Survey data revealed that donors and recipients hesitate primarily due to hygiene
            fears. We address this directly with four non-negotiable standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyProtocols.map((proto, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#F8FAF7] border border-gray-100 space-y-2">
              <h4 className="text-sm font-bold text-[#24332B]">{proto.title}</h4>
              <p className="text-xs text-[#718078] leading-relaxed">{proto.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-[#24332B]">Ready to test the platform?</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/select-role"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
          >
            Launch Interactive Demo
          </Link>
          <Link
            href="/matching"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-white text-[#176B45] border border-[#176B45] hover:bg-[#E9F5ED] transition-all"
          >
            Explore Smart Matching
          </Link>
        </div>
      </div>
    </div>
  );
}
