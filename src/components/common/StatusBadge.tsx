import React from 'react';

type BadgeType =
  // Bed Statuses
  | 'AVAILABLE'
  | 'OCCUPIED'
  | 'RESERVED'
  | 'MAINTENANCE'
  | 'BLOCKED'
  // Rent Statuses
  | 'PAID'
  | 'PENDING'
  | 'PARTIAL'
  | 'OVERDUE'
  | 'UPCOMING'
  | 'WAIVED'
  // Tenant Statuses
  | 'ACTIVE'
  | 'REGISTERED'
  | 'NOTICE_PERIOD'
  | 'CHECKED_OUT'
  | 'ARCHIVED'
  // Attendance Statuses
  | 'PRESENT'
  | 'ABSENT'
  | 'LEAVE'
  | 'OUT'
  // KYC Status
  | 'KYC_VERIFIED'
  | 'KYC_PENDING';

interface StatusBadgeProps {
  status: BadgeType | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const norm = status.toUpperCase();

  const getStyle = (): { bg: string; text: string; label: string } => {
    switch (norm) {
      case 'AVAILABLE':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'AVAILABLE' };
      case 'OCCUPIED':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'OCCUPIED' };
      case 'RESERVED':
        return { bg: 'bg-amber-100', text: 'text-amber-800', label: 'RESERVED' };
      case 'MAINTENANCE':
        return { bg: 'bg-gray-200', text: 'text-gray-700', label: 'MAINTENANCE' };
      case 'BLOCKED':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'BLOCKED' };

      case 'PAID':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'PAID' };
      case 'PENDING':
        return { bg: 'bg-amber-100', text: 'text-amber-800', label: 'PENDING' };
      case 'PARTIAL':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'PARTIAL PAID' };
      case 'OVERDUE':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'OVERDUE' };
      case 'UPCOMING':
        return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'UPCOMING' };

      case 'ACTIVE':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'ACTIVE STAY' };
      case 'REGISTERED':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'UNALLOCATED' };
      case 'NOTICE_PERIOD':
        return { bg: 'bg-amber-100', text: 'text-amber-800', label: 'NOTICE PERIOD' };
      case 'CHECKED_OUT':
        return { bg: 'bg-gray-200', text: 'text-gray-700', label: 'CHECKED OUT' };

      case 'PRESENT':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'PRESENT' };
      case 'ABSENT':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'ABSENT' };
      case 'LEAVE':
        return { bg: 'bg-amber-100', text: 'text-amber-800', label: 'ON LEAVE' };
      case 'OUT':
        return { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'OUT' };

      case 'KYC_VERIFIED':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'KYC VERIFIED' };
      case 'KYC_PENDING':
        return { bg: 'bg-amber-100', text: 'text-amber-800', label: 'KYC INCOMPLETE' };

      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    }
  };

  const { bg, text, label } = getStyle();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider rounded uppercase select-none ${bg} ${text} ${sizeClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {label}
    </span>
  );
};
