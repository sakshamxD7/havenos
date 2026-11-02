import React, { useState } from 'react';
import { BarChart3, Download, Printer, Filter, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';
import { FlatCard } from '../common/FlatCard';

export const ReportsView: React.FC = () => {
  const {
    properties,
    tenants,
    rentRecords,
    payments,
    attendance,
    beds,
    selectedPropertyId,
    stats
  } = useApp();

  const [reportType, setReportType] = useState<'revenue' | 'occupancy' | 'tenants' | 'dues'>('revenue');

  // CSV Export utility
  const handleExportCSV = () => {
    let headers = '';
    let rows: string[] = [];
    let filename = '';

    if (reportType === 'revenue') {
      filename = 'havenos_revenue_report.csv';
      headers = 'Billing Period,Tenant,Property,Rent Demand,Paid Amount,Remaining Balance,Status\n';
      rows = rentRecords.map(r => {
        const t = tenants.find(item => item.id === r.tenantId)?.fullName || 'Tenant';
        const p = properties.find(item => item.id === r.propertyId)?.name || 'Property';
        return `"${r.billingPeriod}","${t}","${p}",${r.rentAmount},${r.paidAmount},${r.remainingAmount},"${r.status}"`;
      });
    } else if (reportType === 'occupancy') {
      filename = 'havenos_occupancy_report.csv';
      headers = 'Property,Total Beds,Occupied Beds,Vacant Beds,Occupancy Rate %\n';
      rows = properties.map(p => {
        const propBeds = beds.filter(b => b.propertyId === p.id);
        const occ = propBeds.filter(b => b.status === 'OCCUPIED').length;
        const vac = propBeds.filter(b => b.status === 'AVAILABLE').length;
        const rate = propBeds.length > 0 ? Math.round((occ / propBeds.length) * 100) : 0;
        return `"${p.name}",${propBeds.length},${occ},${vac},${rate}%`;
      });
    } else {
      filename = 'havenos_tenants_report.csv';
      headers = 'Tenant Name,Mobile,Email,Status,Property,Monthly Rent,KYC Verified\n';
      rows = tenants.map(t => {
        const p = properties.find(item => item.id === t.stayInfo?.propertyId)?.name || 'N/A';
        return `"${t.fullName}","${t.mobile}","${t.email}","${t.status}","${p}",${t.stayInfo?.monthlyRent || 0},${t.kyc.verified ? 'YES' : 'NO'}`;
      });
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Financial & Operational Reports
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Aggregated business intelligence, collection velocity, occupancy distribution, and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FlatButton
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            icon={<Printer className="w-4 h-4" />}
          >
            Print
          </FlatButton>
          <FlatButton
            variant="primary"
            size="sm"
            onClick={handleExportCSV}
            icon={<Download className="w-4 h-4" />}
          >
            Export to CSV
          </FlatButton>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-gray-200 pb-3">
        {[
          { id: 'revenue', label: 'Revenue & Collection Report' },
          { id: 'occupancy', label: 'Occupancy Distribution' },
          { id: 'tenants', label: 'Tenant Master Registry' }
        ].map(r => (
          <button
            key={r.id}
            onClick={() => setReportType(r.id as any)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${
              reportType === r.id
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Report Content Panels */}
      {reportType === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FlatCard color="white" bordered>
              <div className="text-xs font-black uppercase text-gray-600">Total Billed Demand</div>
              <div className="text-3xl font-black text-gray-900 mt-1">
                ₹{(stats.currentMonthCollection + stats.pendingRent).toLocaleString('en-IN')}
              </div>
            </FlatCard>

            <FlatCard color="white" bordered>
              <div className="text-xs font-black uppercase text-emerald-700">Total Realized Collection</div>
              <div className="text-3xl font-black text-emerald-600 mt-1">
                ₹{stats.currentMonthCollection.toLocaleString('en-IN')}
              </div>
            </FlatCard>

            <FlatCard color="white" bordered>
              <div className="text-xs font-black uppercase text-red-700">Total Outstanding Rent</div>
              <div className="text-3xl font-black text-red-600 mt-1">
                ₹{stats.pendingRent.toLocaleString('en-IN')}
              </div>
            </FlatCard>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 border-b-2 border-gray-200 font-black uppercase text-gray-600">
                <tr>
                  <th className="p-3.5">Resident</th>
                  <th className="p-3.5">Property</th>
                  <th className="p-3.5">Period</th>
                  <th className="p-3.5 text-right">Demand</th>
                  <th className="p-3.5 text-right">Paid</th>
                  <th className="p-3.5 text-right">Balance</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold">
                {rentRecords.map(r => {
                  const t = tenants.find(item => item.id === r.tenantId);
                  const p = properties.find(item => item.id === r.propertyId);
                  return (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-3.5 font-bold text-gray-900">{t?.fullName}</td>
                      <td className="p-3.5 text-gray-700">{p?.name}</td>
                      <td className="p-3.5 font-mono">{r.billingPeriod}</td>
                      <td className="p-3.5 text-right">₹{r.rentAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-right text-emerald-600">₹{r.paidAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-right text-red-600 font-black">₹{r.remainingAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportType === 'occupancy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(p => {
              const pBeds = beds.filter(b => b.propertyId === p.id);
              const occ = pBeds.filter(b => b.status === 'OCCUPIED').length;
              const vac = pBeds.filter(b => b.status === 'AVAILABLE').length;
              const maint = pBeds.filter(b => b.status === 'MAINTENANCE' || b.status === 'BLOCKED').length;
              const rate = pBeds.length - maint > 0 ? Math.round((occ / (pBeds.length - maint)) * 100) : 0;

              return (
                <FlatCard key={p.id} color="white" bordered className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-black text-gray-900 text-sm">{p.name}</span>
                    <span className="text-xs font-black text-emerald-600">{rate}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-4 bg-gray-200 rounded-md overflow-hidden flex">
                    <div style={{ width: `${rate}%` }} className="bg-emerald-500 h-full" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-2 border-t border-gray-100">
                    <div>
                      <div className="text-base text-gray-900">{pBeds.length}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Total Beds</div>
                    </div>
                    <div>
                      <div className="text-base text-blue-600">{occ}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Occupied</div>
                    </div>
                    <div>
                      <div className="text-base text-emerald-600">{vac}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Available</div>
                    </div>
                  </div>
                </FlatCard>
              );
            })}
          </div>
        </div>
      )}

      {reportType === 'tenants' && (
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 border-b-2 border-gray-200 font-black uppercase text-gray-600">
              <tr>
                <th className="p-3.5">Resident</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Property</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">KYC Verified</th>
                <th className="p-3.5 text-right">Rent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {tenants.map(t => {
                const prop = properties.find(p => p.id === t.stayInfo?.propertyId);
                return (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3.5 font-bold text-gray-900">{t.fullName}</td>
                    <td className="p-3.5 text-gray-700">{t.mobile}</td>
                    <td className="p-3.5">{prop?.name || 'Unassigned'}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100">
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {t.kyc.verified ? (
                        <span className="text-emerald-700 font-bold">YES</span>
                      ) : (
                        <span className="text-amber-700 font-bold">PENDING</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right font-bold">
                      ₹{t.stayInfo?.monthlyRent.toLocaleString('en-IN') || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
