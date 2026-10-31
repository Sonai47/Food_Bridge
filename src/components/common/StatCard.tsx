import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'green' | 'amber' | 'emerald' | 'blue';
}

const colorStyles = {
  green: {
    iconBg: 'bg-[#E9F5ED]',
    iconColor: 'text-[#176B45]',
    cardBorder: 'border-l-4 border-l-[#176B45]',
  },
  emerald: {
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    cardBorder: 'border-l-4 border-l-emerald-500',
  },
  amber: {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    cardBorder: 'border-l-4 border-l-[#F4A340]',
  },
  blue: {
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    cardBorder: 'border-l-4 border-l-blue-500',
  },
};

export default function StatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  accentColor = 'green',
}: StatCardProps) {
  const styles = colorStyles[accentColor];

  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow ${styles.cardBorder}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#718078] mb-1">
            {label}
          </p>
          <h4 className="text-2xl md:text-3xl font-bold text-[#24332B] tracking-tight">
            {value}
          </h4>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.iconColor}`}>
          {icon}
        </div>
      </div>

      {(subtext || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`font-semibold px-1.5 py-0.5 rounded ${
                trend.isPositive !== false
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtext && <span className="text-[#718078]">{subtext}</span>}
        </div>
      )}
    </div>
  );
}
