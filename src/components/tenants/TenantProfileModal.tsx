import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Building,
  BedDouble,
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  Receipt as ReceiptIcon,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Tenant, RentRecord, Payment, Receipt, AttendanceRecord } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FlatButton } from '../common/FlatButton';

export const TenantProfileModal: React.FC = () => {
  const {
    activeTenantProfile,
    setActiveTenantProfile,
    properties,
    rooms,
    beds,
    rentRecords,
    payments,
    receipts,
    attendance,
    verifyKYC,
    setIsAllocateBedOpen,
    setAllocateTenantId,
    setIsRecordPaymentOpen,
    setPaymentPrefill,
    setIsCheckoutOpen,
    setCheckoutTenantId,
    setActiveReceipt
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'rent' | 'payments' | 'attendance' | 'kyc'>('overview');

  if (!activeTenantProfile) return null;

  const tenant = activeTenantProfile;
  const stay = tenant.stayInfo;
  const property = properties.find(p => p.id === stay?.propertyId);
  const room = rooms.find(r => r.id === stay?.roomId);
  const bed = beds.find(b => b.id === stay?.bedId);

  const tenantRent = rentRecords.filter(r => r.tenantId === tenant.id);
  const tenantPayments = payments.filter(p => p.tenantId === tenant.id);
  const tenantReceipts = receipts.filter(r => r.tenantId === tenant.id);
  const tenantAttendance = attendance.filter(a => a.tenantId === tenant.id);

  const totalOutstanding = tenantRent.reduce((acc, curr) => acc + curr.remainingAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setActiveTenantProfile(null)} />

      <div className="relative w-full max-w-4xl bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header Poster Strip */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-2xl shrink-0">
              {tenant.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black">{tenant.fullName}</h2>
                <StatusBadge status={tenant.status} />
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-300 font-medium">
                <span>{tenant.gender}</span>
                <span>•</span>
                <span>{tenant.mobile}</span>
                <span>•</span>
                <span>{tenant.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTenantProfile(null)}
            className="p-2 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors self-start sm:self-center cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-gray-200 bg-gray-100 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: '360° Overview' },
            { id: 'rent', label: `Rent & Schedules (${tenantRent.length})` },
            { id: 'payments', label: `Payments (${tenantPayments.length})` },
            { id: 'attendance', label: `Attendance Log (${tenantAttendance.length})` },
            { id: 'kyc', label: 'KYC & Documents' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-[2px] whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Operational Status Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="text-[11px] font-bold text-gray-600 uppercase">Current Stay</div>
                  {stay ? (
                    <div className="mt-1">
                      <div className="font-black text-gray-900 text-base">
                        {property?.name}
                      </div>
                      <div className="text-xs font-bold text-blue-600 mt-0.5">
                        Room {room?.roomNumber} • Bed {bed?.bedNumber}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <div className="font-bold text-amber-700 text-sm">Not Allocated</div>
                      <button
                        onClick={() => {
                          setAllocateTenantId(tenant.id);
                          setIsAllocateBedOpen(true);
                        }}
                        className="text-xs font-black text-blue-600 hover:underline mt-1"
                      >
                        + Allocate Bed Now
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="text-[11px] font-bold text-gray-600 uppercase">Monthly Rent & Due</div>
                  <div className="mt-1">
                    <div className="font-black text-gray-900 text-base">
                      ₹{stay?.monthlyRent.toLocaleString('en-IN') || 0}
                    </div>
                    <div className="text-xs font-semibold text-gray-600 mt-0.5">
                      Due on {stay?.rentDueDate || 5}th of every month
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-md ${totalOutstanding > 0 ? 'bg-red-50 text-red-900' : 'bg-emerald-50 text-emerald-900'}`}>
                  <div className="text-[11px] font-bold uppercase">
                    {totalOutstanding > 0 ? 'Outstanding Dues' : 'Account Settled'}
                  </div>
                  <div className="mt-1 font-black text-2xl">
                    ₹{totalOutstanding.toLocaleString('en-IN')}
                  </div>
                  {totalOutstanding > 0 && (
                    <button
                      onClick={() => {
                        const unpaidRecord = tenantRent.find(r => r.remainingAmount > 0);
                        setPaymentPrefill({ tenantId: tenant.id, rentRecordId: unpaidRecord?.id });
                        setIsRecordPaymentOpen(true);
                      }}
                      className="mt-1 text-xs font-black text-red-700 underline"
                    >
                      Collect Payment &rarr;
                    </button>
                  )}
                </div>
              </div>

              {/* Personal & Emergency Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3">
                    Personal & Guardian Info
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-gray-600">Guardian Name:</span>{' '}
                      <strong className="text-gray-900">{tenant.guardianName}</strong>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">Date of Birth:</span>{' '}
                      <strong className="text-gray-900">{tenant.dob}</strong>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-600">Emergency Contact:</span>{' '}
                      <strong className="text-gray-900">
                        {tenant.emergencyContact.name} ({tenant.emergencyContact.relation}) - {tenant.emergencyContact.mobile}
                      </strong>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3">
                    Permanent Address
                  </h4>
                  <div className="text-xs leading-relaxed font-semibold text-gray-800">
                    {tenant.permanentAddress.address}<br />
                    {tenant.permanentAddress.city}, {tenant.permanentAddress.state} - {tenant.permanentAddress.pincode}
                  </div>
                </div>
              </div>

              {/* Operational Action Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-gray-200">
                <div className="flex items-center gap-2">
                  {tenant.status === 'ACTIVE' && (
                    <FlatButton
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setCheckoutTenantId(tenant.id);
                        setIsCheckoutOpen(true);
                      }}
                      icon={<LogOut className="w-4 h-4" />}
                    >
                      Initiate Move-Out / Checkout
                    </FlatButton>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <FlatButton
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const unpaidRecord = tenantRent.find(r => r.remainingAmount > 0);
                      setPaymentPrefill({ tenantId: tenant.id, rentRecordId: unpaidRecord?.id });
                      setIsRecordPaymentOpen(true);
                    }}
                    icon={<CreditCard className="w-4 h-4" />}
                  >
                    Record Payment
                  </FlatButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rent' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-wider text-gray-900">
                  Rent Cycles & Schedules
                </h4>
                <span className="text-xs font-bold text-gray-600">
                  Deposit Held: ₹{stay?.securityDeposit.toLocaleString('en-IN') || 0}
                </span>
              </div>

              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 border-b-2 border-gray-200 font-black uppercase text-gray-600">
                    <tr>
                      <th className="p-3">Period</th>
                      <th className="p-3">Rent</th>
                      <th className="p-3">Paid</th>
                      <th className="p-3">Balance</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-semibold">
                    {tenantRent.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">{r.billingPeriod}</td>
                        <td className="p-3">₹{r.rentAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-emerald-600">₹{r.paidAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-red-600">₹{r.remainingAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-gray-600">{r.dueDate}</td>
                        <td className="p-3">
                          <StatusBadge status={r.status} size="sm" />
                        </td>
                        <td className="p-3 text-right">
                          {r.remainingAmount > 0 ? (
                            <button
                              onClick={() => {
                                setPaymentPrefill({ tenantId: tenant.id, rentRecordId: r.id });
                                setIsRecordPaymentOpen(true);
                              }}
                              className="text-xs font-black text-blue-600 hover:underline"
                            >
                              Collect &rarr;
                            </button>
                          ) : (
                            <span className="text-gray-400 font-bold">Cleared</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Historical Payment Records & Receipts
              </h4>

              {tenantPayments.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-gray-500">
                  No payment transactions recorded yet.
                </div>
              ) : (
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 border-b-2 border-gray-200 font-black uppercase text-gray-600">
                      <tr>
                        <th className="p-3">Receipt #</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Mode</th>
                        <th className="p-3">Reference / Txn</th>
                        <th className="p-3 text-right">Amount Paid</th>
                        <th className="p-3 text-right">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold">
                      {tenantPayments.map(p => {
                        const receipt = receipts.find(r => r.receiptNumber === p.receiptNumber);
                        return (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="p-3 font-bold text-blue-600">{p.receiptNumber}</td>
                            <td className="p-3 text-gray-700">{p.paymentDate}</td>
                            <td className="p-3">{p.paymentMethod}</td>
                            <td className="p-3 text-gray-600 font-mono text-[11px]">{p.referenceNumber}</td>
                            <td className="p-3 text-right font-black text-emerald-600">
                              ₹{p.amount.toLocaleString('en-IN')}
                            </td>
                            <td className="p-3 text-right">
                              {receipt && (
                                <button
                                  onClick={() => setActiveReceipt(receipt)}
                                  className="text-blue-600 hover:underline font-bold"
                                >
                                  Receipt &rarr;
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Attendance Log for this Resident
              </h4>

              {tenantAttendance.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-gray-500">
                  No daily attendance entries recorded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tenantAttendance.map(att => (
                    <div
                      key={att.id}
                      className="p-3 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-gray-900">{att.date}</div>
                        <div className="text-[10px] text-gray-600">
                          Marked by {att.markedBy} {att.notes ? `• ${att.notes}` : ''}
                        </div>
                      </div>
                      <StatusBadge status={att.status} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase text-gray-600">KYC Status</div>
                  <div className="text-lg font-black text-gray-900 mt-0.5">
                    {tenant.kyc.verified ? 'Verified & Complete' : 'Verification Required'}
                  </div>
                </div>
                {!tenant.kyc.verified && (
                  <FlatButton
                    variant="success"
                    size="sm"
                    onClick={() => verifyKYC(tenant.id)}
                    icon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Approve KYC
                  </FlatButton>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-gray-200 rounded-lg space-y-2">
                  <div className="text-xs font-bold text-gray-600 uppercase">Government Identity</div>
                  <div className="text-sm font-black text-gray-900">
                    {tenant.kyc.idType}: {tenant.kyc.idNumber}
                  </div>
                  <div className="text-xs text-blue-600 font-semibold underline">
                    {tenant.kyc.documentName || 'Document uploaded'}
                  </div>
                </div>

                <div className="p-4 border-2 border-gray-200 rounded-lg space-y-2">
                  <div className="text-xs font-bold text-gray-600 uppercase">Address Proof</div>
                  <div className="text-sm font-black text-gray-900">
                    {tenant.kyc.addressProofSubmitted ? 'Proof Provided' : 'Pending Upload'}
                  </div>
                  <div className="text-xs text-gray-600">
                    Matches permanent address records
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
