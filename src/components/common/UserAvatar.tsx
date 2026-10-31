'use client';

import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export default function UserAvatar({ name, avatar, size = 'md', className = '' }: UserAvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'FB';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold bg-[#E9F5ED] text-[#176B45] border border-[#36A86B]/20 shadow-xs select-none ${sizeClasses[size]} ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
}
