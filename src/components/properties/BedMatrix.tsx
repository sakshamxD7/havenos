import React, { useState } from 'react';
import { Bed, Room, Tenant, BedStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { User, Shield, Wrench, Ban, CheckCircle2, ChevronRight, UserPlus } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { FlatButton } from '../common/FlatButton';

interface BedMatrixProps {
  propertyId: string;
}

export const BedMatrix: React.FC<BedMatrixProps> = ({ propertyId }) => {
  const {
    rooms,
    beds,
    floors,
    tenants,
    updateBedStatus,
    setIsAllocateBedOpen,
    setActiveTenantProfile
  } = useApp();

  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const propertyFloors = floors.filter(f => f.propertyId === propertyId);
  const propertyRooms = rooms.filter(r => r.propertyId === propertyId);

  const getBedStatusColor = (status: BedStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500 hover:bg-emerald-600 text-white';
      case 'OCCUPIED':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'RESERVED':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'MAINTENANCE':
        return 'bg-gray-400 hover:bg-gray-500 text-white';
      case 'BLOCKED':
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bed Matrix Legend */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-wider text-gray-900">
          Bed Status Color Key:
        </span>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
            <span>AVAILABLE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-blue-600"></span>
            <span>OCCUPIED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
            <span>RESERVED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-gray-400"></span>
            <span>MAINTENANCE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-red-500"></span>
            <span>BLOCKED</span>
          </div>
        </div>
      </div>

      {/* Floors & Rooms Hierarchy */}
      <div className="space-y-6">
        {propertyFloors.map(floor => {
          const roomsOnFloor = propertyRooms.filter(r => r.floorId === floor.id);

          return (
            <div key={floor.id} className="bg-gray-100 p-5 rounded-lg border-2 border-gray-200">
              <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-gray-900 text-white text-xs font-black uppercase tracking-wider rounded">
                    {floor.floorName}
                  </span>
                  <span className="text-xs font-bold text-gray-600">
                    {roomsOnFloor.length} Rooms
                  </span>
                </div>
              </div>

              {roomsOnFloor.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-600 font-semibold">
                  No rooms added on this floor yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roomsOnFloor.map(room => {
                    const roomBeds = beds.filter(b => b.roomId === room.id);
                    const occupiedCount = roomBeds.filter(b => b.status === 'OCCUPIED').length;

                    return (
                      <div
                        key={room.id}
                        className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-gray-900 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-extrabold text-lg text-gray-900">
                              Room {room.roomNumber}
                            </span>
                            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                              {room.roomType} • ₹{room.monthlyRent.toLocaleString('en-IN')}/mo
                            </div>
                          </div>
                          <span className="text-xs font-black px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                            {occupiedCount}/{room.totalBeds} Occupied
                          </span>
                        </div>

                        {/* Beds Blocks */}
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {roomBeds.map(bed => {
                            const tenant = tenants.find(t => t.id === bed.currentTenantId);

                            return (
                              <button
                                key={bed.id}
                                onClick={() => setSelectedBed(bed)}
                                className={`p-2.5 rounded-md font-bold text-xs flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ${getBedStatusColor(
                                  bed.status
                                )}`}
                                title={`Bed ${bed.bedNumber} - ${bed.status} ${tenant ? `(${tenant.fullName})` : ''}`}
                              >
                                <span className="text-base font-black">Bed {bed.bedNumber}</span>
                                <span className="text-[10px] font-bold opacity-90 truncate max-w-full">
                                  {bed.status === 'OCCUPIED' && tenant
                                    ? tenant.fullName.split(' ')[0]
                                    : bed.status}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bed Detail Drawer / Modal */}
      {selectedBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60">
          <div className="fixed inset-0" onClick={() => setSelectedBed(null)} />
          <div className="relative w-full max-w-md bg-white border-4 border-gray-900 rounded-lg p-6 z-10 space-y-5">
            <div className="flex items-start justify-between border-b-2 border-gray-100 pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                  Bed Management Inspector
                </span>
                <h3 className="text-2xl font-black text-gray-900">
                  Bed {selectedBed.bedNumber}
                </h3>
              </div>
              <StatusBadge status={selectedBed.status} />
            </div>

            {/* If Bed is Occupied, Show Tenant Info */}
            {selectedBed.status === 'OCCUPIED' && selectedBed.currentTenantId ? (
              (() => {
                const tenant = tenants.find(t => t.id === selectedBed.currentTenantId);
                return tenant ? (
                  <div className="bg-blue-50 p-4 rounded-md space-y-2 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-gray-900 text-sm">
                        {tenant.fullName}
                      </div>
                      <button
                        onClick={() => {
                          setActiveTenantProfile(tenant);
                          setSelectedBed(null);
                        }}
                        className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center"
                      >
                        Profile &rarr;
                      </button>
                    </div>
                    <div className="text-xs text-gray-700">
                      Mobile: <strong>{tenant.mobile}</strong>
                    </div>
                    <div className="text-xs text-gray-700">
                      Joining Date: <strong>{tenant.stayInfo?.joiningDate || 'N/A'}</strong>
                    </div>
                    <div className="text-xs text-gray-700">
                      Rent Due Date: <strong>{tenant.stayInfo?.rentDueDate || 5}th of month</strong>
                    </div>
                  </div>
                ) : null;
              })()
            ) : selectedBed.status === 'AVAILABLE' ? (
              <div className="p-4 bg-emerald-50 rounded-md border border-emerald-100 text-emerald-900 text-xs font-semibold">
                This bed is clean, inspected, and ready for allocation to a resident.
              </div>
            ) : null}

            {/* Change Status Options */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-600">
                Change Bed Operational Status
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    updateBedStatus(selectedBed.id, 'AVAILABLE');
                    setSelectedBed(prev => prev ? { ...prev, status: 'AVAILABLE' } : null);
                  }}
                  className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available
                </button>
                <button
                  onClick={() => {
                    updateBedStatus(selectedBed.id, 'RESERVED');
                    setSelectedBed(prev => prev ? { ...prev, status: 'RESERVED' } : null);
                  }}
                  className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Reserved
                </button>
                <button
                  onClick={() => {
                    updateBedStatus(selectedBed.id, 'MAINTENANCE');
                    setSelectedBed(prev => prev ? { ...prev, status: 'MAINTENANCE' } : null);
                  }}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Maintenance
                </button>
                <button
                  onClick={() => {
                    updateBedStatus(selectedBed.id, 'BLOCKED');
                    setSelectedBed(prev => prev ? { ...prev, status: 'BLOCKED' } : null);
                  }}
                  className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-900 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Ban className="w-3.5 h-3.5" />
                  Block
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t-2 border-gray-100 flex items-center justify-between">
              {selectedBed.status === 'AVAILABLE' && (
                <FlatButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsAllocateBedOpen(true);
                    setSelectedBed(null);
                  }}
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  Allocate Resident
                </FlatButton>
              )}
              <FlatButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedBed(null)}
                className="ml-auto"
              >
                Close
              </FlatButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
