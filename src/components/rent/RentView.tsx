import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  Plus,
  ArrowUpRight,
  Receipt as ReceiptIcon,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RentRecord, RentStatus } from '../../types';
import { FlatButton } from '../common/FlatButton';
import { FlatCard } from '../common/FlatCard';
import { StatusBadge } from '../common/StatusBadge';

export const RentView: React.FC = () => {
  const {
    rentRecords,
    tenants,
    properties,
    rooms,
    beds,
    selectedPropertyId,
    setIsRecordPaymentOpen,
    setPaymentPrefill,
    setActiveTenantProfile
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dues KPI totals
  const totalOutstanding = rentRecords
    .filter(r => selectedPropertyId === 'all' || r.propertyId === selectedPropertyId)
    .reduce((acc, curr) => acc + curr.remainingAmount, 0);

  const overdueAmount = rentRecords
    .filter(r => (selectedPropertyId === 'all' || r.propertyId === selectedPropertyId) && r.status === 'OVERDUE')
    .reduce((acc, curr) => acc + curr.remainingAmount, 0);

  const collectedAmount = rentRecords
    .filter(r => selectedPropertyId === 'all' || r.propertyId === selectedPropertyId)
    .reduce((acc, curr) => acc + curr.paidAmount, 0);

  const filteredRecords = useMemo(() => {
    return rentRecords.filter(r => {
      // Property filter
      if (selectedPropertyId !== 'all' && r.propertyId !== selectedPropertyId) return false;

      // Status filter
      if (statusFilter === 'OVERDUE' && r.status !== 'OVERDUE') return false;
      if (statusFilter === 'PENDING' && r.status !== 'PENDING') return false;
      if (statusFilter === 'PARTIAL' && r.status !== 'PARTIAL') return false;
      if (statusFilter === 'PAID' && r.status !== 'PAID') return false;

      // Search tenant
      if (searchQuery.trim()) {
        const tenant = tenants.find(t => t.id === r.tenantId);
        const q = searchQuery.toLowerCase().trim();
        return tenant?.fullName.toLowerCase().includes(q) || tenant?.mobile.includes(q);
      }

      return true;
    });
  }, [rentRecords, selectedPropertyId, statusFilter, searchQuery, tenants]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Rent & Pending Dues Ledger
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Structured financial cycles, partial payment reconciliation, overdue tracking, and automated receipts.
          </p>
        </div>

        <FlatButton
          variant="primary"
          size="md"
          onClick={() => {
            setPaymentPrefill(null);
            setIsRecordPaymentOpen(true);
          }}
          icon={<CreditCard className="w-5 h-5" />}
        >
          + Record Rent Payment
        </FlatButton>
      </div>

      {/* Dues KPI Block (PRD Section 25) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Outstanding */}
        <FlatCard color="white" bordered className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-gray-600">
              Total Outstanding Balance
            </span>
            <div className="w-9 h-9 rounded bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-amber-600 tracking-tight">
              ₹{totalOutstanding.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-semibold text-gray-600 mt-1">
              Unpaid balances across current billing cycle
            </div>
          </div>
        </FlatCard>

        {/* Overdue Total */}
        <FlatCard color="rose" className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-red-700">
              Critical Overdue Dues
            </span>
            <div className="w-9 h-9 rounded bg-red-600 text-white flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-red-600 tracking-tight">
              ₹{overdueAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-bold text-red-700 mt-1">
              Passed due date — immediate collection required
            </div>
          </div>
        </FlatCard>

        {/* Total Collected */}
        <FlatCard color="white" bordered className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-gray-600">
              Total Rent Realized
            </span>
            <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-emerald-600 tracking-tight">
              ₹{collectedAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-semibold text-gray-600 mt-1">
              Successfully paid and receipted
            </div>
          </div>
        </FlatCard>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All Cycles (${rentRecords.length})` },
            { id: 'OVERDUE', label: `Overdue Only (${rentRecords.filter(r => r.status === 'OVERDUE').length})` },
            { id: 'PARTIAL', label: `Partial Paid (${rentRecords.filter(r => r.status === 'PARTIAL').length})` },
            { id: 'PENDING', label: `Pending (${rentRecords.filter(r => r.status === 'PENDING').length})` },
            { id: 'PAID', label: `Paid (${rentRecords.filter(r => r.status === 'PAID').length})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search tenant name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold pl-9 pr-4 py-2 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Dues Ledger Table (PRD Section 24) */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-200 text-xs font-black uppercase tracking-wider text-gray-600">
              <tr>
                <th className="py-3.5 px-4">Resident</th>
                <th className="py-3.5 px-4">Room & Property</th>
                <th className="py-3.5 px-4 text-right">Rent Demand</th>
                <th className="py-3.5 px-4 text-right">Paid</th>
                <th className="py-3.5 px-4 text-right">Pending Balance</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Collection Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500 text-xs font-bold">
                    No rent records matching selected filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map(record => {
                  const tenant = tenants.find(t => t.id === record.tenantId);
                  const property = properties.find(p => p.id === record.propertyId);
                  const room = rooms.find(r => r.id === record.roomId);
                  const bed = beds.find(b => b.id === record.bedId);

                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      {/* Tenant */}
                      <td className="py-4 px-4">
                        <div
                          className="cursor-pointer group"
                          onClick={() => tenant && setActiveTenantProfile(tenant)}
                        >
                          <div className="font-extrabold text-gray-900 group-hover:text-blue-600 text-sm">
                            {tenant?.fullName || 'Resident'}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            {tenant?.mobile}
                          </div>
                        </div>
                      </td>

                      {/* Property & Room */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-bold text-gray-900">
                          {property?.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          Room {room?.roomNumber} • Bed {bed?.bedNumber}
                        </div>
                      </td>

                      {/* Rent */}
                      <td className="py-4 px-4 text-right font-bold text-gray-900 text-xs">
                        ₹{record.rentAmount.toLocaleString('en-IN')}
                      </td>

                      {/* Paid */}
                      <td className="py-4 px-4 text-right font-bold text-emerald-600 text-xs">
                        ₹{record.paidAmount.toLocaleString('en-IN')}
                      </td>

                      {/* Remaining Balance */}
                      <td className="py-4 px-4 text-right font-black text-sm text-red-600">
                        ₹{record.remainingAmount.toLocaleString('en-IN')}
                      </td>

                      {/* Due Date */}
                      <td className="py-4 px-4 text-xs font-bold text-gray-700">
                        {record.dueDate}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <StatusBadge status={record.status} size="sm" />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        {record.remainingAmount > 0 ? (
                          <FlatButton
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setPaymentPrefill({ tenantId: record.tenantId, rentRecordId: record.id });
                              setIsRecordPaymentOpen(true);
                            }}
                          >
                            Collect
                          </FlatButton>
                        ) : (
                          <span className="text-xs font-bold text-emerald-700 px-2 py-1 bg-emerald-50 rounded">
                            Fully Cleared
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
