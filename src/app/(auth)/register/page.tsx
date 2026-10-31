'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { HeartHandshake, ShieldAlert, ArrowRight, Utensils, Building2, Truck, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useAppStore((s) => s.registerUser);

  const [role, setRole] = useState<UserRole>('donor');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) {
      toast.error('Please fill in all mandatory fields.');
      return;
    }

    registerUser({
      name,
      email,
      role,
      organization: organization || undefined,
      phone: phone || '+91 90000 00000',
      address,
    });

    toast.success(`Welcome to FoodBridge as a registered ${role}!`);
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#176B45]">
            Food<span className="text-[#36A86B]">Bridge</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-[#24332B] tracking-tight">
          Create Your FoodBridge Account
        </h2>
        <p className="text-xs text-[#718078] mt-1">
          Join our network of food donors, shelters, and local delivery volunteers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-gray-100 shadow-md space-y-6">
          {/* Step 1: Select Role */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#718078] mb-2.5">
              1. Select Your Community Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRole('donor')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  role === 'donor'
                    ? 'border-[#176B45] bg-[#E9F5ED] text-[#176B45] ring-2 ring-[#176B45]/20'
                    : 'border-gray-200 hover:border-gray-300 text-[#24332B]'
                }`}
              >
                <Utensils className="w-5 h-5 mb-2" />
                <span className="text-xs font-bold block">Food Donor</span>
                <span className="text-[10px] text-[#718078]">Kitchens & Cafes</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('recipient')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  role === 'recipient'
                    ? 'border-[#F4A340] bg-amber-50 text-amber-900 ring-2 ring-[#F4A340]/20'
                    : 'border-gray-200 hover:border-gray-300 text-[#24332B]'
                }`}
              >
                <Building2 className="w-5 h-5 mb-2" />
                <span className="text-xs font-bold block">Recipient / NGO</span>
                <span className="text-[10px] text-[#718078]">Shelters & Banks</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('volunteer')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  role === 'volunteer'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                    : 'border-gray-200 hover:border-gray-300 text-[#24332B]'
                }`}
              >
                <Truck className="w-5 h-5 mb-2" />
                <span className="text-xs font-bold block">Volunteer</span>
                <span className="text-[10px] text-[#718078]">Pickup & Delivery</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#24332B] mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24332B] mb-1">
                  Organization Name {role !== 'volunteer' && '*'}
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={
                    role === 'donor'
                      ? 'e.g. Cafe Bistro'
                      : role === 'recipient'
                      ? 'e.g. City Child Shelter'
                      : 'Independent volunteer'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#24332B] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24332B] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Street Address & Area (Kolkata Metro) *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Sector V, Salt Lake, Kolkata"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Complete Registration & Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-[#718078] pt-2">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-[#176B45] hover:underline">
              Sign in with demo credentials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
