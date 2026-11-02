import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  UserPlus,
  BedDouble,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Phone,
  Building,
  CreditCard,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Tenant, TenantStatus } from '../../types';
import { FlatButton } from '../common/FlatButton';
import { FlatCard } from '../common/FlatCard';
import { StatusBadge } from '../common/StatusBadge';

export const TenantsView: React.FC = () => {
  const {
    tenants,
    properties,
    rooms,
    beds,
    rentRecords,
    selectedPropertyId,
    setActiveTenantProfile,
    setIsAddTenantOpen,
    setIsAllocateBedOpen,
    setAllocateTenantId,
    setIsRecordPaymentOpen,
    setPaymentPrefill
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenants = useMemo(() => {
    return tenants.filter(t => {
      // Property filter
      if (selectedPropertyId !== 'all' && t.stayInfo?.propertyId !== selectedPropertyId) {
        return false;
      }

      // Status filter
      if (statusFilter === 'ACTIVE' && t.status !== 'ACTIVE') return false;
      if (statusFilter === 'NOTICE_PERIOD' && t.status !== 'NOTICE_PERIOD') return false;
      if (statusFilter === 'REGISTERED' && t.status !== 'REGISTERED') return false;
      if (statusFilter === 'CHECKED_OUT' && t.status !== 'CHECKED_OUT') return false;
      if (statusFilter === 'KYC_PENDING' && t.kyc.verified) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = t.fullName.toLowerCase().includes(q);
        const matchesMobile = t.mobile.includes(q);
        const matchesEmail = t.email.toLowerCase().includes(q);
        const matchesAadhaar = t.kyc.idNumber.toLowerCase().includes(q);
        return matchesName || matchesMobile || matchesEmail || matchesAadhaar;
      }

      return true;
    });
  }, [tenants, selectedPropertyId, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Tenant Directory & KYC
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Complete lifecycle management of registered residents, verifications, stays, and departures.
          </p>
        </div>

        <FlatButton
          variant="primary"
          size="md"
          onClick={() => setIsAddTenantOpen(true)}
          icon={<UserPlus className="w-5 h-5" />}
        >
          + Add New Tenant
        </FlatButton>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `All (${tenants.length})` },
            { id: 'ACTIVE', label: `Active (${tenants.filter(t => t.status === 'ACTIVE').length})` },
            { id: 'NOTICE_PERIOD', label: `Notice Period (${tenants.filter(t => t.status === 'NOTICE_PERIOD').length})` },
            { id: 'REGISTERED', label: `Unallocated (${tenants.filter(t => t.status === 'REGISTERED').length})` },
            { id: 'KYC_PENDING', label: `KYC Pending (${tenants.filter(t => !t.kyc.verified).length})` },
            { id: 'CHECKED_OUT', label: `Checked Out (${tenants.filter(t => t.status === 'CHECKED_OUT').length})` }
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
            placeholder="Search tenant name or mobile..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold pl-9 pr-4 py-2 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Tenants Table / Directory */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-200 text-xs font-black uppercase tracking-wider text-gray-600">
              <tr>
                <th className="py-3.5 px-4">Resident Name</th>
                <th className="py-3.5 px-4">Property & Room</th>
                <th className="py-3.5 px-4">Monthly Rent</th>
                <th className="py-3.5 px-4">KYC Status</th>
                <th className="py-3.5 px-4">Stay Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 text-xs font-bold">
                    No tenants found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTenants.map(t => {
                  const property = properties.find(p => p.id === t.stayInfo?.propertyId);
                  const room = rooms.find(r => r.id === t.stayInfo?.roomId);
                  const bed = beds.find(b => b.id === t.stayInfo?.bedId);
                  const unpaidRent = rentRecords
                    .filter(r => r.tenantId === t.id)
                    .reduce((acc, curr) => acc + curr.remainingAmount, 0);

                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => setActiveTenantProfile(t)}
                    >
                      {/* Name & Contact */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0">
                            {t.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-extrabold text-gray-900 group-hover:text-blue-600 text-sm">
                              {t.fullName}
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                              {t.mobile}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Property & Room */}
                      <td className="py-4 px-4">
                        {t.stayInfo ? (
                          <div>
                            <div className="font-bold text-gray-900 text-xs">
                              {property?.name || 'Property'}
                            </div>
                            <div className="text-xs font-semibold text-blue-600">
                              Room {room?.roomNumber} • Bed {bed?.bedNumber}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            Unallocated Bed
                          </span>
                        )}
                      </td>

                      {/* Monthly Rent & Dues */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-gray-900 text-xs">
                          ₹{t.stayInfo?.monthlyRent.toLocaleString('en-IN') || 0}/mo
                        </div>
                        {unpaidRent > 0 ? (
                          <div className="text-[11px] font-black text-red-600">
                            ₹{unpaidRent.toLocaleString('en-IN')} Due
                          </div>
                        ) : (
                          <div className="text-[11px] font-bold text-emerald-600">
                            No Dues Pending
                          </div>
                        )}
                      </td>

                      {/* KYC Status */}
                      <td className="py-4 px-4">
                        <StatusBadge
                          status={t.kyc.verified ? 'KYC_VERIFIED' : 'KYC_PENDING'}
                          size="sm"
                        />
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                          {t.kyc.idType} • {t.kyc.idNumber}
                        </div>
                      </td>

                      {/* Stay Status */}
                      <td className="py-4 px-4">
                        <StatusBadge status={t.status} size="sm" />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {t.status === 'REGISTERED' && (
                            <FlatButton
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                setAllocateTenantId(t.id);
                                setIsAllocateBedOpen(true);
                              }}
                              icon={<BedDouble className="w-3.5 h-3.5" />}
                            >
                              Allocate
                            </FlatButton>
                          )}

                          {t.status === 'ACTIVE' && unpaidRent > 0 && (
                            <FlatButton
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const unpaidRec = rentRecords.find(r => r.tenantId === t.id && r.remainingAmount > 0);
                                setPaymentPrefill({ tenantId: t.id, rentRecordId: unpaidRec?.id });
                                setIsRecordPaymentOpen(true);
                              }}
                              className="text-xs"
                            >
                              Pay Rent
                            </FlatButton>
                          )}

                          <FlatButton
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveTenantProfile(t)}
                          >
                            View
                          </FlatButton>
                        </div>
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
