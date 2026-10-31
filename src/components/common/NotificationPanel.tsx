'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Bell, Check, Clock, ExternalLink } from 'lucide-react';
import { timeAgo } from '@/utils';
import { Notification } from '@/types';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const notifications = useAppStore((s) => s.notifications);
  const currentUser = useAppStore((s) => s.currentUser);
  const markNotificationAsRead = useAppStore((s) => s.markNotificationAsRead);
  const markAllNotificationsAsRead = useAppStore((s) => s.markAllNotificationsAsRead);

  // Filter for currentUser or system notifications
  const userNotifications = notifications.filter(
    (n) => !currentUser || n.userId === currentUser.id || n.userId === 'all'
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl hover:bg-gray-100 text-[#24332B] transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-[#24332B]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#F4A340] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#F8FAF7]">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[#24332B]">Notifications</h4>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9F5ED] text-[#176B45]">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllNotificationsAsRead()}
                className="text-xs font-semibold text-[#176B45] hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {userNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#718078]">
                No notifications right now
              </div>
            ) : (
              userNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-3.5 hover:bg-[#F8FAF7] transition-colors cursor-pointer flex items-start gap-3 ${
                    !n.read ? 'bg-[#E9F5ED]/30' : ''
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      !n.read ? 'bg-[#176B45]' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#24332B]">{n.title}</p>
                      <span className="text-[10px] text-[#718078] shrink-0">
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[#718078] mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
