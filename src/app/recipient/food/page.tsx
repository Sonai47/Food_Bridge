'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { Donation } from '@/types';
import FoodCard from '@/components/food/FoodCard';
import EmptyState from '@/components/common/EmptyState';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Clock,
  MapPin,
  ArrowUpDown,
  Utensils,
  X,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AvailableFoodCatalogPage() {
  const donations = useAppStore((s) => s.donations);
  const users = useAppStore((s) => s.users);
  const createRequest = useAppStore((s) => s.createRequest);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [distanceFilter, setDistanceFilter] = useState('All');
  const [sortOption, setSortOption] = useState<'deadline' | 'quantity' | 'servings'>('deadline');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Quick Request Modal State
  const [requestingDonation, setRequestingDonation] = useState<Donation | null>(null);
  const [requestedPortions, setRequestedPortions] = useState(10);
  const [servingsNeeded, setServingsNeeded] = useState(20);
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('high');
  const [requestNote, setRequestNote] = useState('');

  // Filter available items
  const filteredDonations = donations
    .filter((d) => d.status === 'available')
    .filter((d) => {
      const matchSearch =
        d.foodName.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.address.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'deadline') {
        return new Date(a.pickupDeadline).getTime() - new Date(b.pickupDeadline).getTime();
      }
      if (sortOption === 'quantity') {
        return b.quantity - a.quantity;
      }
      return b.servings - a.servings;
    });

  const handleOpenRequest = (donation: Donation) => {
    setRequestingDonation(donation);
    setRequestedPortions(donation.quantity);
    setServingsNeeded(donation.servings);
  };

  const handleConfirmRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestingDonation) return;

    createRequest({
      donationId: requestingDonation.id,
      requestedQuantity: Number(requestedPortions),
      servingsNeeded: Number(servingsNeeded),
      urgency,
      note: requestNote || 'Needed for community dining distribution.',
    });

    toast.success(`Request submitted for ${requestingDonation.foodName}! The donor will review.`);
    setRequestingDonation(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#24332B]">Available Food Catalog</h2>
        <p className="text-xs text-[#718078] mt-0.5">
          Surplus edible food listings currently available for reservation across Kolkata
        </p>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food by name, ingredients or location..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Cooked Meals">Cooked Meals</option>
            <option value="Bakery">Bakery</option>
            <option value="Fruits">Fresh Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'deadline' | 'quantity' | 'servings')}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
          >
            <option value="deadline">Sort: Pickup Deadline (Urgent)</option>
            <option value="servings">Sort: Highest Servings</option>
            <option value="quantity">Sort: Highest Quantity</option>
          </select>

          {/* Grid / List View Toggle */}
          <div className="flex items-center rounded-xl border border-gray-200 p-0.5 bg-gray-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-[#176B45]' : 'text-gray-400'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white shadow-2xs text-[#176B45]' : 'text-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Display */}
      {filteredDonations.length === 0 ? (
        <EmptyState
          icon={<Utensils className="w-8 h-8 text-[#176B45]" />}
          title="No Food Listings Found"
          description="There are currently no surplus items matching your selected criteria. Try resetting your search filters."
          actionText="Clear Filters"
          onAction={() => {
            setSearch('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredDonations.map((d) => (
            <FoodCard
              key={d.id}
              donation={d}
              onRequestClick={handleOpenRequest}
              showActionButton={true}
            />
          ))}
        </div>
      )}

      {/* Request Modal */}
      {requestingDonation && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#176B45] uppercase tracking-wider">
                  Request Reservation
                </span>
                <h3 className="text-base font-bold text-[#24332B]">
                  {requestingDonation.foodName}
                </h3>
              </div>
              <button
                onClick={() => setRequestingDonation(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRequest} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#F8FAF7] border border-gray-100 text-xs space-y-1">
                <p className="text-[#718078]">
                  Available Total:{' '}
                  <strong className="text-[#24332B]">
                    {requestingDonation.quantity} {requestingDonation.unit} (~
                    {requestingDonation.servings} Servings)
                  </strong>
                </p>
                <p className="text-[#718078]">
                  Location: <strong className="text-[#24332B]">{requestingDonation.address}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#24332B] mb-1">
                    Portions Needed ({requestingDonation.unit}) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={requestingDonation.quantity}
                    value={requestedPortions}
                    onChange={(e) => setRequestedPortions(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#24332B] mb-1">
                    Servings Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={servingsNeeded}
                    onChange={(e) => setServingsNeeded(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24332B] mb-1">
                  Urgency Level *
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                >
                  <option value="high">High Priority (Immediate Need)</option>
                  <option value="medium">Moderate (Next Meal Service)</option>
                  <option value="low">Standard Pantry Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24332B] mb-1">
                  Note to Donor / Pickup Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="e.g. Needed for evening dinner distribution to 30 residents..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRequestingDonation(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#718078] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all cursor-pointer"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
