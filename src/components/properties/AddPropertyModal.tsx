import React, { useState } from 'react';
import { X, Building2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyType } from '../../types';
import { FlatButton } from '../common/FlatButton';

export const AddPropertyModal: React.FC = () => {
  const { isAddPropertyOpen, setIsAddPropertyOpen, addProperty } = useApp();

  const [name, setName] = useState('');
  const [type, setType] = useState<PropertyType>('PG');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerPhone, setManagerPhone] = useState('');
  const [floorsCount, setFloorsCount] = useState<number>(3);

  if (!isAddPropertyOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !address) {
      alert('Property Name and Address are required.');
      return;
    }

    addProperty({
      name,
      type,
      address,
      city,
      state,
      pincode: pincode || '560001',
      managerName: managerName || 'Property Caretaker',
      managerPhone: managerPhone || '+91 98000 00000',
      floorsCount: Number(floorsCount),
      status: 'active'
    });

    setIsAddPropertyOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAddPropertyOpen(false)} />

      <div className="relative w-full max-w-lg bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Add New Property</h3>
              <p className="text-xs text-blue-100 font-medium">Create a new building, floor structure & management node</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddPropertyOpen(false)}
            className="p-1 hover:bg-blue-700 rounded text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Property Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Oak Premium PG"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Property Category *
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as PropertyType)}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              >
                <option value="PG">Paying Guest (PG)</option>
                <option value="Hostel">Hostel</option>
                <option value="Co-living">Co-living Space</option>
                <option value="Apartment">Apartment</option>
                <option value="Student Accommodation">Student Accommodation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Number of Floors *
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={floorsCount}
                onChange={e => setFloorsCount(Number(e.target.value))}
                required
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 14th Main, Sector 4, HSR Layout"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="560102"
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Assigned Manager Name
              </label>
              <input
                type="text"
                value={managerName}
                onChange={e => setManagerName(e.target.value)}
                placeholder="Manager Name"
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                Manager Mobile
              </label>
              <input
                type="tel"
                value={managerPhone}
                onChange={e => setManagerPhone(e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full bg-gray-100 focus:bg-white text-gray-900 text-sm font-semibold p-3 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-gray-100">
            <FlatButton
              type="button"
              variant="secondary"
              onClick={() => setIsAddPropertyOpen(false)}
            >
              Cancel
            </FlatButton>
            <FlatButton
              type="submit"
              variant="primary"
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Create Property
            </FlatButton>
          </div>
        </form>
      </div>
    </div>
  );
};
