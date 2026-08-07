'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getUserInAppNotifications, markNotificationAsRead } from '@/lib/notification-engine';
import { NotificationItem } from '@/types/notification';
import { Bell, CheckCircle2, ArrowRight, X } from 'lucide-react';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(getUserInAppNotifications());

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  return (
    <div className="relative">
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all focus:outline-none"
        aria-label="Notification Center"
      >
        <Bell className="w-5 h-5 text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl z-50 overflow-hidden animate-fadeIn">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xs text-slate-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[10px]">
                  {unreadCount} New
                </span>
              )}
            </div>

            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400 font-medium">No new notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleMarkRead(n.id)}
                  className={`p-4 space-y-1 cursor-pointer transition-all ${
                    n.isRead ? 'bg-white opacity-70' : 'bg-blue-50/50 font-semibold'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-[#2563EB]">{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                  {n.actionUrl && (
                    <Link
                      href={n.actionUrl}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#2563EB] hover:underline pt-1"
                    >
                      <span>View Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
