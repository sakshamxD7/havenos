import React, { useState, useEffect } from 'react';
import { X, LogOut, CheckCircle2, AlertTriangle, Calculator, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutTenantId,
    setCheckoutTenantId,
    tenants,
    rentRecords,
    completeCheckout,
    setActiveTenantProfile
  } = useApp();

  const [checkoutDate, setCheckoutDate] = useState<string>('2026-10-29');
  const [damageCharges, setDamageCharges] = useState<number>(0);
  const [otherCharges, setOtherCharges] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>('');

  const tenant = tenants.find(t => t.id === checkoutTenantId);
  const unpaidRent = rentRecords
    .filter(r => r.tenantId === checkoutTenantId)
    .reduce((acc, curr) => acc + curr.remainingAmount, 0);

  const securityDepositHeld = tenant?.stayInfo?.securityDeposit || 0;

  // Final Settlement = Security Deposit - (Unpaid Rent + Damage Charges + Other Charges)
  // Positive = Refund to tenant from owner
  // Negative = Tenant still owes balance
  const totalDeductions = unpaidRent + damageCharges + otherCharges;
  const netSettlement = securityDepositHeld - totalDeductions;

  if (!isCheckoutOpen || !tenant) return null;

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.confirm(`Confirm checkout and release of Bed for ${tenant.fullName}? This will mark tenant as CHECKED_OUT and make the bed AVAILABLE for immediate occupancy.`)) {
      return;
    }

    completeCheckout(tenant.id, {
      checkoutDate,
      unpaidRent,
      damageCharges,
      otherCharges,
      remarks,
      securityDepositHeld,
      netSettlement
    });

    setIsCheckoutOpen(false);
    setCheckoutTenantId(null);
    setActiveTenantProfile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-lg bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Move-Out & Settlement</h3>
              <p className="text-xs text-red-100 font-medium">Reconcile dues, damage adjustments, and release bed</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 hover:bg-red-700 rounded text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleConfirmCheckout} className="p-6 sm:p-8 space-y-5">
          {/* Tenant summary */}
          <div className="bg-gray-100 p-4 rounded-md space-y-1 text-xs">
            <div className="font-black text-sm text-gray-900">{tenant.fullName}</div>
            <div className="text-gray-600">Mobile: {tenant.mobile}</div>
            <div className="text-gray-600">Joining Date: {tenant.stayInfo?.joiningDate}</div>
          </div>

          {/* Checkout Date */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Final Checkout Date *
            </label>
            <input
              type="date"
              value={checkoutDate}
              onChange={e => setCheckoutDate(e.target.value)}
              required
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            />
          </div>

          {/* Settlement Breakdown Box (PRD Section 31) */}
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg space-y-3 text-xs">
            <div className="flex justify-between font-bold text-gray-700">
              <span>Security Deposit Held:</span>
              <span className="text-emerald-700 font-black">₹{securityDepositHeld.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between font-bold text-gray-700">
              <span>Outstanding Rent Dues:</span>
              <span className="text-red-600 font-black">- ₹{unpaidRent.toLocaleString('en-IN')}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1">
                  Damage Charges (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={damageCharges}
                  onChange={e => setDamageCharges(Number(e.target.value))}
                  className="w-full bg-white text-gray-900 text-xs font-bold p-2 rounded border border-gray-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1">
                  Utility / Cleaning (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={otherCharges}
                  onChange={e => setOtherCharges(Number(e.target.value))}
                  className="w-full bg-white text-gray-900 text-xs font-bold p-2 rounded border border-gray-300 outline-none"
                />
              </div>
            </div>

            {/* Net Settlement Result */}
            <div className="border-t-2 border-gray-300 pt-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                {netSettlement >= 0 ? 'Net Refund Due to Tenant:' : 'Net Balance Owed by Tenant:'}
              </span>
              <span
                className={`text-xl font-black ${
                  netSettlement >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                ₹{Math.abs(netSettlement).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Settlement Notes / Remarks
            </label>
            <input
              type="text"
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              placeholder="e.g. Key returned, room inspection clear, deposit refunded via UPI"
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <FlatButton
              type="button"
              variant="secondary"
              onClick={() => setIsCheckoutOpen(false)}
            >
              Cancel
            </FlatButton>
            <FlatButton
              type="submit"
              variant="danger"
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Complete Checkout & Free Bed
            </FlatButton>
          </div>
        </form>
      </div>
    </div>
  );
};
