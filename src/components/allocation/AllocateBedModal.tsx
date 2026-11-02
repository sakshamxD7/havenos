import React, { useState, useEffect } from 'react';
import { X, BedDouble, CheckCircle2, Building, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';

export const AllocateBedModal: React.FC = () => {
  const {
    isAllocateBedOpen,
    setIsAllocateBedOpen,
    allocateTenantId,
    setAllocateTenantId,
    tenants,
    properties,
    floors,
    rooms,
    beds,
    allocateBed
  } = useApp();

  const [selectedTenantId, setSelectedTenantId] = useState<string>('');
  const [selectedPropId, setSelectedPropId] = useState<string>('');
  const [selectedFloorId, setSelectedFloorId] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedBedId, setSelectedBedId] = useState<string>('');
  const [monthlyRent, setMonthlyRent] = useState<number>(10000);
  const [securityDeposit, setSecurityDeposit] = useState<number>(20000);
  const [rentDueDate, setRentDueDate] = useState<number>(5);

  // Sync if opened with preselected tenant
  useEffect(() => {
    if (allocateTenantId) {
      setSelectedTenantId(allocateTenantId);
    } else if (tenants.some(t => t.status === 'REGISTERED')) {
      const firstUnallocated = tenants.find(t => t.status === 'REGISTERED');
      if (firstUnallocated) setSelectedTenantId(firstUnallocated.id);
    }
  }, [allocateTenantId, tenants]);

  // Set default property
  useEffect(() => {
    if (properties.length > 0 && !selectedPropId) {
      setSelectedPropId(properties[0].id);
    }
  }, [properties, selectedPropId]);

  // Set default floor
  const propFloors = floors.filter(f => f.propertyId === selectedPropId);
  useEffect(() => {
    if (propFloors.length > 0) {
      setSelectedFloorId(propFloors[0].id);
    } else {
      setSelectedFloorId('');
    }
  }, [selectedPropId, floors]);

  // Set default room
  const floorRooms = rooms.filter(r => r.floorId === selectedFloorId);
  useEffect(() => {
    if (floorRooms.length > 0) {
      setSelectedRoomId(floorRooms[0].id);
      setMonthlyRent(floorRooms[0].monthlyRent);
      setSecurityDeposit(floorRooms[0].securityDeposit);
    } else {
      setSelectedRoomId('');
    }
  }, [selectedFloorId, rooms]);

  // Available beds in selected room
  const availableBeds = beds.filter(b => b.roomId === selectedRoomId && b.status === 'AVAILABLE');
  useEffect(() => {
    if (availableBeds.length > 0) {
      setSelectedBedId(availableBeds[0].id);
    } else {
      setSelectedBedId('');
    }
  }, [selectedRoomId, beds]);

  if (!isAllocateBedOpen) return null;

  const handleConfirmAllocation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTenantId) {
      alert('Please select a tenant to allocate.');
      return;
    }
    if (!selectedBedId) {
      alert('Please select an available bed.');
      return;
    }

    const success = allocateBed(
      selectedTenantId,
      selectedPropId,
      selectedRoomId,
      selectedBedId,
      Number(monthlyRent),
      Number(securityDeposit),
      Number(rentDueDate)
    );

    if (success) {
      setIsAllocateBedOpen(false);
      setAllocateTenantId(null);
    }
  };

  const unallocatedTenants = tenants.filter(t => t.status === 'REGISTERED' || t.id === selectedTenantId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAllocateBedOpen(false)} />

      <div className="relative w-full max-w-xl bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Room & Bed Allocation</h3>
              <p className="text-xs text-blue-100 font-medium">Assign a verified resident to an inspected inventory bed</p>
            </div>
          </div>
          <button
            onClick={() => setIsAllocateBedOpen(false)}
            className="p-1 hover:bg-blue-700 rounded text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Allocation Form */}
        <form onSubmit={handleConfirmAllocation} className="p-6 sm:p-8 space-y-5">
          {/* 1. Select Tenant */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Select Tenant to Allocate *
            </label>
            <select
              value={selectedTenantId}
              onChange={e => setSelectedTenantId(e.target.value)}
              required
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            >
              <option value="">-- Choose Tenant --</option>
              {unallocatedTenants.map(t => (
                <option key={t.id} value={t.id}>
                  {t.fullName} ({t.mobile}) - {t.status}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Select Property & Floor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Property *
              </label>
              <select
                value={selectedPropId}
                onChange={e => setSelectedPropId(e.target.value)}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                {properties.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Floor *
              </label>
              <select
                value={selectedFloorId}
                onChange={e => setSelectedFloorId(e.target.value)}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                {propFloors.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.floorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Room & Available Bed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Room *
              </label>
              <select
                value={selectedRoomId}
                onChange={e => {
                  setSelectedRoomId(e.target.value);
                  const rm = rooms.find(r => r.id === e.target.value);
                  if (rm) {
                    setMonthlyRent(rm.monthlyRent);
                    setSecurityDeposit(rm.securityDeposit);
                  }
                }}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                {floorRooms.map(r => (
                  <option key={r.id} value={r.id}>
                    Room {r.roomNumber} ({r.roomType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Available Bed *
              </label>
              <select
                value={selectedBedId}
                onChange={e => setSelectedBedId(e.target.value)}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                {availableBeds.length === 0 ? (
                  <option value="">No available beds in this room</option>
                ) : (
                  availableBeds.map(b => (
                    <option key={b.id} value={b.id}>
                      Bed {b.bedNumber} (AVAILABLE)
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {availableBeds.length === 0 && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-md text-red-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              This room is fully occupied or beds are blocked. Please select another room.
            </div>
          )}

          {/* 4. Financial Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t-2 border-gray-100">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Monthly Rent (₹) *
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={e => setMonthlyRent(Number(e.target.value))}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Security Deposit (₹) *
              </label>
              <input
                type="number"
                value={securityDeposit}
                onChange={e => setSecurityDeposit(Number(e.target.value))}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Rent Due Day (1-31) *
              </label>
              <input
                type="number"
                min={1}
                max={31}
                value={rentDueDate}
                onChange={e => setRentDueDate(Number(e.target.value))}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <FlatButton
              type="button"
              variant="secondary"
              onClick={() => setIsAllocateBedOpen(false)}
            >
              Cancel
            </FlatButton>
            <FlatButton
              type="submit"
              variant="primary"
              disabled={availableBeds.length === 0 || !selectedTenantId}
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Confirm & Activate Stay
            </FlatButton>
          </div>
        </form>
      </div>
    </div>
  );
};
