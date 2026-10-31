'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyMeals } from '@/types';

interface ImpactChartProps {
  data: MonthlyMeals[];
  title?: string;
  subtitle?: string;
}

export default function ImpactChart({
  data,
  title = 'Monthly Meals Rescued & Distributed',
  subtitle = 'Community food redirection metrics over the last 6 months',
}: ImpactChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-[#24332B]">{title}</h3>
          <p className="text-xs text-[#718078]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E9F5ED] text-[#176B45]">
            <span className="w-2 h-2 rounded-full bg-[#36A86B]" />
            Meals Rescued
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="mealGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#176B45" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#176B45" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8E4" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#718078', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#718078', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8E4',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                fontSize: '12px',
                color: '#24332B',
              }}
              formatter={(value: number | string | undefined) => [`${value} meals`, 'Meals Saved']}
            />
            <Area
              type="monotone"
              dataKey="meals"
              stroke="#176B45"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#mealGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
