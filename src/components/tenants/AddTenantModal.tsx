import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, ShieldCheck, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';

export const AddTenantModal: React.FC = () => {
  const {
    isAddTenantOpen,
    setIsAddTenantOpen,
    properties,
    rooms,
    beds,
    addTenant
  } = useApp();

  // Personal Info
  const [fullName, setFullName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [dob, setDob] = useState('2001-05-15');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  // Emergency contact
  const [emName, setEmName] = useState('');
  const [emRelation, setEmRelation] = useState('Parent');
  const [emMobile, setEmMobile] = useState('');

  // Permanent Address
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // KYC
  const [idType, setIdType] = useState<'Aadhaar' | 'PAN' | 'Passport' | 'Driving License'>('Aadhaar');
  const [idNumber, setIdNumber] = useState('');

  // Optional Immediate Allocation
  const [allocateNow, setAllocateNow] = useState(false);
  const [selectedPropId, setSelectedPropId] = useState(properties[0]?.id || '');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedBedId, setSelectedBedId] = useState('');
  const [rent, setRent] = useState<number>(10000);
  const [deposit, setDeposit] = useState<number>(20000);
  const [dueDate, setDueDate] = useState<number>(5);

  const availableBeds = beds.filter(b => b.roomId === selectedRoomId && b.status === 'AVAILABLE');

  if (!isAddTenantOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !mobile) {
      alert('Full Name and Mobile Number are required.');
      return;
    }

    addTenant(
      {
        fullName,
        guardianName,
        dob,
        gender,
        mobile,
        email,
        emergencyContact: {
          name: emName || guardianName || 'Emergency',
          relation: emRelation,
          mobile: emMobile || mobile
        },
        permanentAddress: {
          address: address || 'Main Road',
          city: city || 'City',
          state: state || 'State',
          pincode: pincode || '100001'
        },
        kyc: {
          idType,
          idNumber: idNumber || 'DOC-PENDING',
          verified: false,
          addressProofSubmitted: false,
          documentName: `${idType.toLowerCase()}_kyc.pdf`
        }
      },
      allocateNow && selectedBedId
        ? {
            propertyId: selectedPropId,
            roomId: selectedRoomId,
            bedId: selectedBedId,
            rent: Number(rent),
            deposit: Number(deposit),
            dueDate: Number(dueDate)
          }
        : undefined
    );

    setIsAddTenantOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAddTenantOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Register New Tenant</h3>
              <p className="text-xs text-blue-100 font-medium">Capture resident KYC, emergency contact & stay terms</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddTenantOpen(false)}
            className="p-1 hover:bg-blue-700 rounded text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Personal Info */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-blue-600 border-b-2 border-gray-100 pb-1">
              1. Personal & Contact Profile
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Malhotra"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Father / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunil Malhotra"
                  value={guardianName}
                  onChange={e => setGuardianName(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as any)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: KYC Information */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-blue-600 border-b-2 border-gray-100 pb-1">
              2. Government KYC Identity
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Identity Document Type *
                </label>
                <select
                  value={idType}
                  onChange={e => setIdType(e.target.value as any)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                >
                  <option value="Aadhaar">Aadhaar Card (UIDAI)</option>
                  <option value="PAN">PAN Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Document ID Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4921-8830-1928"
                  value={idNumber}
                  onChange={e => setIdNumber(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Permanent Address & Emergency Contact */}
          <div className="space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-blue-600 border-b-2 border-gray-100 pb-1">
              3. Permanent Address & Emergency Contact
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="Permanent Street Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City (e.g. Jaipur)"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State (e.g. Rajasthan)"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Sharma"
                  value={emName}
                  onChange={e => setEmName(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Emergency Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 94140 00000"
                  value={emMobile}
                  onChange={e => setEmMobile(e.target.value)}
                  className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Optional Immediate Bed Allocation */}
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-gray-900">
                  Allocate Bed Immediately?
                </div>
                <div className="text-[11px] text-gray-600">
                  You can assign a bed right now or keep in unallocated registry.
                </div>
              </div>
              <input
                type="checkbox"
                checked={allocateNow}
                onChange={e => setAllocateNow(e.target.checked)}
                className="w-5 h-5 accent-blue-600 cursor-pointer"
              />
            </div>

            {allocateNow && (
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                      Property
                    </label>
                    <select
                      value={selectedPropId}
                      onChange={e => setSelectedPropId(e.target.value)}
                      className="w-full bg-white text-gray-900 text-xs font-bold p-2.5 rounded border border-gray-300"
                    >
                      {properties.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                      Room
                    </label>
                    <select
                      value={selectedRoomId}
                      onChange={e => {
                        setSelectedRoomId(e.target.value);
                        const r = rooms.find(rm => rm.id === e.target.value);
                        if (r) {
                          setRent(r.monthlyRent);
                          setDeposit(r.securityDeposit);
                        }
                      }}
                      className="w-full bg-white text-gray-900 text-xs font-bold p-2.5 rounded border border-gray-300"
                    >
                      <option value="">-- Select Room --</option>
                      {rooms
                        .filter(r => r.propertyId === selectedPropId)
                        .map(r => (
                          <option key={r.id} value={r.id}>
                            Room {r.roomNumber} ({r.roomType})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                      Available Bed
                    </label>
                    <select
                      value={selectedBedId}
                      onChange={e => setSelectedBedId(e.target.value)}
                      className="w-full bg-white text-gray-900 text-xs font-bold p-2.5 rounded border border-gray-300"
                    >
                      <option value="">-- Choose Bed --</option>
                      {availableBeds.map(b => (
                        <option key={b.id} value={b.id}>
                          Bed {b.bedNumber} (AVAILABLE)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                      Rent (₹)
                    </label>
                    <input
                      type="number"
                      value={rent}
                      onChange={e => setRent(Number(e.target.value))}
                      className="w-full bg-white text-gray-900 text-xs font-bold p-2 rounded border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                      Deposit (₹)
                    </label>
                    <input
                      type="number"
                      value={deposit}
                      onChange={e => setDeposit(Number(e.target.value))}
                      className="w-full bg-white text-gray-900 text-xs font-bold p-2 rounded border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                      Due Day (1-31)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={dueDate}
                      onChange={e => setDueDate(Number(e.target.value))}
                      className="w-full bg-white text-gray-900 text-xs font-bold p-2 rounded border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <FlatButton
              type="button"
              variant="secondary"
              onClick={() => setIsAddTenantOpen(false)}
            >
              Cancel
            </FlatButton>
            <FlatButton
              type="submit"
              variant="primary"
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Save Tenant Record
            </FlatButton>
          </div>
        </form>
      </div>
    </div>
  );
};
