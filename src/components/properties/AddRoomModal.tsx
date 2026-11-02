import React, { useState } from 'react';
import { X, DoorOpen, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoomType } from '../../types';
import { FlatButton } from '../common/FlatButton';

export const AddRoomModal: React.FC = () => {
  const {
    isAddRoomOpen,
    setIsAddRoomOpen,
    properties,
    floors,
    addRoom
  } = useApp();

  const [selectedPropId, setSelectedPropId] = useState(properties[0]?.id || '');
  const propFloors = floors.filter(f => f.propertyId === selectedPropId);
  const [selectedFloorId, setSelectedFloorId] = useState(propFloors[0]?.id || '');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('Double');
  const [monthlyRent, setMonthlyRent] = useState<number>(11000);
  const [securityDeposit, setSecurityDeposit] = useState<number>(22000);

  if (!isAddRoomOpen) return null;

  const getBedCount = (type: RoomType) => {
    switch (type) {
      case 'Single': return 1;
      case 'Double': return 2;
      case 'Triple': return 3;
      case 'Four-bed': return 4;
      default: return 2;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomNumber) {
      alert('Room Number is required.');
      return;
    }

    const bedCount = getBedCount(roomType);
    const targetFloorId = selectedFloorId || propFloors[0]?.id;

    if (!targetFloorId) {
      alert('Please select a valid floor.');
      return;
    }

    addRoom(
      roomNumber,
      targetFloorId,
      selectedPropId,
      roomType,
      Number(monthlyRent),
      Number(securityDeposit),
      bedCount
    );

    setIsAddRoomOpen(false);
    setRoomNumber('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAddRoomOpen(false)} />

      <div className="relative w-full max-w-md bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">
              <DoorOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Add New Room</h3>
              <p className="text-xs text-blue-100 font-medium">Create room unit and generate bed inventory</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddRoomOpen(false)}
            className="p-1 hover:bg-blue-700 rounded text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Select Property *
            </label>
            <select
              value={selectedPropId}
              onChange={e => {
                setSelectedPropId(e.target.value);
                const nextFloors = floors.filter(f => f.propertyId === e.target.value);
                if (nextFloors.length > 0) setSelectedFloorId(nextFloors[0].id);
              }}
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            >
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
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
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            >
              {propFloors.map(f => (
                <option key={f.id} value={f.id}>{f.floorName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Room Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 104"
                value={roomNumber}
                onChange={e => setRoomNumber(e.target.value)}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Sharing / Type *
              </label>
              <select
                value={roomType}
                onChange={e => setRoomType(e.target.value as RoomType)}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                <option value="Single">Single (1 Bed)</option>
                <option value="Double">Double (2 Beds)</option>
                <option value="Triple">Triple (3 Beds)</option>
                <option value="Four-bed">Four-bed (4 Beds)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Monthly Rent / Bed (₹) *
              </label>
              <input
                type="number"
                required
                value={monthlyRent}
                onChange={e => setMonthlyRent(Number(e.target.value))}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Security Deposit (₹) *
              </label>
              <input
                type="number"
                required
                value={securityDeposit}
                onChange={e => setSecurityDeposit(Number(e.target.value))}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded text-xs text-blue-900 font-bold">
            Creating this room will automatically initialize {getBedCount(roomType)} bed(s) in <strong>AVAILABLE</strong> status.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <FlatButton
              type="button"
              variant="secondary"
              onClick={() => setIsAddRoomOpen(false)}
            >
              Cancel
            </FlatButton>
            <FlatButton
              type="submit"
              variant="primary"
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Add Room
            </FlatButton>
          </div>
        </form>
      </div>
    </div>
  );
};
