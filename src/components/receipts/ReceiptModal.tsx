import React from 'react';
import { X, Printer, Download, Share2, CheckCircle, Building2, ShieldCheck } from 'lucide-react';
import { Receipt } from '../../types';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, setActiveReceipt } = useApp();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 overflow-y-auto no-print">
      <div className="fixed inset-0" onClick={() => setActiveReceipt(null)} />

      <div className="relative w-full max-w-2xl bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8 shadow-none">
        {/* Modal Action Bar (Hidden during print) */}
        <div className="bg-gray-100 p-4 border-b-2 border-gray-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-black uppercase tracking-wider text-gray-900">
              Official Tax & Rent Receipt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FlatButton
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4" />}
            >
              Print / PDF
            </FlatButton>
            <button
              onClick={() => setActiveReceipt(null)}
              className="p-1 hover:bg-gray-200 rounded text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body (Strict Flat Print Design) */}
        <div className="p-8 sm:p-10 space-y-6 bg-white print-area" id="printable-receipt">
          {/* Header */}
          <div className="flex items-start justify-between border-b-4 border-gray-900 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  HO
                </div>
                <span className="text-xl font-black text-gray-950 uppercase tracking-tight">
                  {activeReceipt.propertyName}
                </span>
              </div>
              <div className="text-xs font-semibold text-gray-600 max-w-md leading-relaxed">
                {activeReceipt.propertyAddress}
              </div>
              <div className="text-[11px] font-bold text-gray-500 mt-1">
                Managed under HavenOS Operating System
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider rounded">
                Payment Cleared
              </span>
              <div className="text-lg font-black text-gray-900 mt-2 font-mono">
                {activeReceipt.receiptNumber}
              </div>
              <div className="text-xs font-bold text-gray-600 mt-0.5">
                Date: {activeReceipt.paymentDate}
              </div>
            </div>
          </div>

          {/* Resident & Room Details */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-lg border-2 border-gray-200">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">
                Received From (Tenant)
              </div>
              <div className="text-base font-black text-gray-900">
                {activeReceipt.tenantName}
              </div>
              <div className="text-xs font-semibold text-gray-700 mt-0.5">
                Contact: {activeReceipt.tenantMobile}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">
                Accommodation Details
              </div>
              <div className="text-base font-black text-gray-900">
                Room {activeReceipt.roomNumber} • Bed {activeReceipt.bedNumber}
              </div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">
                Billing Cycle: {activeReceipt.billingPeriod}
              </div>
            </div>
          </div>

          {/* Payment Breakdown Table */}
          <div className="border-2 border-gray-900 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-white text-xs font-black uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Particulars</th>
                  <th className="p-3.5">Payment Method</th>
                  <th className="p-3.5">Reference / Txn ID</th>
                  <th className="p-3.5 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 border-gray-900 font-semibold">
                <tr>
                  <td className="p-4 font-bold text-gray-900">
                    Monthly Accommodation & Maintenance Rent
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-800">
                      {activeReceipt.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-700">
                    {activeReceipt.referenceNumber}
                  </td>
                  <td className="p-4 text-right font-black text-lg text-emerald-600">
                    ₹{activeReceipt.amountPaid.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Balance Summary */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-gray-600">
                <span>Previous Outstanding Balance:</span>
                <span className="font-bold text-gray-900">
                  ₹{activeReceipt.previousBalance.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-gray-600">
                <span>Amount Realized This Payment:</span>
                <span className="font-bold text-emerald-600">
                  - ₹{activeReceipt.amountPaid.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between font-black text-gray-900 border-t border-gray-200 pt-1 text-sm">
                <span>Remaining Cycle Balance:</span>
                <span className={activeReceipt.remainingBalance > 0 ? 'text-red-600' : 'text-emerald-600'}>
                  ₹{activeReceipt.remainingBalance.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Signature & Seal Block */}
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-between text-right">
              <div className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                Authorized Signatory
              </div>
              <div className="mt-6">
                <div className="font-black text-xs text-gray-900 uppercase">
                  {activeReceipt.authorizedBy}
                </div>
                <div className="text-[10px] font-bold text-gray-500 mt-0.5">
                  Digitally Authenticated System Record
                </div>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="text-[10px] text-gray-600 pt-4 border-t border-gray-200 text-center font-medium leading-relaxed">
            This is an electronically generated and authorized receipt under the HavenOS PG Management OS.
            Preserve for your accounting and taxation records.
          </div>
        </div>

        {/* Footer Close */}
        <div className="bg-gray-100 p-4 border-t-2 border-gray-200 flex justify-end no-print">
          <FlatButton
            variant="secondary"
            size="sm"
            onClick={() => setActiveReceipt(null)}
          >
            Dismiss
          </FlatButton>
        </div>
      </div>
    </div>
  );
};
