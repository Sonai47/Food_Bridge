'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { Donation } from '@/types';
import FoodImage from '@/components/common/FoodImage';
import StatusBadge from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { formatDate, formatTime, getTimeRemaining } from '@/utils';
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  PlusCircle,
  Eye,
  Clock,
  MapPin,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function MyDonationsPage() {
  const donations = useAppStore((s) => s.donations);
  const currentUser = useAppStore((s) => s.currentUser);

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  // Filter donations belonging to this donor
  const myDonations = donations.filter(
    (d) => !currentUser || d.donorId === currentUser.id || d.donorId === 'USR001'
  );

  const filteredDonations = myDonations.filter((d) => {
    const matchesSearch =
      d.foodName.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#24332B]">My Food Donations</h2>
          <p className="text-xs text-[#718078] mt-0.5">
            Manage your posted surplus food listings and review distribution status
          </p>
        </div>
        <Link
          href="/donor/add-donation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Donation</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food by name or keywords..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Cooked Meals">Cooked Meals</option>
            <option value="Bakery">Bakery</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="available">Available</option>
            <option value="matched">Matched</option>
            <option value="delivered">Delivered</option>
          </select>

          {/* Grid / Table Toggle */}
          <div className="flex items-center rounded-xl border border-gray-200 p-0.5 bg-gray-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-[#176B45]' : 'text-gray-400'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-[#176B45]' : 'text-gray-400'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {filteredDonations.length === 0 ? (
        <EmptyState
          title="No Donations Found"
          description="You haven't posted any donations matching your filter criteria."
          actionText="Add New Donation"
          actionHref="/donor/add-donation"
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((d) => {
            const timeInfo = getTimeRemaining(d.pickupDeadline);
            return (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full">
                    <FoodImage
                      src={d.image}
                      alt={d.foodName}
                      category={d.category}
                      className="h-full w-full"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#176B45] shadow-xs">
                        {d.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={d.status} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#718078] mb-1">
                      <span>Ref #{d.id}</span>
                      <span>{formatDate(d.createdAt)}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#24332B] mb-1.5 line-clamp-1">
                      {d.foodName}
                    </h3>
                    <p className="text-xs text-[#718078] line-clamp-2 mb-4">
                      {d.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#F8FAF7] text-xs font-medium text-[#24332B] mb-4">
                      <div>Quantity: {d.quantity} {d.unit}</div>
                      <div>~{d.servings} Servings</div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#718078]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#F4A340]" />
                        <span>Deadline: {formatTime(d.pickupDeadline)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                        <span className="truncate">{d.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-gray-50 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedDonation(d)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#176B45] bg-[#E9F5ED] hover:bg-[#d8eedf] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAF7] text-[#718078] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Food Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Quantity / Servings</th>
                  <th className="py-3.5 px-4">Pickup Deadline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[#24332B]">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <FoodImage
                          src={d.image}
                          alt={d.foodName}
                          category={d.category}
                          className="w-10 h-10 rounded-lg shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#24332B] line-clamp-1">{d.foodName}</p>
                          <span className="text-[10px] text-[#718078]">Ref: {d.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{d.category}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold">{d.quantity} {d.unit}</p>
                      <span className="text-[10px] text-[#718078]">~{d.servings} Servings</span>
                    </td>
                    <td className="py-3 px-4">
                      <p>{formatDate(d.pickupDeadline)}</p>
                      <span className="text-[10px] text-[#718078]">{formatTime(d.pickupDeadline)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#176B45] hover:bg-[#E9F5ED] cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#718078] uppercase">
                  Donation #{selectedDonation.id}
                </span>
                <h3 className="text-lg font-bold text-[#24332B]">{selectedDonation.foodName}</h3>
              </div>
              <button
                onClick={() => setSelectedDonation(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
              <FoodImage
                src={selectedDonation.image}
                alt={selectedDonation.foodName}
                category={selectedDonation.category}
                className="w-full h-full"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#24332B] mb-1">Description</h4>
                <p className="text-[#718078] leading-relaxed">{selectedDonation.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#F8FAF7] border border-gray-100">
                <div>
                  <span className="text-[#718078] block">Quantity:</span>
                  <strong className="text-[#24332B] text-sm">{selectedDonation.quantity} {selectedDonation.unit}</strong>
                </div>
                <div>
                  <span className="text-[#718078] block">Estimated Servings:</span>
                  <strong className="text-[#24332B] text-sm">~{selectedDonation.servings} people</strong>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#718078]">Preparation Time:</span>
                  <span className="font-semibold">{formatTime(selectedDonation.preparedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718078]">Pickup Deadline:</span>
                  <span className="font-semibold text-rose-600">{formatTime(selectedDonation.pickupDeadline)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718078]">Pickup Location:</span>
                  <span className="font-semibold text-right">{selectedDonation.address}</span>
                </div>
              </div>

              {selectedDonation.foodSafety && (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Food Safety Protocols</span>
                  </div>
                  <p className="text-[#718078]">
                    <strong>Allergens:</strong> {selectedDonation.foodSafety.allergens}
                  </p>
                  <p className="text-[#718078]">
                    <strong>Handling:</strong> {selectedDonation.foodSafety.storage}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-[#24332B] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
