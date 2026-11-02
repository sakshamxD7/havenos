import React, { useState } from 'react';
import {
  CalendarCheck2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  Users,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AttendanceStatus } from '../../types';
import { FlatButton } from '../common/FlatButton';
import { FlatCard } from '../common/FlatCard';
import { StatusBadge } from '../common/StatusBadge';

export const AttendanceView: React.FC = () => {
  const {
    tenants,
    attendance,
    markAttendance,
    markAllPresent,
    selectedPropertyId,
    properties,
    rooms,
    beds
  } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>('2026-10-29');
  const [searchQuery, setSearchQuery] = useState('');

  // Active tenants eligible for attendance
  const activeTenants = tenants.filter(t => {
    if (t.status !== 'ACTIVE' && t.status !== 'NOTICE_PERIOD') return false;
    if (selectedPropertyId !== 'all' && t.stayInfo?.propertyId !== selectedPropertyId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return t.fullName.toLowerCase().includes(q) || t.mobile.includes(q);
    }
    return true;
  });

  // Calculate stats for selected date
  const dateRecords = attendance.filter(a => a.date === selectedDate);
  const presentCount = activeTenants.filter(t => {
    const rec = dateRecords.find(a => a.tenantId === t.id);
    return rec?.status === 'PRESENT';
  }).length;

  const absentCount = activeTenants.filter(t => {
    const rec = dateRecords.find(a => a.tenantId === t.id);
    return rec?.status === 'ABSENT';
  }).length;

  const leaveCount = activeTenants.filter(t => {
    const rec = dateRecords.find(a => a.tenantId === t.id);
    return rec?.status === 'LEAVE' || rec?.status === 'OUT';
  }).length;

  const unrecordedCount = activeTenants.length - (presentCount + absentCount + leaveCount);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Daily Resident Attendance Register
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Track daily presence, night curfews, leave notices, and absentees across properties.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="bg-white font-bold text-xs text-gray-900 px-3 py-2.5 rounded-md border-2 border-gray-200 focus:border-blue-600 outline-none cursor-pointer"
          />

          <FlatButton
            variant="success"
            size="sm"
            onClick={() => markAllPresent(selectedPropertyId, selectedDate)}
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            Mark All Present
          </FlatButton>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <FlatCard color="white" bordered className="text-center">
          <div className="text-[11px] font-black uppercase tracking-wider text-gray-600">
            Total Residents
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {activeTenants.length}
          </div>
        </FlatCard>

        <FlatCard color="white" bordered className="text-center">
          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
            Present
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            {presentCount}
          </div>
        </FlatCard>

        <FlatCard color="white" bordered className="text-center">
          <div className="text-[11px] font-black uppercase tracking-wider text-red-700">
            Absent
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-600 mt-1">
            {absentCount}
          </div>
        </FlatCard>

        <FlatCard color="white" bordered className="text-center">
          <div className="text-[11px] font-black uppercase tracking-wider text-amber-700">
            Leave / Out
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
            {leaveCount}
          </div>
        </FlatCard>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 stroke-[2.5]" />
        <input
          type="text"
          placeholder="Filter by resident name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-gray-100 focus:bg-white text-gray-900 text-xs font-bold pl-9 pr-4 py-2.5 rounded-md border-0 focus:border-2 focus:border-blue-600 outline-none"
        />
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-200 text-xs font-black uppercase tracking-wider text-gray-600">
              <tr>
                <th className="py-3.5 px-4">Resident</th>
                <th className="py-3.5 px-4">Room & Bed</th>
                <th className="py-3.5 px-4">Current Status for {selectedDate}</th>
                <th className="py-3.5 px-4 text-right">Quick Mark Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold">
              {activeTenants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500 text-xs font-bold">
                    No active residents found for attendance.
                  </td>
                </tr>
              ) : (
                activeTenants.map(t => {
                  const room = rooms.find(r => r.id === t.stayInfo?.roomId);
                  const bed = beds.find(b => b.id === t.stayInfo?.bedId);
                  const attRecord = dateRecords.find(a => a.tenantId === t.id);
                  const currentStatus = attRecord ? attRecord.status : 'NOT_MARKED';

                  return (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-gray-900 text-sm">
                          {t.fullName}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">
                          {t.mobile}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-900 text-xs">
                          Room {room?.roomNumber}
                        </span>
                        <span className="text-gray-500 text-xs"> • Bed {bed?.bedNumber}</span>
                      </td>

                      <td className="py-4 px-4">
                        {currentStatus === 'NOT_MARKED' ? (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                            Pending Check-in
                          </span>
                        ) : (
                          <StatusBadge status={currentStatus} size="sm" />
                        )}
                        {attRecord?.notes && (
                          <div className="text-[11px] text-gray-600 mt-1 italic">
                            "{attRecord.notes}"
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => markAttendance(t.id, t.stayInfo?.propertyId || '', selectedDate, 'PRESENT')}
                            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-transform hover:scale-105 cursor-pointer ${
                              currentStatus === 'PRESENT'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 hover:bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            Present
                          </button>

                          <button
                            onClick={() => markAttendance(t.id, t.stayInfo?.propertyId || '', selectedDate, 'ABSENT')}
                            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-transform hover:scale-105 cursor-pointer ${
                              currentStatus === 'ABSENT'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 hover:bg-red-100 text-red-800'
                            }`}
                          >
                            Absent
                          </button>

                          <button
                            onClick={() => markAttendance(t.id, t.stayInfo?.propertyId || '', selectedDate, 'LEAVE', 'Official leave requested')}
                            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-transform hover:scale-105 cursor-pointer ${
                              currentStatus === 'LEAVE'
                                ? 'bg-amber-500 text-white'
                                : 'bg-gray-100 hover:bg-amber-100 text-amber-800'
                            }`}
                          >
                            Leave
                          </button>

                          <button
                            onClick={() => markAttendance(t.id, t.stayInfo?.propertyId || '', selectedDate, 'OUT', 'Out for office/college')}
                            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-transform hover:scale-105 cursor-pointer ${
                              currentStatus === 'OUT'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 hover:bg-indigo-100 text-indigo-800'
                            }`}
                          >
                            Out
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
