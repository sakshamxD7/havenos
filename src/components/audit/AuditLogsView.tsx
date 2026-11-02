import React, { useState } from 'react';
import { History, Shield, Filter, Search, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    if (filterAction !== 'all' && !log.action.includes(filterAction)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        log.details.toLowerCase().includes(q) ||
        log.userName.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Security & Operational Audit Trail
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1">
            Immutable log of all financial collections, bed status transitions, and tenant lifecycle actions.
          </p>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search action, user, or details..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 text-xs font-bold pl-9 pr-4 py-2.5 rounded-md border-2 border-gray-200 focus:border-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { id: 'all', label: `All Events (${auditLogs.length})` },
          { id: 'PAYMENT', label: 'Payments' },
          { id: 'TENANT', label: 'Tenants' },
          { id: 'BED', label: 'Beds' },
          { id: 'ATTENDANCE', label: 'Attendance' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterAction(tab.id)}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-colors cursor-pointer ${
              filterAction === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-200 text-xs font-black uppercase tracking-wider text-gray-600">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Operator / Role</th>
                <th className="py-3.5 px-4">Action Type</th>
                <th className="py-3.5 px-4">Entity</th>
                <th className="py-3.5 px-4">Operation Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 font-bold">
                    No matching audit records found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 text-gray-500 font-mono">
                      {log.timestamp}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div>{log.userName}</div>
                      <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                        {log.userRole}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-black uppercase tracking-wider text-gray-800">
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-700">
                      {log.entity}
                    </td>

                    <td className="py-3.5 px-4 text-gray-800 font-medium">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
