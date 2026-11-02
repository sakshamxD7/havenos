import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserRole,
  Property,
  Floor,
  Room,
  Bed,
  Tenant,
  RentRecord,
  Payment,
  Receipt,
  AttendanceRecord,
  AuditLog,
  NotificationItem,
  BedStatus,
  AttendanceStatus,
  PaymentMethod,
  CheckoutRecord
} from '../types';
import {
  initialUser,
  initialProperties,
  initialFloors,
  initialRooms,
  initialBeds,
  initialTenants,
  initialRentRecords,
  initialPayments,
  initialReceipts,
  initialAttendance,
  initialAuditLogs,
  initialNotifications
} from '../data/mockData';

interface AppContextType {
  // User & Navigation
  user: UserProfile;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;

  // Data
  properties: Property[];
  floors: Floor[];
  rooms: Room[];
  beds: Bed[];
  tenants: Tenant[];
  rentRecords: RentRecord[];
  payments: Payment[];
  receipts: Receipt[];
  attendance: AttendanceRecord[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  checkouts: CheckoutRecord[];

  // Computed KPIs
  stats: {
    totalProperties: number;
    totalRooms: number;
    totalBeds: number;
    occupiedBeds: number;
    vacantBeds: number;
    maintenanceBeds: number;
    occupancyRate: number;
    currentMonthCollection: number;
    pendingRent: number;
    overdueRent: number;
    overdueTenantsCount: number;
  };

  // Modals & Active Selections
  activeReceipt: Receipt | null;
  setActiveReceipt: (receipt: Receipt | null) => void;
  activeTenantProfile: Tenant | null;
  setActiveTenantProfile: (tenant: Tenant | null) => void;

  isAddTenantOpen: boolean;
  setIsAddTenantOpen: (open: boolean) => void;
  isAddPropertyOpen: boolean;
  setIsAddPropertyOpen: (open: boolean) => void;
  isAddRoomOpen: boolean;
  setIsAddRoomOpen: (open: boolean) => void;

  isAllocateBedOpen: boolean;
  setIsAllocateBedOpen: (open: boolean) => void;
  allocateTenantId: string | null;
  setAllocateTenantId: (id: string | null) => void;

  isRecordPaymentOpen: boolean;
  setIsRecordPaymentOpen: (open: boolean) => void;
  paymentPrefill: { tenantId?: string; rentRecordId?: string } | null;
  setPaymentPrefill: (prefill: { tenantId?: string; rentRecordId?: string } | null) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutTenantId: string | null;
  setCheckoutTenantId: (id: string | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'totalRooms' | 'totalBeds'>) => void;
  addRoom: (roomId: string, floorId: string, propertyId: string, roomType: any, monthlyRent: number, securityDeposit: number, bedCount: number) => void;
  addTenant: (tenantData: Omit<Tenant, 'id' | 'createdAt' | 'status'>, allocateImmediately?: { propertyId: string; roomId: string; bedId: string; rent: number; deposit: number; dueDate: number }) => void;
  allocateBed: (tenantId: string, propertyId: string, roomId: string, bedId: string, monthlyRent: number, securityDeposit: number, rentDueDate: number) => boolean;
  recordPayment: (rentRecordId: string, amount: number, paymentMethod: PaymentMethod, referenceNumber: string, notes?: string) => Receipt | null;
  markAttendance: (tenantId: string, propertyId: string, date: string, status: AttendanceStatus, notes?: string) => void;
  markAllPresent: (propertyId: string, date: string) => void;
  completeCheckout: (tenantId: string, checkoutData: { checkoutDate: string; unpaidRent: number; damageCharges: number; otherCharges: number; remarks: string; securityDepositHeld: number; netSettlement: number }) => void;
  updateBedStatus: (bedId: string, status: BedStatus) => void;
  verifyKYC: (tenantId: string) => void;
  markNotificationRead: (id: string) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'HAVENOS_PG_DATA_V1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const loadState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('NESTOPS_PG_DATA_V1') || localStorage.getItem('STAYFLOW_PG_DATA_V1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved state', e);
    }
    return null;
  };

  const initial = loadState();

  const [user, setUser] = useState<UserProfile>(initial?.user || initialUser);
  const [properties, setProperties] = useState<Property[]>(initial?.properties || initialProperties);
  const [floors, setFloors] = useState<Floor[]>(initial?.floors || initialFloors);
  const [rooms, setRooms] = useState<Room[]>(initial?.rooms || initialRooms);
  const [beds, setBeds] = useState<Bed[]>(initial?.beds || initialBeds);
  const [tenants, setTenants] = useState<Tenant[]>(initial?.tenants || initialTenants);
  const [rentRecords, setRentRecords] = useState<RentRecord[]>(initial?.rentRecords || initialRentRecords);
  const [payments, setPayments] = useState<Payment[]>(initial?.payments || initialPayments);
  const [receipts, setReceipts] = useState<Receipt[]>(initial?.receipts || initialReceipts);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initial?.attendance || initialAttendance);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initial?.auditLogs || initialAuditLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initial?.notifications || initialNotifications);
  const [checkouts, setCheckouts] = useState<CheckoutRecord[]>(initial?.checkouts || []);

  // UI state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');
  const [activeReceipt, setActiveReceipt] = useState<Receipt | null>(null);
  const [activeTenantProfile, setActiveTenantProfile] = useState<Tenant | null>(null);

  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isAllocateBedOpen, setIsAllocateBedOpen] = useState(false);
  const [allocateTenantId, setAllocateTenantId] = useState<string | null>(null);

  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentPrefill, setPaymentPrefill] = useState<{ tenantId?: string; rentRecordId?: string } | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTenantId, setCheckoutTenantId] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        user,
        properties,
        floors,
        rooms,
        beds,
        tenants,
        rentRecords,
        payments,
        receipts,
        attendance,
        auditLogs,
        notifications,
        checkouts
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to sync to storage', e);
    }
  }, [user, properties, floors, rooms, beds, tenants, rentRecords, payments, receipts, attendance, auditLogs, notifications, checkouts]);

  // Role switch
  const setUserRole = (role: UserRole) => {
    setUser(prev => ({
      ...prev,
      role,
      name: role === 'owner' ? 'Vikramaditya Singhania' : role === 'manager' ? 'Rajesh Nair (Property Manager)' : 'Kishore Kumar (Staff Operations)'
    }));
  };

  // Helper log generator
  const logAction = (action: string, entity: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: user.name,
      userRole: user.role,
      action,
      entity,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const filteredBeds = selectedPropertyId === 'all'
      ? beds
      : beds.filter(b => b.propertyId === selectedPropertyId);

    const filteredRooms = selectedPropertyId === 'all'
      ? rooms
      : rooms.filter(r => r.propertyId === selectedPropertyId);

    const filteredProps = selectedPropertyId === 'all'
      ? properties
      : properties.filter(p => p.id === selectedPropertyId);

    const totalProps = filteredProps.length;
    const totalRms = filteredRooms.length;
    const totalB = filteredBeds.length;
    const occupiedB = filteredBeds.filter(b => b.status === 'OCCUPIED').length;
    const vacantB = filteredBeds.filter(b => b.status === 'AVAILABLE').length;
    const maintenanceB = filteredBeds.filter(b => b.status === 'MAINTENANCE' || b.status === 'BLOCKED').length;

    // Operational beds exclude maintenance/blocked per PRD rule 43
    const operationalBeds = totalB - maintenanceB;
    const occupancyRate = operationalBeds > 0 ? Math.round((occupiedB / operationalBeds) * 100) : 0;

    const filteredRent = selectedPropertyId === 'all'
      ? rentRecords
      : rentRecords.filter(r => r.propertyId === selectedPropertyId);

    const currentMonthCollection = filteredRent.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const pendingRent = filteredRent.reduce((acc, curr) => acc + curr.remainingAmount, 0);
    const overdueRentRecords = filteredRent.filter(r => r.status === 'OVERDUE');
    const overdueRent = overdueRentRecords.reduce((acc, curr) => acc + curr.remainingAmount, 0);
    const overdueTenantsCount = new Set(overdueRentRecords.map(r => r.tenantId)).size;

    return {
      totalProperties: totalProps,
      totalRooms: totalRms,
      totalBeds: totalB,
      occupiedBeds: occupiedB,
      vacantBeds: vacantB,
      maintenanceBeds: maintenanceB,
      occupancyRate,
      currentMonthCollection,
      pendingRent,
      overdueRent,
      overdueTenantsCount
    };
  }, [beds, rooms, properties, rentRecords, selectedPropertyId]);

  // Add Property
  const addProperty = (propData: Omit<Property, 'id' | 'createdAt' | 'totalRooms' | 'totalBeds'>) => {
    const newId = `prop-${Date.now()}`;
    const newProp: Property = {
      ...propData,
      id: newId,
      totalRooms: 0,
      totalBeds: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Auto-create floors
    const newFloors: Floor[] = [];
    for (let f = 1; f <= propData.floorsCount; f++) {
      newFloors.push({
        id: `fl-${newId}-${f}`,
        propertyId: newId,
        floorNumber: f,
        floorName: f === 1 ? 'Ground Floor' : `Floor ${f}`
      });
    }

    setProperties(prev => [newProp, ...prev]);
    setFloors(prev => [...prev, ...newFloors]);
    logAction('PROPERTY_CREATE', 'Property', `Created property "${propData.name}" with ${propData.floorsCount} floors`);
  };

  // Add Room with Beds
  const addRoom = (
    roomNumber: string,
    floorId: string,
    propertyId: string,
    roomType: 'Single' | 'Double' | 'Triple' | 'Four-bed',
    monthlyRent: number,
    securityDeposit: number,
    bedCount: number
  ) => {
    const newRoomId = `rm-${propertyId}-${roomNumber}-${Date.now()}`;
    const newRoom: Room = {
      id: newRoomId,
      propertyId,
      floorId,
      roomNumber,
      roomType,
      totalBeds: bedCount,
      monthlyRent,
      securityDeposit,
      amenities: ['Wi-Fi', 'Attached Bath', 'Power Backup'],
      status: 'active'
    };

    const bedLetters = ['A', 'B', 'C', 'D'];
    const newBeds: Bed[] = [];
    for (let i = 0; i < bedCount; i++) {
      newBeds.push({
        id: `bed-${newRoomId}-${bedLetters[i]}`,
        roomId: newRoomId,
        propertyId,
        bedNumber: bedLetters[i],
        status: 'AVAILABLE',
        monthlyRent
      });
    }

    setRooms(prev => [...prev, newRoom]);
    setBeds(prev => [...prev, ...newBeds]);

    // Update Property room & bed count
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return {
          ...p,
          totalRooms: p.totalRooms + 1,
          totalBeds: p.totalBeds + bedCount
        };
      }
      return p;
    }));

    logAction('ROOM_CREATE', 'Room', `Added Room ${roomNumber} (${roomType}) with ${bedCount} beds to property`);
  };

  // Add Tenant
  const addTenant = (
    tenantData: Omit<Tenant, 'id' | 'createdAt' | 'status'>,
    allocateImmediately?: { propertyId: string; roomId: string; bedId: string; rent: number; deposit: number; dueDate: number }
  ) => {
    const newTenantId = `ten-${Date.now()}`;
    const newTenant: Tenant = {
      ...tenantData,
      id: newTenantId,
      createdAt: new Date().toISOString().split('T')[0],
      status: allocateImmediately ? 'ACTIVE' : 'REGISTERED',
      stayInfo: allocateImmediately
        ? {
            propertyId: allocateImmediately.propertyId,
            roomId: allocateImmediately.roomId,
            bedId: allocateImmediately.bedId,
            joiningDate: new Date().toISOString().split('T')[0],
            monthlyRent: allocateImmediately.rent,
            securityDeposit: allocateImmediately.deposit,
            rentDueDate: allocateImmediately.dueDate
          }
        : undefined
    };

    setTenants(prev => [newTenant, ...prev]);

    if (allocateImmediately) {
      // Mark bed as OCCUPIED
      setBeds(prev => prev.map(b => {
        if (b.id === allocateImmediately.bedId) {
          return {
            ...b,
            status: 'OCCUPIED',
            currentTenantId: newTenantId,
            allocationDate: new Date().toISOString().split('T')[0]
          };
        }
        return b;
      }));

      // Generate current month rent record
      const today = new Date();
      const rentRecId = `rent-${newTenantId}-${Date.now()}`;
      const newRent: RentRecord = {
        id: rentRecId,
        tenantId: newTenantId,
        propertyId: allocateImmediately.propertyId,
        roomId: allocateImmediately.roomId,
        bedId: allocateImmediately.bedId,
        billingPeriod: 'October 2026',
        month: 10,
        year: 2026,
        rentAmount: allocateImmediately.rent,
        paidAmount: 0,
        remainingAmount: allocateImmediately.rent,
        dueDate: `2026-10-${String(allocateImmediately.dueDate).padStart(2, '0')}`,
        status: 'PENDING'
      };
      setRentRecords(prev => [newRent, ...prev]);
    }

    logAction('TENANT_REGISTER', 'Tenant', `Registered tenant ${tenantData.fullName}${allocateImmediately ? ' and allocated bed' : ''}`);
  };

  // Allocate Bed
  const allocateBed = (
    tenantId: string,
    propertyId: string,
    roomId: string,
    bedId: string,
    monthlyRent: number,
    securityDeposit: number,
    rentDueDate: number
  ): boolean => {
    const bed = beds.find(b => b.id === bedId);
    if (!bed || bed.status !== 'AVAILABLE') {
      alert('Selected bed is not available for allocation.');
      return false;
    }

    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) return false;

    // Update Bed status
    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        return {
          ...b,
          status: 'OCCUPIED',
          currentTenantId: tenantId,
          allocationDate: new Date().toISOString().split('T')[0]
        };
      }
      return b;
    }));

    // Update Tenant
    setTenants(prev => prev.map(t => {
      if (t.id === tenantId) {
        return {
          ...t,
          status: 'ACTIVE',
          stayInfo: {
            propertyId,
            roomId,
            bedId,
            joiningDate: new Date().toISOString().split('T')[0],
            monthlyRent,
            securityDeposit,
            rentDueDate
          }
        };
      }
      return t;
    }));

    // Generate initial rent schedule for active month
    const rentRecId = `rent-${tenantId}-${Date.now()}`;
    const newRent: RentRecord = {
      id: rentRecId,
      tenantId,
      propertyId,
      roomId,
      bedId,
      billingPeriod: 'October 2026',
      month: 10,
      year: 2026,
      rentAmount: monthlyRent,
      paidAmount: 0,
      remainingAmount: monthlyRent,
      dueDate: `2026-10-${String(rentDueDate).padStart(2, '0')}`,
      status: 'PENDING'
    };
    setRentRecords(prev => [newRent, ...prev]);

    logAction('BED_ALLOCATE', 'Allocation', `Allocated Bed ${bed.bedNumber} to ${tenant.fullName}`);
    return true;
  };

  // Record Payment
  const recordPayment = (
    rentRecordId: string,
    amount: number,
    paymentMethod: PaymentMethod,
    referenceNumber: string,
    notes?: string
  ): Receipt | null => {
    const rentRecord = rentRecords.find(r => r.id === rentRecordId);
    if (!rentRecord) return null;

    const tenant = tenants.find(t => t.id === rentRecord.tenantId);
    const property = properties.find(p => p.id === rentRecord.propertyId);
    const room = rooms.find(r => r.id === rentRecord.roomId);
    const bed = beds.find(b => b.id === rentRecord.bedId);

    const prevBalance = rentRecord.remainingAmount;
    const newPaidAmount = rentRecord.paidAmount + amount;
    const newRemainingAmount = Math.max(0, rentRecord.rentAmount - newPaidAmount);
    const newStatus = newRemainingAmount === 0 ? 'PAID' : 'PARTIAL';

    // Unique Receipt format REC-2026-XXXXXX
    const receiptNum = `REC-2026-${String(payments.length + 110).padStart(6, '0')}`;
    const paymentId = `pay-${Date.now()}`;

    const newPayment: Payment = {
      id: paymentId,
      receiptNumber: receiptNum,
      tenantId: rentRecord.tenantId,
      propertyId: rentRecord.propertyId,
      rentRecordId,
      amount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      referenceNumber,
      notes,
      recordedBy: user.name
    };

    const newReceipt: Receipt = {
      id: `rec-${Date.now()}`,
      receiptNumber: receiptNum,
      propertyId: rentRecord.propertyId,
      propertyName: property?.name || 'HavenOS PG',
      propertyAddress: property ? `${property.address}, ${property.city}` : 'India',
      tenantId: rentRecord.tenantId,
      tenantName: tenant?.fullName || 'Resident',
      tenantMobile: tenant?.mobile || '',
      roomNumber: room?.roomNumber || 'N/A',
      bedNumber: bed?.bedNumber || 'A',
      billingPeriod: rentRecord.billingPeriod,
      paymentDate: new Date().toISOString().split('T')[0],
      amountPaid: amount,
      paymentMethod,
      referenceNumber,
      previousBalance: prevBalance,
      remainingBalance: newRemainingAmount,
      authorizedBy: `${user.name} (${user.role.toUpperCase()})`
    };

    // Update Rent Record
    setRentRecords(prev => prev.map(r => {
      if (r.id === rentRecordId) {
        return {
          ...r,
          paidAmount: newPaidAmount,
          remainingAmount: newRemainingAmount,
          status: newStatus
        };
      }
      return r;
    }));

    setPayments(prev => [newPayment, ...prev]);
    setReceipts(prev => [newReceipt, ...prev]);

    logAction('PAYMENT_COLLECT', 'Payment', `Recorded ${paymentMethod} payment of ₹${amount.toLocaleString('en-IN')} for ${tenant?.fullName} (${receiptNum})`);

    // Confetti celebration
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }

    return newReceipt;
  };

  // Mark Daily Attendance
  const markAttendance = (
    tenantId: string,
    propertyId: string,
    date: string,
    status: AttendanceStatus,
    notes?: string
  ) => {
    setAttendance(prev => {
      const existingIndex = prev.findIndex(a => a.tenantId === tenantId && a.date === date);
      const timestamp = `${date} ${new Date().toTimeString().split(' ')[0]}`;

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          status,
          notes,
          timestamp,
          markedBy: user.name
        };
        return updated;
      } else {
        const newRecord: AttendanceRecord = {
          id: `att-${Date.now()}-${Math.random()}`,
          tenantId,
          propertyId,
          date,
          status,
          markedBy: user.name,
          timestamp,
          notes
        };
        return [newRecord, ...prev];
      }
    });

    const tenant = tenants.find(t => t.id === tenantId);
    logAction('ATTENDANCE_MARK', 'Attendance', `Marked ${status} for ${tenant?.fullName || 'Tenant'} on ${date}`);
  };

  // Mark All Present
  const markAllPresent = (propertyId: string, date: string) => {
    const activeTenantsInProp = tenants.filter(t =>
      t.status === 'ACTIVE' && (propertyId === 'all' || t.stayInfo?.propertyId === propertyId)
    );

    activeTenantsInProp.forEach(tenant => {
      if (tenant.stayInfo) {
        markAttendance(tenant.id, tenant.stayInfo.propertyId, date, 'PRESENT');
      }
    });

    logAction('ATTENDANCE_BULK', 'Attendance', `Bulk marked ${activeTenantsInProp.length} tenants PRESENT for ${date}`);
  };

  // Move-out / Checkout
  const completeCheckout = (
    tenantId: string,
    checkoutData: {
      checkoutDate: string;
      unpaidRent: number;
      damageCharges: number;
      otherCharges: number;
      remarks: string;
      securityDepositHeld: number;
      netSettlement: number;
    }
  ) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) return;

    const bedId = tenant.stayInfo?.bedId;

    // Release Bed to AVAILABLE
    if (bedId) {
      setBeds(prev => prev.map(b => {
        if (b.id === bedId) {
          return {
            ...b,
            status: 'AVAILABLE',
            currentTenantId: undefined,
            allocationDate: undefined
          };
        }
        return b;
      }));
    }

    // Update Tenant to CHECKED_OUT
    setTenants(prev => prev.map(t => {
      if (t.id === tenantId) {
        return {
          ...t,
          status: 'CHECKED_OUT'
        };
      }
      return t;
    }));

    const checkoutRecord: CheckoutRecord = {
      id: `chk-${Date.now()}`,
      tenantId,
      propertyId: tenant.stayInfo?.propertyId || '',
      roomId: tenant.stayInfo?.roomId || '',
      bedId: tenant.stayInfo?.bedId || '',
      checkoutDate: checkoutData.checkoutDate,
      noticePeriodServed: true,
      unpaidRent: checkoutData.unpaidRent,
      damageCharges: checkoutData.damageCharges,
      otherCharges: checkoutData.otherCharges,
      otherChargesRemarks: checkoutData.remarks,
      securityDepositHeld: checkoutData.securityDepositHeld,
      netSettlementAmount: checkoutData.netSettlement,
      settlementStatus: checkoutData.netSettlement >= 0 ? 'SETTLED' : 'PENDING_COLLECTION',
      recordedBy: user.name,
      recordedAt: new Date().toISOString()
    };

    setCheckouts(prev => [checkoutRecord, ...prev]);

    logAction('TENANT_CHECKOUT', 'Checkout', `Completed checkout for ${tenant.fullName}. Bed released to AVAILABLE. Settlement: ₹${checkoutData.netSettlement}`);
  };

  // Update Bed Status
  const updateBedStatus = (bedId: string, status: BedStatus) => {
    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        return { ...b, status };
      }
      return b;
    }));
    logAction('BED_STATUS_CHANGE', 'Bed', `Changed Bed status to ${status}`);
  };

  // Verify KYC
  const verifyKYC = (tenantId: string) => {
    setTenants(prev => prev.map(t => {
      if (t.id === tenantId) {
        return {
          ...t,
          kyc: {
            ...t.kyc,
            verified: true,
            addressProofSubmitted: true
          }
        };
      }
      return t;
    }));
    logAction('KYC_VERIFIED', 'Tenant', `Verified KYC documents for tenant`);
  };

  // Notification Mark Read
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Reset to Demo Data
  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(initialUser);
    setProperties(initialProperties);
    setFloors(initialFloors);
    setRooms(initialRooms);
    setBeds(initialBeds);
    setTenants(initialTenants);
    setRentRecords(initialRentRecords);
    setPayments(initialPayments);
    setReceipts(initialReceipts);
    setAttendance(initialAttendance);
    setAuditLogs(initialAuditLogs);
    setNotifications(initialNotifications);
    setCheckouts([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUserRole,
        activeTab,
        setActiveTab,
        selectedPropertyId,
        setSelectedPropertyId,
        properties,
        floors,
        rooms,
        beds,
        tenants,
        rentRecords,
        payments,
        receipts,
        attendance,
        auditLogs,
        notifications,
        checkouts,
        stats,
        activeReceipt,
        setActiveReceipt,
        activeTenantProfile,
        setActiveTenantProfile,
        isAddTenantOpen,
        setIsAddTenantOpen,
        isAddPropertyOpen,
        setIsAddPropertyOpen,
        isAddRoomOpen,
        setIsAddRoomOpen,
        isAllocateBedOpen,
        setIsAllocateBedOpen,
        allocateTenantId,
        setAllocateTenantId,
        isRecordPaymentOpen,
        setIsRecordPaymentOpen,
        paymentPrefill,
        setPaymentPrefill,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutTenantId,
        setCheckoutTenantId,
        isSearchOpen,
        setIsSearchOpen,
        addProperty,
        addRoom,
        addTenant,
        allocateBed,
        recordPayment,
        markAttendance,
        markAllPresent,
        completeCheckout,
        updateBedStatus,
        verifyKYC,
        markNotificationRead,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
