'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppStore } from '@/store/useAppStore';
import {
  Utensils,
  UploadCloud,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const donationSchema = z.object({
  foodName: z.string().min(3, 'Food name must be at least 3 characters'),
  category: z.string().min(1, 'Please select a food category'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unit: z.string().min(1, 'Unit is required'),
  servings: z.number().min(1, 'Estimated servings must be at least 1'),
  prepDate: z.string().min(1, 'Preparation date is required'),
  prepTime: z.string().min(1, 'Preparation time is required'),
  pickupDeadline: z.string().min(1, 'Pickup deadline is required'),
  description: z.string().min(10, 'Please write a brief description (min 10 characters)'),
  address: z.string().min(5, 'Pickup address is required'),
  allergens: z.string().optional(),
  storageInstructions: z.string().optional(),
  packagingChecked: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the packaging checklist',
  }),
  safetyDeclaration: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the food safety declaration',
  }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function AddDonationPage() {
  const router = useRouter();
  const addDonation = useAppStore((s) => s.addDonation);
  const currentUser = useAppStore((s) => s.currentUser);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const todayStr = '2026-10-31';
  const currentTimeStr = '17:30';
  const deadlineTimeStr = '2026-10-31T21:00';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      foodName: '',
      category: 'Cooked Meals',
      quantity: 10,
      unit: 'kg',
      servings: 30,
      prepDate: todayStr,
      prepTime: currentTimeStr,
      pickupDeadline: deadlineTimeStr,
      description: '',
      address: currentUser?.address || 'Salt Lake Sector V, Kolkata',
      allergens: 'None declared',
      storageInstructions: 'Keep covered and distribute promptly',
      packagingChecked: false,
      safetyDeclaration: false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: DonationFormValues) => {
    const preparedAtIso = `${data.prepDate}T${data.prepTime}:00+05:30`;
    const deadlineIso = data.pickupDeadline.includes('+')
      ? data.pickupDeadline
      : `${data.pickupDeadline}:00+05:30`;

    addDonation({
      foodName: data.foodName,
      category: data.category,
      description: data.description,
      quantity: data.quantity,
      unit: data.unit,
      servings: data.servings,
      preparedAt: preparedAtIso,
      pickupDeadline: deadlineIso,
      address: data.address,
      image:
        imagePreview ||
        (data.category === 'Bakery'
          ? '/images/food/bread-buns.jpg'
          : data.category === 'Fruits'
          ? '/images/food/fruit-boxes.jpg'
          : '/images/food/vegetable-pulao.jpg'),
      foodSafety: {
        packaged: data.packagingChecked,
        allergens: data.allergens || 'None declared',
        storage: data.storageInstructions || 'Keep covered; distribute promptly',
      },
    });

    toast.success('Food donation posted successfully! Smart matching is now active.');
    router.push('/donor/donations');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-[#24332B]">List a Surplus Food Donation</h2>
        <p className="text-xs text-[#718078] mt-1">
          Provide complete details regarding preparation and food safety for our recipient network.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-[#E9F5ED] text-[#176B45] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="font-bold text-base text-[#24332B]">Food Item Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Food Name / Title *
              </label>
              <input
                type="text"
                {...register('foodName')}
                placeholder="e.g. Mixed Vegetable Khichdi & Salad"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
              {errors.foodName && (
                <p className="text-xs text-rose-500 mt-1">{errors.foodName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Category *
              </label>
              <select
                {...register('category')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              >
                <option value="Cooked Meals">Cooked Meals</option>
                <option value="Bakery">Bakery & Breads</option>
                <option value="Fruits">Fresh Fruits</option>
                <option value="Vegetables">Raw Vegetables</option>
                <option value="Groceries">Packaged Groceries</option>
                <option value="Dairy">Dairy Products</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Total Quantity *
              </label>
              <input
                type="number"
                step="any"
                {...register('quantity', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
              {errors.quantity && (
                <p className="text-xs text-rose-500 mt-1">{errors.quantity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Measurement Unit *
              </label>
              <select
                {...register('unit')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="portions">Portions / Plates</option>
                <option value="boxes">Containers / Boxes</option>
                <option value="pieces">Pieces</option>
                <option value="litres">Litres</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Number of Servings (approx) *
              </label>
              <input
                type="number"
                {...register('servings', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
              {errors.servings && (
                <p className="text-xs text-rose-500 mt-1">{errors.servings.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#24332B] mb-1">
              Food Description & Preparation Notes *
            </label>
            <textarea
              rows={3}
              {...register('description')}
              placeholder="Freshly prepared lunch surplus. Packed safely in sealed food-grade containers..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Photo Upload with Preview */}
          <div>
            <label className="block text-xs font-semibold text-[#24332B] mb-2">
              Food Photo (Visual Verification)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="w-full sm:w-1/2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                <UploadCloud className="w-8 h-8 text-[#176B45] mb-2" />
                <span className="text-xs font-bold text-[#24332B]">Click to upload photo</span>
                <span className="text-[10px] text-[#718078] mt-0.5">JPEG, PNG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {imagePreview ? (
                <div className="w-full sm:w-1/2 h-36 rounded-2xl overflow-hidden border border-gray-200 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                    Preview
                  </span>
                </div>
              ) : (
                <div className="w-full sm:w-1/2 h-36 rounded-2xl bg-[#F8FAF7] border border-gray-100 flex items-center justify-center text-xs text-[#718078]">
                  Category stock photo will be used as fallback
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Timing & Logistics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F4A340] flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h3 className="font-bold text-base text-[#24332B]">Preparation & Pickup Deadlines</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Preparation Date *
              </label>
              <input
                type="date"
                {...register('prepDate')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Preparation Time *
              </label>
              <input
                type="time"
                {...register('prepTime')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Must be Picked Up By *
              </label>
              <input
                type="datetime-local"
                {...register('pickupDeadline')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#24332B] mb-1">
              Pickup Address *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                {...register('address')}
                placeholder="Kitchen address for volunteer collection"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>
            {errors.address && (
              <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Section 3: Food Safety & Packaging Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h3 className="font-bold text-base text-[#24332B]">Food Safety Protocols</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Declared Allergens
              </label>
              <input
                type="text"
                {...register('allergens')}
                placeholder="e.g. Contains dairy, peanuts, gluten"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#24332B] mb-1">
                Storage & Handling Instructions
              </label>
              <input
                type="text"
                {...register('storageInstructions')}
                placeholder="e.g. Keep chilled below 4°C, consume within 4 hours"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#176B45] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100 cursor-pointer">
              <input
                type="checkbox"
                {...register('packagingChecked')}
                className="mt-0.5 rounded text-[#176B45] focus:ring-[#176B45]"
              />
              <div className="text-xs">
                <strong className="text-[#24332B] block">Packaging Checklist Confirmed</strong>
                <span className="text-[#718078]">
                  Food is cleanly packed in sealed food-grade containers, labelled with preparation
                  date, and maintained at a safe temperature.
                </span>
              </div>
            </label>
            {errors.packagingChecked && (
              <p className="text-xs text-rose-500">{errors.packagingChecked.message}</p>
            )}

            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#E9F5ED]/40 border border-[#36A86B]/20 cursor-pointer">
              <input
                type="checkbox"
                {...register('safetyDeclaration')}
                className="mt-0.5 rounded text-[#176B45] focus:ring-[#176B45]"
              />
              <div className="text-xs">
                <strong className="text-[#176B45] block">Food Safety & Quality Declaration</strong>
                <span className="text-[#718078]">
                  I declare that this surplus food was prepared in a hygienic kitchen, is wholesome,
                  edible, and safe for human consumption at the time of pickup.
                </span>
              </div>
            </label>
            {errors.safetyDeclaration && (
              <p className="text-xs text-rose-500">{errors.safetyDeclaration.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl text-xs font-semibold border border-gray-200 text-[#24332B] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl text-xs font-bold bg-[#176B45] text-white hover:bg-[#125737] shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>Publish Donation Listing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
