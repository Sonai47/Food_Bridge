import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

export function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return `${formatDate(isoString)} at ${formatTime(isoString)}`;
  } catch {
    return isoString;
  }
}

// Deterministic reference timestamp for demo simulation consistency (2026-10-31T17:30:00+05:30)
const DEMO_REFERENCE_TIME = 1793448000000;

export function getTimeRemaining(
  deadlineIso: string,
  referenceTime: number = DEMO_REFERENCE_TIME
): { hours: number; minutes: number; isExpired: boolean; text: string } {
  try {
    const deadline = new Date(deadlineIso).getTime();
    const now = referenceTime;
    const diffMs = deadline - now;

    if (diffMs <= 0) {
      return { hours: 0, minutes: 0, isExpired: true, text: "Pickup deadline passed" };
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return { hours, minutes, isExpired: false, text: `${days} day${days > 1 ? "s" : ""} left` };
    }

    if (hours > 0) {
      return { hours, minutes, isExpired: false, text: `${hours}h ${minutes}m remaining` };
    }

    return { hours: 0, minutes, isExpired: false, text: `${minutes}m remaining (Urgent)` };
  } catch {
    return { hours: 0, minutes: 0, isExpired: false, text: "Valid today" };
  }
}

export function timeAgo(
  isoString: string,
  referenceTime: number = DEMO_REFERENCE_TIME
): string {
  try {
    const time = new Date(isoString).getTime();
    const now = referenceTime;
    const diffSec = Math.floor((now - time) / 1000);

    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  } catch {
    return isoString;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}
