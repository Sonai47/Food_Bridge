import React from 'react';
import Link from 'next/link';
import { HeartHandshake, MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#24332B] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#36A86B] text-white flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Food<span className="text-[#36A86B]">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Bridging the gap between surplus food and hunger. Empowering restaurants,
              shelters and volunteers to end food waste.
            </p>
            <div className="text-xs text-[#36A86B] font-medium pt-1">
              &quot;Good Food Deserves a Second Chance.&quot;
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#36A86B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#36A86B] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#36A86B] transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/matching" className="hover:text-[#36A86B] transition-colors">
                  Smart Matching
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              User Portals
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/donor" className="hover:text-[#36A86B] transition-colors">
                  Donor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/recipient" className="hover:text-[#36A86B] transition-colors">
                  Recipient Portal
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-[#36A86B] transition-colors">
                  Volunteer Operations
                </Link>
              </li>
              <li>
                <Link href="/select-role" className="hover:text-[#36A86B] transition-colors">
                  Switch Demo Role
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Design Thinking Lab Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              Academic Lab
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Design Thinking and Ideation Lab project by CSE (IoT-CS), Heritage Institute of
              Technology, Kolkata (2026).
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#36A86B]" /> Kolkata, West Bengal
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#36A86B]" /> info@foodbridge.demo
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 FoodBridge Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for community impact
          </p>
        </div>
      </div>
    </footer>
  );
}
