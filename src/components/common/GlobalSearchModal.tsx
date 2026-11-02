import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, User, Building, Receipt as ReceiptIcon, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    tenants,
    rooms,
    properties,
    receipts,
    setActiveTenantProfile,
    setActiveReceipt,
    setActiveTab
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { tenants: [], rooms: [], receipts: [], properties: [] };
    const q = query.toLowerCase().trim();

    const matchedTenants = tenants.filter(t =>
      t.fullName.toLowerCase().includes(q) ||
      t.mobile.includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.kyc.idNumber.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedProperties = properties.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedRooms = rooms.filter(r =>
      r.roomNumber.toLowerCase().includes(q) ||
      r.roomType.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedReceipts = receipts.filter(rc =>
      rc.receiptNumber.toLowerCase().includes(q) ||
      rc.tenantName.toLowerCase().includes(q) ||
      rc.referenceNumber.toLowerCase().includes(q)
    ).slice(0, 4);

    return {
      tenants: matchedTenants,
      properties: matchedProperties,
      rooms: matchedRooms,
      receipts: matchedReceipts
    };
  }, [query, tenants, properties, rooms, receipts]);

  if (!isSearchOpen) return null;

  const totalResults =
    searchResults.tenants.length +
    searchResults.properties.length +
    searchResults.rooms.length +
    searchResults.receipts.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-gray-900/60">
      <div
        className="fixed inset-0"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white border-4 border-gray-900 rounded-lg overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b-2 border-gray-200 bg-gray-50">
          <Search className="w-5 h-5 text-gray-500 mr-3 shrink-0 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search tenant name, mobile, room number, or receipt..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-0 text-base font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 hover:bg-gray-200 rounded text-gray-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-12 text-center text-gray-600">
              <div className="text-sm font-semibold">Start typing to search properties, tenants, rooms or receipts.</div>
              <div className="text-xs mt-1 text-gray-600">e.g. "Aarav", "Room 101", "REC-2026", "Bangalore"</div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-gray-600">
              <div className="text-sm font-bold text-gray-900">No records found for "{query}"</div>
              <div className="text-xs text-gray-600 mt-1">Check spelling or search for mobile number or room.</div>
            </div>
          ) : (
            <>
              {/* Tenants */}
              {searchResults.tenants.length > 0 && (
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-gray-600 mb-2 px-1">
                    Tenants ({searchResults.tenants.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.tenants.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setActiveTenantProfile(t);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-blue-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600">
                              {t.fullName}
                            </div>
                            <div className="text-xs text-gray-600">
                              {t.mobile} • Status: <strong className="text-gray-900">{t.status}</strong>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Receipts */}
              {searchResults.receipts.length > 0 && (
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-gray-600 mb-2 px-1">
                    Receipts ({searchResults.receipts.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.receipts.map(rc => (
                      <div
                        key={rc.id}
                        onClick={() => {
                          setActiveReceipt(rc);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-emerald-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                            <ReceiptIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700">
                              {rc.receiptNumber} — ₹{rc.amountPaid.toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-gray-600">
                              {rc.tenantName} • {rc.paymentDate} • {rc.paymentMethod}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Properties */}
              {searchResults.properties.length > 0 && (
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-gray-600 mb-2 px-1">
                    Properties ({searchResults.properties.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.properties.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setActiveTab('properties');
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-purple-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                            <Building className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-purple-600">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {p.type} • {p.city}, {p.state}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 text-right text-[11px] font-bold text-gray-600 uppercase">
          Press ESC to dismiss
        </div>
      </div>
    </div>
  );
};
