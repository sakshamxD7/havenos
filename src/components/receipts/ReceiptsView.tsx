import React, { useState } from 'react';
import { Receipt as ReceiptIcon, Search, Printer, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';
import { FlatCard } from '../common/FlatCard';

export const ReceiptsView: React.FC = () => {
  const { receipts, selectedPropertyId, setActiveReceipt } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReceipts = receipts.filter(rc => {
    if (selectedPropertyId !== 'all' && rc.propertyId !== selectedPropertyId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        rc.receiptNumber.toLowerCase().includes(q) ||
        rc.tenantName.toLowerCase().includes(q) ||
        rc.referenceNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Official Receipts Repository
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Immutable digital payment vouchers with unique audit numbers and print layouts.
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search receipt #, tenant, or txn..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 text-xs font-bold pl-9 pr-4 py-2.5 rounded-md border-2 border-gray-200 focus:border-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-200 text-xs font-black uppercase tracking-wider text-gray-600">
              <tr>
                <th className="py-3.5 px-4">Receipt Number</th>
                <th className="py-3.5 px-4">Resident</th>
                <th className="py-3.5 px-4">Property & Room</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Channel / Reference</th>
                <th className="py-3.5 px-4 text-right">Amount Paid</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {filteredReceipts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 text-xs font-bold">
                    No receipts recorded yet.
                  </td>
                </tr>
              ) : (
                filteredReceipts.map(rc => (
                  <tr
                    key={rc.id}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    onClick={() => setActiveReceipt(rc)}
                  >
                    <td className="py-4 px-4 font-black font-mono text-blue-600 text-xs">
                      {rc.receiptNumber}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-extrabold text-gray-900 text-sm group-hover:text-blue-600">
                        {rc.tenantName}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {rc.tenantMobile}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-xs font-bold text-gray-900">
                        {rc.propertyName}
                      </div>
                      <div className="text-xs text-gray-600">
                        Room {rc.roomNumber} • Bed {rc.bedNumber}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-bold text-gray-700">
                      {rc.paymentDate}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-800">
                        {rc.paymentMethod}
                      </span>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {rc.referenceNumber}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-black text-sm text-emerald-600">
                      ₹{rc.amountPaid.toLocaleString('en-IN')}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <FlatButton
                        variant="secondary"
                        size="sm"
                        onClick={e => {
                          e.stopPropagation();
                          setActiveReceipt(rc);
                        }}
                        icon={<Printer className="w-3.5 h-3.5" />}
                      >
                        Print
                      </FlatButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
