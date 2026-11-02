import React from 'react';
import {
  Building2,
  DoorOpen,
  BedDouble,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  UserPlus,
  CreditCard,
  Building,
  CalendarCheck2,
  Receipt as ReceiptIcon,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatCard } from '../common/FlatCard';
import { FlatButton } from '../common/FlatButton';
import { StatusBadge } from '../common/StatusBadge';

export const DashboardView: React.FC = () => {
  const {
    stats,
    payments,
    receipts,
    tenants,
    beds,
    properties,
    selectedPropertyId,
    setActiveTab,
    setActiveReceipt,
    setActiveTenantProfile,
    setIsAddTenantOpen,
    setIsAddPropertyOpen,
    setIsAllocateBedOpen,
    setIsRecordPaymentOpen
  } = useApp();

  const activePropName = selectedPropertyId === 'all'
    ? 'All Properties Portfolio'
    : properties.find(p => p.id === selectedPropertyId)?.name || 'Selected Property';

  const recentPayments = payments.slice(0, 5);

  const overdueTenants = tenants.filter(t => {
    // Check if tenant has overdue rent record
    return t.status === 'ACTIVE';
  });

  return (
    <div className="space-y-8">
      {/* Hero Welcome Poster Section with Flat Geometric Accents */}
      <section className="relative overflow-hidden bg-blue-600 text-white rounded-xl p-8 sm:p-10">
        {/* Subtle flat geometric shapes in background */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-20 right-48 w-56 h-56 rounded-none rotate-12 bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-3/4 w-32 h-32 rounded-lg bg-blue-500/40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-md mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Live Operations Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
              {activePropName}
            </h1>
            <p className="mt-2 text-blue-100 text-sm sm:text-base font-medium max-w-2xl">
              Complete operational control over rooms, tenants, bed allocation, rent cycles, attendance, and instant KYC receipts.
            </p>
          </div>

          {/* Quick Action Buttons Group */}
          <div className="flex flex-wrap items-center gap-3">
            <FlatButton
              variant="secondary"
              size="md"
              onClick={() => setIsAddTenantOpen(true)}
              icon={<UserPlus className="w-4 h-4 text-blue-600" />}
            >
              + Add Tenant
            </FlatButton>
            <FlatButton
              variant="secondary"
              size="md"
              onClick={() => setIsRecordPaymentOpen(true)}
              icon={<CreditCard className="w-4 h-4 text-emerald-600" />}
            >
              + Record Payment
            </FlatButton>
            <FlatButton
              variant="outline"
              size="md"
              onClick={() => setIsAllocateBedOpen(true)}
              className="text-white border-white hover:bg-white hover:text-blue-600"
              icon={<BedDouble className="w-4 h-4" />}
            >
              Allocate Bed
            </FlatButton>
          </div>
        </div>
      </section>

      {/* Primary KPI Cards (9 Essential Metrics) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black uppercase tracking-wider text-gray-900">
            Operational Overview
          </h2>
          <span className="text-xs font-bold text-gray-600 uppercase">
            Updated in real-time
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Card 1: Occupancy Rate */}
          <FlatCard
            color="white"
            bordered
            hoverable
            onClick={() => setActiveTab('properties')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Occupancy Rate
              </span>
              <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                {stats.occupancyRate}%
              </div>
              <div className="mt-1 text-xs font-semibold text-gray-600">
                {stats.occupiedBeds} occupied / {stats.totalBeds - stats.maintenanceBeds} operational beds
              </div>
            </div>
          </FlatCard>

          {/* Card 2: Current Month Revenue */}
          <FlatCard
            color="white"
            bordered
            hoverable
            onClick={() => setActiveTab('rent')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Collected This Month
              </span>
              <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                ₹{stats.currentMonthCollection.toLocaleString('en-IN')}
              </div>
              <div className="mt-1 text-xs font-semibold text-gray-600">
                October 2026 rent collected
              </div>
            </div>
          </FlatCard>

          {/* Card 3: Overdue Rent */}
          <FlatCard
            color="rose"
            hoverable
            onClick={() => setActiveTab('rent')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-700">
                Overdue Rent
              </span>
              <div className="w-10 h-10 rounded-md bg-red-600 text-white flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-tight">
                ₹{stats.overdueRent.toLocaleString('en-IN')}
              </div>
              <div className="mt-1 text-xs font-bold text-red-700">
                {stats.overdueTenantsCount} tenants past due date
              </div>
            </div>
          </FlatCard>

          {/* Card 4: Pending Rent */}
          <FlatCard
            color="amber"
            hoverable
            onClick={() => setActiveTab('rent')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                Total Unpaid Balance
              </span>
              <div className="w-10 h-10 rounded-md bg-amber-500 text-white flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">
                ₹{stats.pendingRent.toLocaleString('en-IN')}
              </div>
              <div className="mt-1 text-xs font-semibold text-amber-800">
                Remaining outstanding this cycle
              </div>
            </div>
          </FlatCard>

          {/* Card 5: Vacant Beds */}
          <FlatCard
            color="white"
            bordered
            hoverable
            onClick={() => setActiveTab('properties')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Available Beds
              </span>
              <div className="w-10 h-10 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center font-bold">
                <DoorOpen className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {stats.vacantBeds}
              </div>
              <div className="mt-1 text-xs font-semibold text-gray-600">
                Ready for immediate allocation
              </div>
            </div>
          </FlatCard>

          {/* Card 6: Occupied Beds */}
          <FlatCard
            color="white"
            bordered
            hoverable
            onClick={() => setActiveTab('properties')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Occupied Beds
              </span>
              <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <BedDouble className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {stats.occupiedBeds}
              </div>
              <div className="mt-1 text-xs font-semibold text-gray-600">
                Active resident stays
              </div>
            </div>
          </FlatCard>

          {/* Card 7: Total Rooms */}
          <FlatCard
            color="white"
            bordered
            hoverable
            onClick={() => setActiveTab('properties')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Rooms Inventory
              </span>
              <div className="w-10 h-10 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center font-bold">
                <Building className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {stats.totalRooms}
              </div>
              <div className="mt-1 text-xs font-semibold text-gray-600">
                Single, Double & Triple units
              </div>
            </div>
          </FlatCard>

          {/* Card 8: Total Properties */}
          <FlatCard
            color="white"
            bordered
            hoverable
            onClick={() => setActiveTab('properties')}
            className="flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Active Properties
              </span>
              <div className="w-10 h-10 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {stats.totalProperties}
              </div>
              <div className="mt-1 text-xs font-semibold text-gray-600">
                PG, Hostel & Co-living
              </div>
            </div>
          </FlatCard>
        </div>
      </section>

      {/* Financial Health Bar & Operational Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Rent Collection Breakdown & Occupancy Bar */}
        <div className="lg:col-span-2 space-y-6">
          <FlatCard color="gray" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black uppercase tracking-wider text-gray-900">
                  Rent Collection Progress (October 2026)
                </h3>
                <p className="text-xs text-gray-600 font-medium">
                  Total billing demand: ₹{(stats.currentMonthCollection + stats.pendingRent).toLocaleString('en-IN')}
                </p>
              </div>
              <FlatButton
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('rent')}
              >
                Manage Dues
              </FlatButton>
            </div>

            {/* Segmented Flat Color Bar */}
            <div className="h-6 w-full bg-gray-300 rounded-md overflow-hidden flex">
              <div
                style={{
                  width: `${
                    stats.currentMonthCollection + stats.pendingRent > 0
                      ? (stats.currentMonthCollection / (stats.currentMonthCollection + stats.pendingRent)) * 100
                      : 0
                  }%`
                }}
                className="bg-emerald-500 h-full transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider"
                title={`Collected: ₹${stats.currentMonthCollection}`}
              >
                Collected
              </div>
              <div
                style={{
                  width: `${
                    stats.currentMonthCollection + stats.pendingRent > 0
                      ? (stats.overdueRent / (stats.currentMonthCollection + stats.pendingRent)) * 100
                      : 0
                  }%`
                }}
                className="bg-red-500 h-full transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider"
                title={`Overdue: ₹${stats.overdueRent}`}
              >
                Overdue
              </div>
              <div
                style={{
                  width: `${
                    stats.currentMonthCollection + stats.pendingRent > 0
                      ? ((stats.pendingRent - stats.overdueRent) / (stats.currentMonthCollection + stats.pendingRent)) * 100
                      : 0
                  }%`
                }}
                className="bg-amber-400 h-full transition-all duration-300"
                title={`Pending: ₹${stats.pendingRent - stats.overdueRent}`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-bold border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-sm"></span>
                <span className="text-gray-900">
                  Collected: ₹{stats.currentMonthCollection.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                <span className="text-gray-900">
                  Overdue: ₹{stats.overdueRent.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-400 rounded-sm"></span>
                <span className="text-gray-900">
                  Upcoming Due: ₹{(stats.pendingRent - stats.overdueRent).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </FlatCard>

          {/* Recent Payments Stream */}
          <FlatCard color="white" bordered>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black uppercase tracking-wider text-gray-900">
                Recent Rent Receipts & Collections
              </h3>
              <FlatButton
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('receipts')}
              >
                View All Receipts &rarr;
              </FlatButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-xs font-black uppercase tracking-wider text-gray-600">
                    <th className="pb-3 px-3">Receipt #</th>
                    <th className="pb-3 px-3">Tenant</th>
                    <th className="pb-3 px-3">Method</th>
                    <th className="pb-3 px-3 text-right">Amount</th>
                    <th className="pb-3 px-3">Date</th>
                    <th className="pb-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentPayments.map(p => {
                    const matchedReceipt = receipts.find(r => r.receiptNumber === p.receiptNumber);
                    const tenant = tenants.find(t => t.id === p.tenantId);

                    return (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3 font-bold text-blue-600">
                          {p.receiptNumber}
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-900">
                          {tenant?.fullName || 'Tenant'}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-700">
                            {p.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-extrabold text-emerald-600">
                          ₹{p.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-600 font-medium">
                          {p.paymentDate}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => matchedReceipt && setActiveReceipt(matchedReceipt)}
                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            <ReceiptIcon className="w-3.5 h-3.5" />
                            Receipt
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </FlatCard>
        </div>

        {/* Right Col: Urgent Operational Tasks (PRD Section 8) */}
        <div className="space-y-6">
          <FlatCard color="dark" className="text-white space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Action Center
              </span>
              <span className="text-xs text-gray-600 font-bold">Needs Attention</span>
            </div>

            <div className="space-y-3">
              {/* Alert 1 */}
              <div
                onClick={() => setActiveTab('rent')}
                className="p-3.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Overdue Payment
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-1 text-sm font-extrabold text-white">
                  {stats.overdueTenantsCount} Tenants Overdue
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  ₹{stats.overdueRent.toLocaleString('en-IN')} outstanding past due date.
                </div>
              </div>

              {/* Alert 2 */}
              <div
                onClick={() => setActiveTab('tenants')}
                className="p-3.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    KYC Verification
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-1 text-sm font-extrabold text-white">
                  Document Check Required
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  Rohan Deshmukh requires address proof verification.
                </div>
              </div>

              {/* Alert 3 */}
              <div
                onClick={() => setActiveTab('properties')}
                className="p-3.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Inventory Available
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-1 text-sm font-extrabold text-white">
                  {stats.vacantBeds} Vacant Beds
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  Ready for walk-in bookings and bed allocation.
                </div>
              </div>

              {/* Alert 4 */}
              <div
                onClick={() => setActiveTab('tenants')}
                className="p-3.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Move-Out In Progress
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-1 text-sm font-extrabold text-white">
                  1 Notice Period Active
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  Devansh Verma (Room 201) scheduled checkout on Nov 14.
                </div>
              </div>
            </div>
          </FlatCard>

          {/* Fast Navigation Quick Links */}
          <FlatCard color="gray" className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-gray-900">
              Operations Shortcuts
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('attendance')}
                className="p-3 bg-white hover:bg-blue-50 text-left rounded-md border border-gray-200 transition-colors cursor-pointer"
              >
                <CalendarCheck2 className="w-4 h-4 text-blue-600 mb-1" />
                <div className="text-xs font-bold text-gray-900">Mark Attendance</div>
                <div className="text-[10px] text-gray-600">Daily check-in register</div>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className="p-3 bg-white hover:bg-emerald-50 text-left rounded-md border border-gray-200 transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-600 mb-1" />
                <div className="text-xs font-bold text-gray-900">Export Reports</div>
                <div className="text-[10px] text-gray-600">Revenue & Occupancy CSV</div>
              </button>
            </div>
          </FlatCard>
        </div>
      </div>
    </div>
  );
};
