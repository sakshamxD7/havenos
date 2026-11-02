import React from 'react';
import {
  LayoutDashboard,
  Building,
  Users,
  CreditCard,
  Receipt,
  CalendarCheck2,
  BarChart3,
  History,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, stats, tenants } = useApp();

  const registeredPendingCount = tenants.filter(t => t.status === 'REGISTERED').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'properties',
      label: 'Properties & Beds',
      icon: Building,
      badge: stats.vacantBeds > 0 ? `${stats.vacantBeds} Vacant` : null,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'tenants',
      label: 'Tenants & KYC',
      icon: Users,
      badge: registeredPendingCount > 0 ? `${registeredPendingCount} New` : null,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'rent',
      label: 'Rent & Dues',
      icon: CreditCard,
      badge: stats.overdueTenantsCount > 0 ? `${stats.overdueTenantsCount} Overdue` : null,
      badgeColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'receipts',
      label: 'Receipts',
      icon: Receipt,
      badge: null
    },
    {
      id: 'attendance',
      label: 'Daily Attendance',
      icon: CalendarCheck2,
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports & Export',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: History,
      badge: null
    }
  ];

  return (
    <aside className="w-full lg:w-64 bg-gray-100 p-4 shrink-0 flex flex-col gap-2">
      <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider px-3 py-2">
        Main Operations
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-md text-sm font-bold transition-all duration-200 cursor-pointer text-left select-none ${
                isActive
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-700 hover:bg-white hover:text-gray-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 stroke-[2.2] transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'text-gray-600 group-hover:scale-110'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    isActive ? 'bg-white text-blue-900' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick operational tip banner in sidebar */}
      <div className="mt-auto pt-6">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            Quick Status
          </div>
          <div className="mt-2 text-xs text-gray-600 leading-relaxed font-medium">
            Occupancy is at <strong className="text-gray-950">{stats.occupancyRate}%</strong> across all active operational inventory.
          </div>
        </div>
      </div>
    </aside>
  );
};
