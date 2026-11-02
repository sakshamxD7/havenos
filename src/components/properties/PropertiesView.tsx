import React, { useState } from 'react';
import { Building2, Plus, Phone, MapPin, BedDouble, Layers, Users, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatButton } from '../common/FlatButton';
import { FlatCard } from '../common/FlatCard';
import { BedMatrix } from './BedMatrix';

export const PropertiesView: React.FC = () => {
  const {
    properties,
    rooms,
    beds,
    selectedPropertyId,
    setSelectedPropertyId,
    setIsAddPropertyOpen,
    setIsAddRoomOpen,
    user
  } = useApp();

  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

  const displayedProperties = selectedPropertyId === 'all'
    ? properties
    : properties.filter(p => p.id === selectedPropertyId);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Properties & Bed Matrix
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Real-time floor, room, and bed inventory allocation across your properties.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher */}
          <div className="bg-white p-1 rounded-md border border-gray-200 flex items-center">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded cursor-pointer ${
                viewMode === 'matrix' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Bed Matrix
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded cursor-pointer ${
                viewMode === 'cards' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Property Cards
            </button>
          </div>

          <FlatButton
            variant="secondary"
            size="sm"
            onClick={() => setIsAddRoomOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Room
          </FlatButton>

          {user.role === 'owner' && (
            <FlatButton
              variant="primary"
              size="sm"
              onClick={() => setIsAddPropertyOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Property
            </FlatButton>
          )}
        </div>
      </div>

      {/* Property Switcher Tabs if in matrix view */}
      {viewMode === 'matrix' && (
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-gray-200 pb-3">
          {properties.map(p => {
            const isSelected = selectedPropertyId === p.id || (selectedPropertyId === 'all' && properties[0]?.id === p.id);
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPropertyId(p.id)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      )}

      {/* View Content */}
      {viewMode === 'matrix' ? (
        <BedMatrix
          propertyId={selectedPropertyId === 'all' ? properties[0]?.id || '' : selectedPropertyId}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProperties.map(prop => {
            const propRooms = rooms.filter(r => r.propertyId === prop.id);
            const propBeds = beds.filter(b => b.propertyId === prop.id);
            const occupiedCount = propBeds.filter(b => b.status === 'OCCUPIED').length;
            const vacantCount = propBeds.filter(b => b.status === 'AVAILABLE').length;
            const occupancyRate = propBeds.length > 0 ? Math.round((occupiedCount / propBeds.length) * 100) : 0;

            return (
              <FlatCard
                key={prop.id}
                color="white"
                bordered
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider rounded">
                        {prop.type}
                      </span>
                      <h3 className="text-xl font-black text-gray-900 mt-2 leading-tight">
                        {prop.name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-gray-100 text-blue-600 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                    <span>{prop.address}, {prop.city}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
                    <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                    <span>Manager: <strong>{prop.managerName}</strong> ({prop.managerPhone})</span>
                  </div>

                  {/* Stat Grid */}
                  <div className="mt-6 grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-md text-center">
                    <div>
                      <div className="text-base font-extrabold text-gray-900">{prop.floorsCount}</div>
                      <div className="text-[10px] font-bold text-gray-600 uppercase">Floors</div>
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-gray-900">{propRooms.length}</div>
                      <div className="text-[10px] font-bold text-gray-600 uppercase">Rooms</div>
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-emerald-600">{occupancyRate}%</div>
                      <div className="text-[10px] font-bold text-gray-600 uppercase">Occupancy</div>
                    </div>
                  </div>

                  {/* Bed Breakdown */}
                  <div className="mt-4 flex items-center justify-between text-xs font-bold pt-3 border-t border-gray-100">
                    <span className="text-blue-700">{occupiedCount} Occupied</span>
                    <span className="text-emerald-700">{vacantCount} Available</span>
                    <span className="text-gray-500">{propBeds.length} Total</span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <FlatButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPropertyId(prop.id);
                      setViewMode('matrix');
                    }}
                  >
                    Inspect Beds &rarr;
                  </FlatButton>
                </div>
              </FlatCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
