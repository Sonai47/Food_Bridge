import React from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  Target,
  Eye,
  Award,
  Users2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  const painPoints = [
    {
      observed: '"Is the food safe and properly handled?"',
      pain: 'Food safety concerns',
      response: 'Strict food safety protocols, donor verification, packaging guidelines',
    },
    {
      observed: '"There should be an easy way to donate / I want to help conveniently"',
      pain: 'Inconvenient process',
      response: 'On-time matching, distance-based matching, quick 2-minute posting',
    },
    {
      observed: '"Frustrated by lack of co-ordination when looking for ways to help"',
      pain: 'Lack of central co-ordination',
      response: 'Central digital ecosystem connecting donors, shelters, and volunteers',
    },
    {
      observed: '"Users need help with local pickup to facilitate donation"',
      pain: 'Pickup & logistics hassles',
      response: 'Dedicated network of local community volunteers and social workers',
    },
  ];

  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero / Mission Statement */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-[#E9F5ED] px-3.5 py-1.5 rounded-full">
          Mission & Origin
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24332B] tracking-tight">
          Bridging the Gap Between Surplus Food & Hunger
        </h1>
        <p className="text-base text-[#718078] leading-relaxed">
          Every day, large quantities of edible food are thrown away by restaurants, caterers,
          supermarkets, and households, while shelters and low-income families struggle to get
          enough to eat. The barrier is not a shortage of food—it is a shortage of coordination,
          trust, and logistics.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E9F5ED] text-[#176B45] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#24332B]">Our Mission</h2>
          <p className="text-sm text-[#718078] leading-relaxed">
            To create an accessible, zero-friction digital bridge that redirects surplus edible
            meals from commercial kitchens and households directly to vulnerable communities,
            enforcing high safety standards and mobilizing local volunteers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A340] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#24332B]">Our Vision</h2>
          <p className="text-sm text-[#718078] leading-relaxed">
            A resilient community ecosystem where no wholesome food is wasted, local hunger is
            actively mitigated, and every neighborhood has an active, trustworthy volunteer-driven
            redistribution network.
          </p>
        </div>
      </div>

      {/* The Design Thinking Journey Table */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider">
            Human-Centred Ideation
          </span>
          <h3 className="text-2xl font-bold text-[#24332B] mt-1">
            From User Pain Points to Platform Features
          </h3>
          <p className="text-xs text-[#718078] mt-1">
            How our Empathize and Define phases directly shaped every module in FoodBridge:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[#718078] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">User Voice & Thought</th>
                <th className="py-3 px-4">Identified Pain Point</th>
                <th className="py-3 px-4">FoodBridge Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#24332B]">
              {painPoints.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAF7] transition-colors">
                  <td className="py-4 px-4 font-medium italic text-gray-600">{row.observed}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full font-semibold bg-rose-50 text-rose-700">
                      {row.pain}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#176B45]">{row.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heritage Institute Academic Info */}
      <div className="rounded-3xl bg-[#E9F5ED] p-8 sm:p-12 border border-[#36A86B]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#176B45] uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Lab Project</span>
          </div>
          <h3 className="text-xl font-bold text-[#176B45]">
            Heritage Institute of Technology, Kolkata
          </h3>
          <p className="text-xs text-[#24332B]/80 leading-relaxed">
            Department of Computer Science & Engineering (IoT & Cyber Security including Blockchain
            Technology). Design Thinking and Ideation Lab, Academic Year 2026.
          </p>
        </div>

        <Link
          href="/select-role"
          className="px-6 py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all shrink-0"
        >
          Try the Demo Platform
        </Link>
      </div>
    </div>
  );
}
