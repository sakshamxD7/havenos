export type UserRole = 'owner' | 'manager' | 'staff';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationName: string;
  avatarUrl: string;
}

export type PropertyType = 'PG' | 'Hostel' | 'Co-living' | 'Apartment' | 'Student Accommodation';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  pincode: string;
  managerName: string;
  managerPhone: string;
  floorsCount: number;
  totalRooms: number;
  totalBeds: number;
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: string;
}

export interface Floor {
  id: string;
  propertyId: string;
  floorNumber: number;
  floorName: string;
}

export type RoomType = 'Single' | 'Double' | 'Triple' | 'Four-bed';

export interface Room {
  id: string;
  propertyId: string;
  floorId: string;
  roomNumber: string;
  roomType: RoomType;
  totalBeds: number;
  monthlyRent: number;
  securityDeposit: number;
  amenities: string[];
  status: 'active' | 'maintenance';
}

export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE' | 'BLOCKED';

export interface Bed {
  id: string;
  roomId: string;
  propertyId: string;
  bedNumber: string;
  status: BedStatus;
  currentTenantId?: string;
  monthlyRent: number;
  allocationDate?: string;
}

export type TenantStatus = 'REGISTERED' | 'ACTIVE' | 'NOTICE_PERIOD' | 'CHECKED_OUT' | 'ARCHIVED';

export interface TenantKYC {
  idType: 'Aadhaar' | 'PAN' | 'Passport' | 'Driving License';
  idNumber: string;
  verified: boolean;
  addressProofSubmitted: boolean;
  documentName?: string;
  photoUrl?: string;
}

export interface TenantStayInfo {
  propertyId: string;
  roomId: string;
  bedId: string;
  joiningDate: string;
  expectedCheckoutDate?: string;
  monthlyRent: number;
  securityDeposit: number;
  rentDueDate: number; // e.g. 5 = 5th of each month
}

export interface Tenant {
  id: string;
  fullName: string;
  guardianName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  emergencyContact: {
    name: string;
    relation: string;
    mobile: string;
  };
  permanentAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  kyc: TenantKYC;
  stayInfo?: TenantStayInfo;
  status: TenantStatus;
  noticeDate?: string;
  createdAt: string;
}

export type RentStatus = 'UPCOMING' | 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'WAIVED';

export interface RentRecord {
  id: string;
  tenantId: string;
  propertyId: string;
  roomId: string;
  bedId: string;
  billingPeriod: string; // e.g. "October 2026"
  month: number;
  year: number;
  rentAmount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string; // YYYY-MM-DD
  status: RentStatus;
}

export type PaymentMethod = 'UPI' | 'Cash' | 'Bank Transfer' | 'Card';

export interface Payment {
  id: string;
  receiptNumber: string;
  tenantId: string;
  propertyId: string;
  rentRecordId?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  referenceNumber: string;
  notes?: string;
  recordedBy: string;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  tenantId: string;
  tenantName: string;
  tenantMobile: string;
  roomNumber: string;
  bedNumber: string;
  billingPeriod: string;
  paymentDate: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  referenceNumber: string;
  previousBalance: number;
  remainingBalance: number;
  authorizedBy: string;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LEAVE' | 'OUT';

export interface AttendanceRecord {
  id: string;
  tenantId: string;
  propertyId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  markedBy: string;
  timestamp: string;
  notes?: string;
}

export interface CheckoutRecord {
  id: string;
  tenantId: string;
  propertyId: string;
  roomId: string;
  bedId: string;
  checkoutDate: string;
  noticePeriodServed: boolean;
  unpaidRent: number;
  damageCharges: number;
  otherCharges: number;
  otherChargesRemarks?: string;
  securityDepositHeld: number;
  netSettlementAmount: number; // positive = refund to tenant, negative = tenant pays
  settlementStatus: 'SETTLED' | 'PENDING_REFUND' | 'PENDING_COLLECTION';
  recordedBy: string;
  recordedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  details: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'overdue' | 'kyc' | 'vacant' | 'checkout' | 'payment';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}
