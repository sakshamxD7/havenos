import React, { useState, useEffect } from 'react';
import { X, CreditCard, CheckCircle2, Receipt as ReceiptIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { FlatButton } from '../common/FlatButton';

export const RecordPaymentModal: React.FC = () => {
  const {
    isRecordPaymentOpen,
    setIsRecordPaymentOpen,
    paymentPrefill,
    setPaymentPrefill,
    rentRecords,
    tenants,
    recordPayment,
    setActiveReceipt
  } = useApp();

  const [selectedRentRecordId, setSelectedRentRecordId] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Unpaid rent records
  const unpaidRecords = rentRecords.filter(r => r.remainingAmount > 0);

  useEffect(() => {
    if (paymentPrefill?.rentRecordId) {
      setSelectedRentRecordId(paymentPrefill.rentRecordId);
      const matched = rentRecords.find(r => r.id === paymentPrefill.rentRecordId);
      if (matched) {
        setPaymentAmount(matched.remainingAmount);
      }
    } else if (unpaidRecords.length > 0) {
      setSelectedRentRecordId(unpaidRecords[0].id);
      setPaymentAmount(unpaidRecords[0].remainingAmount);
    }
    // Auto-generate reference id placeholder
    setReferenceNumber(`UPI/${Date.now().toString().slice(-8)}`);
  }, [paymentPrefill, rentRecords]);

  if (!isRecordPaymentOpen) return null;

  const currentRecord = rentRecords.find(r => r.id === selectedRentRecordId);
  const currentTenant = tenants.find(t => t.id === currentRecord?.tenantId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRentRecordId) {
      alert('Please select an active rent cycle.');
      return;
    }
    if (paymentAmount <= 0) {
      alert('Payment amount must be greater than zero.');
      return;
    }
    if (currentRecord && paymentAmount > currentRecord.remainingAmount) {
      alert(`Payment amount (₹${paymentAmount}) cannot exceed remaining balance (₹${currentRecord.remainingAmount}).`);
      return;
    }

    const generatedReceipt = recordPayment(
      selectedRentRecordId,
      Number(paymentAmount),
      paymentMethod,
      referenceNumber,
      notes
    );

    setIsRecordPaymentOpen(false);
    setPaymentPrefill(null);

    // Immediately open Receipt Modal for preview / print!
    if (generatedReceipt) {
      setActiveReceipt(generatedReceipt);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsRecordPaymentOpen(false)} />

      <div className="relative w-full max-w-lg bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Record Rent Collection</h3>
              <p className="text-xs text-emerald-100 font-medium">Log cash, UPI, or bank remittance with instant receipting</p>
            </div>
          </div>
          <button
            onClick={() => setIsRecordPaymentOpen(false)}
            className="p-1 hover:bg-emerald-700 rounded text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Select Dues Record */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Select Outstanding Rent Demand *
            </label>
            <select
              value={selectedRentRecordId}
              onChange={e => {
                setSelectedRentRecordId(e.target.value);
                const rec = rentRecords.find(r => r.id === e.target.value);
                if (rec) setPaymentAmount(rec.remainingAmount);
              }}
              required
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            >
              {unpaidRecords.length === 0 ? (
                <option value="">No unpaid rent records found</option>
              ) : (
                unpaidRecords.map(r => {
                  const t = tenants.find(item => item.id === r.tenantId);
                  return (
                    <option key={r.id} value={r.id}>
                      {t?.fullName} • {r.billingPeriod} • Pending: ₹{r.remainingAmount.toLocaleString('en-IN')}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          {/* Dues Balance Summary Callout */}
          {currentRecord && (
            <div className="bg-gray-100 p-4 rounded-md space-y-1 text-xs">
              <div className="flex justify-between text-gray-600 font-semibold">
                <span>Total Cycle Rent:</span>
                <span className="font-bold text-gray-900">₹{currentRecord.rentAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-semibold">
                <span>Already Paid:</span>
                <span className="font-bold text-emerald-600">₹{currentRecord.paidAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-black border-t border-gray-200 pt-1 text-sm">
                <span>Remaining Balance Due:</span>
                <span className="text-red-600">₹{currentRecord.remainingAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Payment Amount & Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Collection Amount (₹) *
              </label>
              <input
                type="number"
                min={1}
                max={currentRecord ? currentRecord.remainingAmount : 100000}
                value={paymentAmount}
                onChange={e => setPaymentAmount(Number(e.target.value))}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-lg font-black p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
              <span className="text-[10px] text-gray-500 font-bold block mt-1">
                Partial payment supported
              </span>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Payment Channel *
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3.5 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                <option value="UPI">📱 UPI (GPay/PhonePe/Paytm)</option>
                <option value="Cash">💵 Physical Cash</option>
                <option value="Bank Transfer">🏦 Bank NEFT / IMPS</option>
                <option value="Card">💳 Debit / Credit Card</option>
              </select>
            </div>
          </div>

          {/* Reference Number */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Transaction / Reference Number *
            </label>
            <input
              type="text"
              value={referenceNumber}
              onChange={e => setReferenceNumber(e.target.value)}
              placeholder="e.g. UPI/12345678/HDFC or Cash Receipt No"
              required
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Operational Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Cleared via Google Pay, installment 1 of 2"
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <FlatButton
              type="button"
              variant="secondary"
              onClick={() => setIsRecordPaymentOpen(false)}
            >
              Cancel
            </FlatButton>
            <FlatButton
              type="submit"
              variant="success"
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Record & Generate Receipt
            </FlatButton>
          </div>
        </form>
      </div>
    </div>
  );
};
