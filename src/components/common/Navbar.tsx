import React, { useState } from 'react';
import {
  Building2,
  Search,
  Bell,
  Plus,
  ShieldCheck,
  User,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { FlatButton } from './FlatButton';

export const Navbar: React.FC = () => {
  const {
    user,
    setUserRole,
    properties,
    selectedPropertyId,
    setSelectedPropertyId,
    notifications,
    markNotificationRead,
    setIsSearchOpen,
    setIsAddTenantOpen,
    setIsAddPropertyOpen,
    setIsAllocateBedOpen,
    setIsRecordPaymentOpen,
    resetToDemoData,
    setActiveTab
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Property Filter */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110">
                <Building2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-gray-950 block leading-none">
                  HAVEN<span className="text-blue-600">OS</span>
                </span>
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mt-1">
                  PG & Hostel OS
                </span>
              </div>
            </div>

            {/* Property Selector */}
            <div className="hidden md:flex items-center gap-2 pl-4 border-l-2 border-gray-100">
              <label htmlFor="property-selector" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Property:
              </label>
              <select
                id="property-selector"
                value={selectedPropertyId}
                onChange={e => setSelectedPropertyId(e.target.value)}
                className="bg-gray-100 text-gray-900 text-sm font-semibold rounded-md px-3 py-2 border-0 focus:bg-white focus:border-2 focus:border-blue-600 outline-none cursor-pointer"
              >
                <option value="all">🏢 All Properties ({properties.length})</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Trigger */}
          <div className="flex-1 max-w-sm hidden xl:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-md px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span className="truncate">Search tenants, rooms, receipts...</span>
              </span>
              <kbd className="bg-white text-gray-600 text-[10px] font-black px-1.5 py-0.5 rounded border border-gray-200 shrink-0 ml-2">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right Area: Role Switcher, Quick Actions, Notifications, User */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-md">
              {(['owner', 'manager', 'staff'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer ${
                    user.role === role
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <FlatButton
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                onClick={() => setShowQuickActions(!showQuickActions)}
              >
                <span className="hidden sm:inline">Action</span>
              </FlatButton>

              {showQuickActions && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowQuickActions(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-900 rounded-lg p-2 z-50">
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider px-3 py-1.5">
                      Operational Actions
                    </div>
                    <button
                      onClick={() => {
                        setIsAddTenantOpen(true);
                        setShowQuickActions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-blue-50 text-gray-900 rounded flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      Add New Tenant
                    </button>
                    <button
                      onClick={() => {
                        setIsAllocateBedOpen(true);
                        setShowQuickActions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-blue-50 text-gray-900 rounded flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Allocate Bed
                    </button>
                    <button
                      onClick={() => {
                        setIsRecordPaymentOpen(true);
                        setShowQuickActions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-blue-50 text-gray-900 rounded flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-600" />
                      Record Payment
                    </button>
                    {user.role === 'owner' && (
                      <button
                        onClick={() => {
                          setIsAddPropertyOpen(true);
                          setShowQuickActions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-blue-50 text-gray-900 rounded flex items-center gap-2.5 transition-colors cursor-pointer border-t border-gray-100 mt-1 pt-2"
                      >
                        <Plus className="w-4 h-4 text-purple-600" />
                        Create New Property
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5 stroke-[2.2]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-2 border-gray-900 rounded-lg p-3 z-50">
                    <div className="flex items-center justify-between pb-2 border-b-2 border-gray-100 px-2">
                      <span className="font-bold text-sm uppercase tracking-wider text-gray-900">
                        Operational Alerts ({unreadCount})
                      </span>
                      <button
                        onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        Mark All Read
                      </button>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-600">No new alerts</div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.linkTab) setActiveTab(n.linkTab);
                              setShowNotifications(false);
                            }}
                            className={`p-3 text-left rounded-md transition-colors cursor-pointer ${
                              n.read ? 'hover:bg-gray-50' : 'bg-blue-50/70 hover:bg-blue-100/60'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              {n.type === 'overdue' ? (
                                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                              ) : n.type === 'kyc' ? (
                                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <div className="text-xs font-bold text-gray-900">{n.title}</div>
                                <div className="text-xs text-gray-600 mt-0.5 leading-snug">{n.message}</div>
                                <div className="text-[10px] text-gray-600 mt-1 font-semibold">{n.timestamp}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Reset Demo Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all property and tenant data to pristine demo state?')) {
                  resetToDemoData();
                }
              }}
              className="p-2.5 bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-700 rounded-md transition-colors cursor-pointer"
              title="Reset to Demo State"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* User Profile Chip */}
            <div className="hidden xl:flex items-center gap-3 pl-2 border-l-2 border-gray-100">
              <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-900 leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  {user.role} • {user.organizationName.substring(0, 18)}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
