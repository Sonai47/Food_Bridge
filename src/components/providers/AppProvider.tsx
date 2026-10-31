'use client';

import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Toaster } from 'sonner';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const setHydrated = useAppStore((s) => s.setHydrated);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return (
    <>
      {children}
      <Toaster position="top-right" richColors closeButton duration={3500} />
    </>
  );
}
