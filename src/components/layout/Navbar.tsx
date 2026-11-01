'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { HeartHandshake, Menu, X, ArrowRight, UserCircle, Sparkles } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentUser = useAppStore((s) => s.currentUser);
  const activeRole = useAppStore((s) => s.activeRole);

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
    { name: 'Smart Matching', href: '/matching' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#176B45]">
              Food<span className="text-[#36A86B]">Bridge</span>
            </span>
            <p className="text-[10px] text-[#718078] font-medium hidden sm:block leading-none">
              Surplus to Sustenance
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#176B45] font-semibold'
                    : 'text-[#24332B] hover:text-[#176B45]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / User controls */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/${activeRole || 'donor'}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#E9F5ED] text-[#176B45] hover:bg-[#d8eedf] transition-colors"
              >
                <UserAvatar name={currentUser.name} size="sm" />
                <span>Go to {activeRole ? activeRole.charAt(0).toUpperCase() + activeRole.slice(1) : 'Dashboard'}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#24332B] hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/select-role"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#176B45] text-white hover:bg-[#125737] shadow-sm transition-all"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#24332B] hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#24332B] hover:text-[#176B45]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {currentUser ? (
              <Link
                href={`/${activeRole || 'donor'}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold bg-[#176B45] text-white rounded-xl"
              >
                Go to {activeRole} Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold border border-gray-200 text-[#24332B] rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/select-role"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold bg-[#176B45] text-white rounded-xl"
                >
                  Select Role & Join
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
