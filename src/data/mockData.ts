import {
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
  UserProfile
} from '../types';

export const initialUser: UserProfile = {
  id: 'usr_owner_01',
  name: 'Vikramaditya Singhania',
  email: 'vikram@havenos.io',
  role: 'owner',
  organizationName: 'Singhania Living Assets Ltd.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Silver Oak Elite PG & Suites',
    type: 'PG',
    address: '4th Block, 100 Feet Rd, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    managerName: 'Rajesh Nair',
    managerPhone: '+91 98450 12345',
    floorsCount: 3,
    totalRooms: 8,
    totalBeds: 18,
    status: 'active',
    createdAt: '2025-01-15'
  },
  {
    id: 'prop-2',
    name: 'Emerald Heights Hostel',
    type: 'Hostel',
    address: 'Phase 1, Tech Park Avenue, Hinjewadi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    managerName: 'Sunil Kadam',
    managerPhone: '+91 98220 98765',
    floorsCount: 2,
    totalRooms: 6,
    totalBeds: 14,
    status: 'active',
    createdAt: '2025-04-10'
  },
  {
    id: 'prop-3',
    name: 'CyberCity Co-Living Hub',
    type: 'Co-living',
    address: 'Plot 42, Financial District, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500032',
    managerName: 'Karthik Reddy',
    managerPhone: '+91 99887 54321',
    floorsCount: 2,
    totalRooms: 4,
    totalBeds: 8,
    status: 'active',
    createdAt: '2025-08-20'
  }
];

export const initialFloors: Floor[] = [
  // Prop 1 floors
  { id: 'fl-1-1', propertyId: 'prop-1', floorNumber: 1, floorName: 'Ground Floor' },
  { id: 'fl-1-2', propertyId: 'prop-1', floorNumber: 2, floorName: 'First Floor' },
  { id: 'fl-1-3', propertyId: 'prop-1', floorNumber: 3, floorName: 'Second Floor' },

  // Prop 2 floors
  { id: 'fl-2-1', propertyId: 'prop-2', floorNumber: 1, floorName: 'Level 1' },
  { id: 'fl-2-2', propertyId: 'prop-2', floorNumber: 2, floorName: 'Level 2' },

  // Prop 3 floors
  { id: 'fl-3-1', propertyId: 'prop-3', floorNumber: 1, floorName: 'Wing A' },
  { id: 'fl-3-2', propertyId: 'prop-3', floorNumber: 2, floorName: 'Wing B' }
];

export const initialRooms: Room[] = [
  // Prop 1 - Floor 1
  {
    id: 'rm-101',
    propertyId: 'prop-1',
    floorId: 'fl-1-1',
    roomNumber: '101',
    roomType: 'Double',
    totalBeds: 2,
    monthlyRent: 12500,
    securityDeposit: 25000,
    amenities: ['AC', 'Attached Bath', 'Wi-Fi', 'Wardrobe', 'Geyser'],
    status: 'active'
  },
  {
    id: 'rm-102',
    propertyId: 'prop-1',
    floorId: 'fl-1-1',
    roomNumber: '102',
    roomType: 'Double',
    totalBeds: 2,
    monthlyRent: 12500,
    securityDeposit: 25000,
    amenities: ['AC', 'Attached Bath', 'Wi-Fi', 'Balcony'],
    status: 'active'
  },
  // Prop 1 - Floor 2
  {
    id: 'rm-201',
    propertyId: 'prop-1',
    floorId: 'fl-1-2',
    roomNumber: '201',
    roomType: 'Triple',
    totalBeds: 3,
    monthlyRent: 9500,
    securityDeposit: 19000,
    amenities: ['Wi-Fi', 'Attached Bath', 'Study Desk', 'Power Backup'],
    status: 'active'
  },
  {
    id: 'rm-202',
    propertyId: 'prop-1',
    floorId: 'fl-1-2',
    roomNumber: '202',
    roomType: 'Single',
    totalBeds: 1,
    monthlyRent: 19000,
    securityDeposit: 38000,
    amenities: ['AC', 'Attached Bath', 'Balcony', 'Smart TV', 'Fridge'],
    status: 'active'
  },
  // Prop 1 - Floor 3
  {
    id: 'rm-301',
    propertyId: 'prop-1',
    floorId: 'fl-1-3',
    roomNumber: '301',
    roomType: 'Double',
    totalBeds: 2,
    monthlyRent: 12000,
    securityDeposit: 24000,
    amenities: ['AC', 'Attached Bath', 'Wi-Fi'],
    status: 'active'
  },
  {
    id: 'rm-302',
    propertyId: 'prop-1',
    floorId: 'fl-1-3',
    roomNumber: '302',
    roomType: 'Triple',
    totalBeds: 3,
    monthlyRent: 9000,
    securityDeposit: 18000,
    amenities: ['Wi-Fi', 'Attached Bath', 'Lockers'],
    status: 'active'
  },

  // Prop 2 - Emerald Heights
  {
    id: 'rm-p2-101',
    propertyId: 'prop-2',
    floorId: 'fl-2-1',
    roomNumber: 'A-101',
    roomType: 'Double',
    totalBeds: 2,
    monthlyRent: 11000,
    securityDeposit: 22000,
    amenities: ['Wi-Fi', 'Attached Bath', 'RO Drinking Water'],
    status: 'active'
  },
  {
    id: 'rm-p2-102',
    propertyId: 'prop-2',
    floorId: 'fl-2-1',
    roomNumber: 'A-102',
    roomType: 'Triple',
    totalBeds: 3,
    monthlyRent: 8500,
    securityDeposit: 17000,
    amenities: ['Wi-Fi', 'Lockers', 'Power Backup'],
    status: 'active'
  },
  {
    id: 'rm-p2-201',
    propertyId: 'prop-2',
    floorId: 'fl-2-2',
    roomNumber: 'B-201',
    roomType: 'Four-bed',
    totalBeds: 4,
    monthlyRent: 7500,
    securityDeposit: 15000,
    amenities: ['Attached Bath', 'Wi-Fi', 'Cupboard'],
    status: 'active'
  },

  // Prop 3 - CyberCity
  {
    id: 'rm-p3-101',
    propertyId: 'prop-3',
    floorId: 'fl-3-1',
    roomNumber: 'Hub-1',
    roomType: 'Single',
    totalBeds: 1,
    monthlyRent: 22000,
    securityDeposit: 44000,
    amenities: ['AC', 'Attached Bath', 'High-Speed Wi-Fi', 'Smart TV', 'Desk Setup'],
    status: 'active'
  },
  {
    id: 'rm-p3-102',
    propertyId: 'prop-3',
    floorId: 'fl-3-1',
    roomNumber: 'Hub-2',
    roomType: 'Double',
    totalBeds: 2,
    monthlyRent: 14000,
    securityDeposit: 28000,
    amenities: ['AC', 'Attached Bath', 'Wi-Fi', 'Balcony'],
    status: 'active'
  }
];

export const initialBeds: Bed[] = [
  // rm-101 (Double)
  { id: 'bed-101-a', roomId: 'rm-101', propertyId: 'prop-1', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-1', monthlyRent: 12500, allocationDate: '2026-01-10' },
  { id: 'bed-101-b', roomId: 'rm-101', propertyId: 'prop-1', bedNumber: 'B', status: 'OCCUPIED', currentTenantId: 'ten-2', monthlyRent: 12500, allocationDate: '2026-02-01' },

  // rm-102 (Double)
  { id: 'bed-102-a', roomId: 'rm-102', propertyId: 'prop-1', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-3', monthlyRent: 12500, allocationDate: '2026-03-15' },
  { id: 'bed-102-b', roomId: 'rm-102', propertyId: 'prop-1', bedNumber: 'B', status: 'AVAILABLE', monthlyRent: 12500 },

  // rm-201 (Triple)
  { id: 'bed-201-a', roomId: 'rm-201', propertyId: 'prop-1', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-4', monthlyRent: 9500, allocationDate: '2026-04-01' },
  { id: 'bed-201-b', roomId: 'rm-201', propertyId: 'prop-1', bedNumber: 'B', status: 'AVAILABLE', monthlyRent: 9500 },
  { id: 'bed-201-c', roomId: 'rm-201', propertyId: 'prop-1', bedNumber: 'C', status: 'RESERVED', monthlyRent: 9500 },

  // rm-202 (Single)
  { id: 'bed-202-a', roomId: 'rm-202', propertyId: 'prop-1', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-5', monthlyRent: 19000, allocationDate: '2026-01-05' },

  // rm-301 (Double)
  { id: 'bed-301-a', roomId: 'rm-301', propertyId: 'prop-1', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-6', monthlyRent: 12000, allocationDate: '2026-05-20' },
  { id: 'bed-301-b', roomId: 'rm-301', propertyId: 'prop-1', bedNumber: 'B', status: 'MAINTENANCE', monthlyRent: 12000 },

  // rm-302 (Triple)
  { id: 'bed-302-a', roomId: 'rm-302', propertyId: 'prop-1', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-7', monthlyRent: 9000, allocationDate: '2026-06-01' },
  { id: 'bed-302-b', roomId: 'rm-302', propertyId: 'prop-1', bedNumber: 'B', status: 'AVAILABLE', monthlyRent: 9000 },
  { id: 'bed-302-c', roomId: 'rm-302', propertyId: 'prop-1', bedNumber: 'C', status: 'AVAILABLE', monthlyRent: 9000 },

  // Prop 2: rm-p2-101
  { id: 'bed-p2-101-a', roomId: 'rm-p2-101', propertyId: 'prop-2', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-8', monthlyRent: 11000, allocationDate: '2026-03-01' },
  { id: 'bed-p2-101-b', roomId: 'rm-p2-101', propertyId: 'prop-2', bedNumber: 'B', status: 'AVAILABLE', monthlyRent: 11000 },

  // Prop 2: rm-p2-102
  { id: 'bed-p2-102-a', roomId: 'rm-p2-102', propertyId: 'prop-2', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-9', monthlyRent: 8500, allocationDate: '2026-07-15' },
  { id: 'bed-p2-102-b', roomId: 'rm-p2-102', propertyId: 'prop-2', bedNumber: 'B', status: 'AVAILABLE', monthlyRent: 8500 },
  { id: 'bed-p2-102-c', roomId: 'rm-p2-102', propertyId: 'prop-2', bedNumber: 'C', status: 'BLOCKED', monthlyRent: 8500 },

  // Prop 3: rm-p3-101
  { id: 'bed-p3-101-a', roomId: 'rm-p3-101', propertyId: 'prop-3', bedNumber: 'A', status: 'OCCUPIED', currentTenantId: 'ten-10', monthlyRent: 22000, allocationDate: '2026-08-01' },
  // Prop 3: rm-p3-102
  { id: 'bed-p3-102-a', roomId: 'rm-p3-102', propertyId: 'prop-3', bedNumber: 'A', status: 'AVAILABLE', monthlyRent: 14000 },
  { id: 'bed-p3-102-b', roomId: 'rm-p3-102', propertyId: 'prop-3', bedNumber: 'B', status: 'AVAILABLE', monthlyRent: 14000 }
];

export const initialTenants: Tenant[] = [
  {
    id: 'ten-1',
    fullName: 'Aarav Sharma',
    guardianName: 'Ramesh Sharma',
    dob: '2001-04-12',
    gender: 'Male',
    mobile: '+91 98765 43210',
    email: 'aarav.sharma@gmail.com',
    emergencyContact: {
      name: 'Ramesh Sharma',
      relation: 'Father',
      mobile: '+91 94140 11223'
    },
    permanentAddress: {
      address: 'House 42, Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '4921-8830-1928',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_aarav_sharma.pdf'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-101',
      bedId: 'bed-101-a',
      joiningDate: '2026-01-10',
      monthlyRent: 12500,
      securityDeposit: 25000,
      rentDueDate: 5
    },
    status: 'ACTIVE',
    createdAt: '2026-01-08'
  },
  {
    id: 'ten-2',
    fullName: 'Priya Venkatesh',
    guardianName: 'S. Venkatesh',
    dob: '2000-08-25',
    gender: 'Female',
    mobile: '+91 97412 88901',
    email: 'priya.v@techcorp.in',
    emergencyContact: {
      name: 'Lakshmi Venkatesh',
      relation: 'Mother',
      mobile: '+91 94440 99881'
    },
    permanentAddress: {
      address: 'Flat 302, Green Meadows',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600028'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '8839-1120-7764',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_priya_v.pdf'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-101',
      bedId: 'bed-101-b',
      joiningDate: '2026-02-01',
      monthlyRent: 12500,
      securityDeposit: 25000,
      rentDueDate: 5
    },
    status: 'ACTIVE',
    createdAt: '2026-01-28'
  },
  {
    id: 'ten-3',
    fullName: 'Rohan Deshmukh',
    guardianName: 'Anil Deshmukh',
    dob: '1999-11-14',
    gender: 'Male',
    mobile: '+91 98231 66542',
    email: 'rohan.desh@gmail.com',
    emergencyContact: {
      name: 'Anil Deshmukh',
      relation: 'Father',
      mobile: '+91 98230 44332'
    },
    permanentAddress: {
      address: 'Plot 18, Tilak Nagar',
      city: 'Nagpur',
      state: 'Maharashtra',
      pincode: '440010'
    },
    kyc: {
      idType: 'PAN',
      idNumber: 'ABCDE1234F',
      verified: false,
      addressProofSubmitted: false,
      documentName: 'pan_card_rohan.jpg'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-102',
      bedId: 'bed-102-a',
      joiningDate: '2026-03-15',
      monthlyRent: 12500,
      securityDeposit: 25000,
      rentDueDate: 10
    },
    status: 'ACTIVE', // Has overdue dues & KYC pending!
    createdAt: '2026-03-12'
  },
  {
    id: 'ten-4',
    fullName: 'Devansh Verma',
    guardianName: 'Manoj Verma',
    dob: '2002-02-09',
    gender: 'Male',
    mobile: '+91 91234 56789',
    email: 'devansh.v@edu.org',
    emergencyContact: {
      name: 'Manoj Verma',
      relation: 'Father',
      mobile: '+91 99350 11992'
    },
    permanentAddress: {
      address: '22/B, Hazratganj',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '7654-3210-9876',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_devansh.pdf'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-201',
      bedId: 'bed-201-a',
      joiningDate: '2026-04-01',
      monthlyRent: 9500,
      securityDeposit: 19000,
      rentDueDate: 1
    },
    status: 'NOTICE_PERIOD',
    noticeDate: '2026-10-15',
    createdAt: '2026-03-25'
  },
  {
    id: 'ten-5',
    fullName: 'Ananya Banerjee',
    guardianName: 'Subir Banerjee',
    dob: '1998-06-30',
    gender: 'Female',
    mobile: '+91 98301 99223',
    email: 'ananya.b@designstudio.com',
    emergencyContact: {
      name: 'Subir Banerjee',
      relation: 'Father',
      mobile: '+91 98310 55443'
    },
    permanentAddress: {
      address: '14, Salt Lake Sector 2',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091'
    },
    kyc: {
      idType: 'Passport',
      idNumber: 'Z8941203',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'passport_ananya.pdf'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-202',
      bedId: 'bed-202-a',
      joiningDate: '2026-01-05',
      monthlyRent: 19000,
      securityDeposit: 38000,
      rentDueDate: 5
    },
    status: 'ACTIVE',
    createdAt: '2026-01-03'
  },
  {
    id: 'ten-6',
    fullName: 'Karan Mehra',
    guardianName: 'Sanjay Mehra',
    dob: '2001-09-18',
    gender: 'Male',
    mobile: '+91 99112 33445',
    email: 'karan.m@gmail.com',
    emergencyContact: {
      name: 'Sunita Mehra',
      relation: 'Mother',
      mobile: '+91 98110 77665'
    },
    permanentAddress: {
      address: 'C-4/12, Model Town',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110009'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '3344-5566-7788',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_karan.pdf'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-301',
      bedId: 'bed-301-a',
      joiningDate: '2026-05-20',
      monthlyRent: 12000,
      securityDeposit: 24000,
      rentDueDate: 20
    },
    status: 'ACTIVE',
    createdAt: '2026-05-18'
  },
  {
    id: 'ten-7',
    fullName: 'Sneha Patel',
    guardianName: 'Bhavin Patel',
    dob: '2002-12-04',
    gender: 'Female',
    mobile: '+91 98980 12345',
    email: 'sneha.patel@startup.io',
    emergencyContact: {
      name: 'Bhavin Patel',
      relation: 'Father',
      mobile: '+91 98980 99887'
    },
    permanentAddress: {
      address: 'B-12, Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '9900-1122-3344',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_sneha.pdf'
    },
    stayInfo: {
      propertyId: 'prop-1',
      roomId: 'rm-302',
      bedId: 'bed-302-a',
      joiningDate: '2026-06-01',
      monthlyRent: 9000,
      securityDeposit: 18000,
      rentDueDate: 1
    },
    status: 'ACTIVE',
    createdAt: '2026-05-28'
  },
  {
    id: 'ten-8',
    fullName: 'Nikhil Joshi',
    guardianName: 'Prakash Joshi',
    dob: '1999-03-22',
    gender: 'Male',
    mobile: '+91 98224 55667',
    email: 'nikhil.j@infosys.com',
    emergencyContact: {
      name: 'Prakash Joshi',
      relation: 'Father',
      mobile: '+91 98220 11998'
    },
    permanentAddress: {
      address: 'Plot 55, Kothrud',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411038'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '2211-4433-6655',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_nikhil.pdf'
    },
    stayInfo: {
      propertyId: 'prop-2',
      roomId: 'rm-p2-101',
      bedId: 'bed-p2-101-a',
      joiningDate: '2026-03-01',
      monthlyRent: 11000,
      securityDeposit: 22000,
      rentDueDate: 5
    },
    status: 'ACTIVE',
    createdAt: '2026-02-24'
  },
  {
    id: 'ten-9',
    fullName: 'Tanvi Gokhale',
    guardianName: 'Satish Gokhale',
    dob: '2001-07-19',
    gender: 'Female',
    mobile: '+91 97654 32109',
    email: 'tanvi.g@accenture.com',
    emergencyContact: {
      name: 'Satish Gokhale',
      relation: 'Father',
      mobile: '+91 97650 99881'
    },
    permanentAddress: {
      address: '102, Baner Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045'
    },
    kyc: {
      idType: 'PAN',
      idNumber: 'FGHIJ5678K',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'pan_tanvi.jpg'
    },
    stayInfo: {
      propertyId: 'prop-2',
      roomId: 'rm-p2-102',
      bedId: 'bed-p2-102-a',
      joiningDate: '2026-07-15',
      monthlyRent: 8500,
      securityDeposit: 17000,
      rentDueDate: 15
    },
    status: 'ACTIVE',
    createdAt: '2026-07-10'
  },
  {
    id: 'ten-10',
    fullName: 'Siddharth Rao',
    guardianName: 'Venkateshwara Rao',
    dob: '1997-10-05',
    gender: 'Male',
    mobile: '+91 99490 88776',
    email: 'siddharth.rao@microsoft.com',
    emergencyContact: {
      name: 'Venkateshwara Rao',
      relation: 'Father',
      mobile: '+91 99490 11223'
    },
    permanentAddress: {
      address: 'Banjara Hills Rd No. 12',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '1122-3344-5566',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_siddharth.pdf'
    },
    stayInfo: {
      propertyId: 'prop-3',
      roomId: 'rm-p3-101',
      bedId: 'bed-p3-101-a',
      joiningDate: '2026-08-01',
      monthlyRent: 22000,
      securityDeposit: 44000,
      rentDueDate: 1
    },
    status: 'ACTIVE',
    createdAt: '2026-07-28'
  },
  // Unallocated Tenant ready to allocate!
  {
    id: 'ten-11',
    fullName: 'Manish Chawla',
    guardianName: 'Harish Chawla',
    dob: '2000-01-15',
    gender: 'Male',
    mobile: '+91 98100 44321',
    email: 'manish.chawla@gmail.com',
    emergencyContact: {
      name: 'Harish Chawla',
      relation: 'Father',
      mobile: '+91 98100 99887'
    },
    permanentAddress: {
      address: 'Sec 14, Urban Estate',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001'
    },
    kyc: {
      idType: 'Aadhaar',
      idNumber: '6677-8899-0011',
      verified: true,
      addressProofSubmitted: true,
      documentName: 'aadhaar_manish.pdf'
    },
    status: 'REGISTERED', // Ready for Bed Allocation!
    createdAt: '2026-10-25'
  }
];

export const initialRentRecords: RentRecord[] = [
  // October 2026
  {
    id: 'rent-101',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    roomId: 'rm-101',
    bedId: 'bed-101-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 12500,
    paidAmount: 12500,
    remainingAmount: 0,
    dueDate: '2026-10-05',
    status: 'PAID'
  },
  {
    id: 'rent-102',
    tenantId: 'ten-2',
    propertyId: 'prop-1',
    roomId: 'rm-101',
    bedId: 'bed-101-b',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 12500,
    paidAmount: 12500,
    remainingAmount: 0,
    dueDate: '2026-10-05',
    status: 'PAID'
  },
  {
    id: 'rent-103',
    tenantId: 'ten-3',
    propertyId: 'prop-1',
    roomId: 'rm-102',
    bedId: 'bed-102-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 12500,
    paidAmount: 6000,
    remainingAmount: 6500,
    dueDate: '2026-10-10',
    status: 'OVERDUE' // Due date was Oct 10, currently Oct 29
  },
  {
    id: 'rent-104',
    tenantId: 'ten-4',
    propertyId: 'prop-1',
    roomId: 'rm-201',
    bedId: 'bed-201-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 9500,
    paidAmount: 0,
    remainingAmount: 9500,
    dueDate: '2026-10-01',
    status: 'OVERDUE' // 9500 overdue!
  },
  {
    id: 'rent-105',
    tenantId: 'ten-5',
    propertyId: 'prop-1',
    roomId: 'rm-202',
    bedId: 'bed-202-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 19000,
    paidAmount: 19000,
    remainingAmount: 0,
    dueDate: '2026-10-05',
    status: 'PAID'
  },
  {
    id: 'rent-106',
    tenantId: 'ten-6',
    propertyId: 'prop-1',
    roomId: 'rm-301',
    bedId: 'bed-301-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 12000,
    paidAmount: 12000,
    remainingAmount: 0,
    dueDate: '2026-10-20',
    status: 'PAID'
  },
  {
    id: 'rent-107',
    tenantId: 'ten-7',
    propertyId: 'prop-1',
    roomId: 'rm-302',
    bedId: 'bed-302-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 9000,
    paidAmount: 9000,
    remainingAmount: 0,
    dueDate: '2026-10-01',
    status: 'PAID'
  },
  {
    id: 'rent-108',
    tenantId: 'ten-8',
    propertyId: 'prop-2',
    roomId: 'rm-p2-101',
    bedId: 'bed-p2-101-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 11000,
    paidAmount: 11000,
    remainingAmount: 0,
    dueDate: '2026-10-05',
    status: 'PAID'
  },
  {
    id: 'rent-109',
    tenantId: 'ten-9',
    propertyId: 'prop-2',
    roomId: 'rm-p2-102',
    bedId: 'bed-p2-102-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 8500,
    paidAmount: 5000,
    remainingAmount: 3500,
    dueDate: '2026-10-15',
    status: 'OVERDUE'
  },
  {
    id: 'rent-110',
    tenantId: 'ten-10',
    propertyId: 'prop-3',
    roomId: 'rm-p3-101',
    bedId: 'bed-p3-101-a',
    billingPeriod: 'October 2026',
    month: 10,
    year: 2026,
    rentAmount: 22000,
    paidAmount: 22000,
    remainingAmount: 0,
    dueDate: '2026-10-01',
    status: 'PAID'
  }
];

export const initialPayments: Payment[] = [
  {
    id: 'pay-1',
    receiptNumber: 'REC-2026-000101',
    tenantId: 'ten-1',
    propertyId: 'prop-1',
    rentRecordId: 'rent-101',
    amount: 12500,
    paymentDate: '2026-10-04',
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/329482910394/HDFC',
    notes: 'October rent cleared via Google Pay',
    recordedBy: 'Rajesh Nair'
  },
  {
    id: 'pay-2',
    receiptNumber: 'REC-2026-000102',
    tenantId: 'ten-2',
    propertyId: 'prop-1',
    rentRecordId: 'rent-102',
    amount: 12500,
    paymentDate: '2026-10-05',
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/440192839485/ICICI',
    notes: 'October rent payment confirmed',
    recordedBy: 'Rajesh Nair'
  },
  {
    id: 'pay-3',
    receiptNumber: 'REC-2026-000103',
    tenantId: 'ten-3',
    propertyId: 'prop-1',
    rentRecordId: 'rent-103',
    amount: 6000,
    paymentDate: '2026-10-10',
    paymentMethod: 'Cash',
    referenceNumber: 'CSH-102-OCT',
    notes: 'Partial payment of 6,000 received. Balance 6,500 pending.',
    recordedBy: 'Rajesh Nair'
  },
  {
    id: 'pay-4',
    receiptNumber: 'REC-2026-000104',
    tenantId: 'ten-5',
    propertyId: 'prop-1',
    rentRecordId: 'rent-105',
    amount: 19000,
    paymentDate: '2026-10-03',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'NEFT/AXIS/99881122001',
    notes: 'NEFT transfer for Single Room 202',
    recordedBy: 'Vikramaditya Singhania'
  },
  {
    id: 'pay-5',
    receiptNumber: 'REC-2026-000105',
    tenantId: 'ten-6',
    propertyId: 'prop-1',
    rentRecordId: 'rent-106',
    amount: 12000,
    paymentDate: '2026-10-18',
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/889922334411/SBI',
    notes: 'Paid before 20th due date',
    recordedBy: 'Rajesh Nair'
  },
  {
    id: 'pay-6',
    receiptNumber: 'REC-2026-000106',
    tenantId: 'ten-7',
    propertyId: 'prop-1',
    rentRecordId: 'rent-107',
    amount: 9000,
    paymentDate: '2026-10-01',
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/112299884433/PAYTM',
    notes: 'Rent received on 1st',
    recordedBy: 'Rajesh Nair'
  },
  {
    id: 'pay-7',
    receiptNumber: 'REC-2026-000107',
    tenantId: 'ten-8',
    propertyId: 'prop-2',
    rentRecordId: 'rent-108',
    amount: 11000,
    paymentDate: '2026-10-04',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'IMPS/HDFC/77665544',
    notes: 'Emerald Heights Room A-101',
    recordedBy: 'Sunil Kadam'
  },
  {
    id: 'pay-8',
    receiptNumber: 'REC-2026-000108',
    tenantId: 'ten-9',
    propertyId: 'prop-2',
    rentRecordId: 'rent-109',
    amount: 5000,
    paymentDate: '2026-10-14',
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/554433221100/KOTAK',
    notes: 'First installment. Promised remainder by 25th (delayed).',
    recordedBy: 'Sunil Kadam'
  },
  {
    id: 'pay-9',
    receiptNumber: 'REC-2026-000109',
    tenantId: 'ten-10',
    propertyId: 'prop-3',
    rentRecordId: 'rent-110',
    amount: 22000,
    paymentDate: '2026-09-30',
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/332211009988/HDFC',
    notes: 'Advance October rent for Hub-1',
    recordedBy: 'Karthik Reddy'
  }
];

export const initialReceipts: Receipt[] = [
  {
    id: 'rec-1',
    receiptNumber: 'REC-2026-000101',
    propertyId: 'prop-1',
    propertyName: 'Silver Oak Elite PG & Suites',
    propertyAddress: '4th Block, 100 Feet Rd, Koramangala, Bengaluru - 560034',
    tenantId: 'ten-1',
    tenantName: 'Aarav Sharma',
    tenantMobile: '+91 98765 43210',
    roomNumber: '101',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-04',
    amountPaid: 12500,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/329482910394/HDFC',
    previousBalance: 12500,
    remainingBalance: 0,
    authorizedBy: 'Rajesh Nair (Property Manager)'
  },
  {
    id: 'rec-2',
    receiptNumber: 'REC-2026-000102',
    propertyId: 'prop-1',
    propertyName: 'Silver Oak Elite PG & Suites',
    propertyAddress: '4th Block, 100 Feet Rd, Koramangala, Bengaluru - 560034',
    tenantId: 'ten-2',
    tenantName: 'Priya Venkatesh',
    tenantMobile: '+91 97412 88901',
    roomNumber: '101',
    bedNumber: 'B',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-05',
    amountPaid: 12500,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/440192839485/ICICI',
    previousBalance: 12500,
    remainingBalance: 0,
    authorizedBy: 'Rajesh Nair (Property Manager)'
  },
  {
    id: 'rec-3',
    receiptNumber: 'REC-2026-000103',
    propertyId: 'prop-1',
    propertyName: 'Silver Oak Elite PG & Suites',
    propertyAddress: '4th Block, 100 Feet Rd, Koramangala, Bengaluru - 560034',
    tenantId: 'ten-3',
    tenantName: 'Rohan Deshmukh',
    tenantMobile: '+91 98231 66542',
    roomNumber: '102',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-10',
    amountPaid: 6000,
    paymentMethod: 'Cash',
    referenceNumber: 'CSH-102-OCT',
    previousBalance: 12500,
    remainingBalance: 6500,
    authorizedBy: 'Rajesh Nair (Property Manager)'
  },
  {
    id: 'rec-4',
    receiptNumber: 'REC-2026-000104',
    propertyId: 'prop-1',
    propertyName: 'Silver Oak Elite PG & Suites',
    propertyAddress: '4th Block, 100 Feet Rd, Koramangala, Bengaluru - 560034',
    tenantId: 'ten-5',
    tenantName: 'Ananya Banerjee',
    tenantMobile: '+91 98301 99223',
    roomNumber: '202',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-03',
    amountPaid: 19000,
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'NEFT/AXIS/99881122001',
    previousBalance: 19000,
    remainingBalance: 0,
    authorizedBy: 'Vikramaditya Singhania (Owner)'
  },
  {
    id: 'rec-5',
    receiptNumber: 'REC-2026-000105',
    propertyId: 'prop-1',
    propertyName: 'Silver Oak Elite PG & Suites',
    propertyAddress: '4th Block, 100 Feet Rd, Koramangala, Bengaluru - 560034',
    tenantId: 'ten-6',
    tenantName: 'Karan Mehra',
    tenantMobile: '+91 99112 33445',
    roomNumber: '301',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-18',
    amountPaid: 12000,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/889922334411/SBI',
    previousBalance: 12000,
    remainingBalance: 0,
    authorizedBy: 'Rajesh Nair (Property Manager)'
  },
  {
    id: 'rec-6',
    receiptNumber: 'REC-2026-000106',
    propertyId: 'prop-1',
    propertyName: 'Silver Oak Elite PG & Suites',
    propertyAddress: '4th Block, 100 Feet Rd, Koramangala, Bengaluru - 560034',
    tenantId: 'ten-7',
    tenantName: 'Sneha Patel',
    tenantMobile: '+91 98980 12345',
    roomNumber: '302',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-01',
    amountPaid: 9000,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/112299884433/PAYTM',
    previousBalance: 9000,
    remainingBalance: 0,
    authorizedBy: 'Rajesh Nair (Property Manager)'
  },
  {
    id: 'rec-7',
    receiptNumber: 'REC-2026-000107',
    propertyId: 'prop-2',
    propertyName: 'Emerald Heights Hostel',
    propertyAddress: 'Phase 1, Tech Park Avenue, Hinjewadi, Pune - 411057',
    tenantId: 'ten-8',
    tenantName: 'Nikhil Joshi',
    tenantMobile: '+91 98224 55667',
    roomNumber: 'A-101',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-04',
    amountPaid: 11000,
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'IMPS/HDFC/77665544',
    previousBalance: 11000,
    remainingBalance: 0,
    authorizedBy: 'Sunil Kadam (Property Manager)'
  },
  {
    id: 'rec-8',
    receiptNumber: 'REC-2026-000108',
    propertyId: 'prop-2',
    propertyName: 'Emerald Heights Hostel',
    propertyAddress: 'Phase 1, Tech Park Avenue, Hinjewadi, Pune - 411057',
    tenantId: 'ten-9',
    tenantName: 'Tanvi Gokhale',
    tenantMobile: '+91 97654 32109',
    roomNumber: 'A-102',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-10-14',
    amountPaid: 5000,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/554433221100/KOTAK',
    previousBalance: 8500,
    remainingBalance: 3500,
    authorizedBy: 'Sunil Kadam (Property Manager)'
  },
  {
    id: 'rec-9',
    receiptNumber: 'REC-2026-000109',
    propertyId: 'prop-3',
    propertyName: 'CyberCity Co-Living Hub',
    propertyAddress: 'Plot 42, Financial District, Gachibowli, Hyderabad - 500032',
    tenantId: 'ten-10',
    tenantName: 'Siddharth Rao',
    tenantMobile: '+91 99490 88776',
    roomNumber: 'Hub-1',
    bedNumber: 'A',
    billingPeriod: 'October 2026',
    paymentDate: '2026-09-30',
    amountPaid: 22000,
    paymentMethod: 'UPI',
    referenceNumber: 'UPI/332211009988/HDFC',
    previousBalance: 22000,
    remainingBalance: 0,
    authorizedBy: 'Karthik Reddy (Manager)'
  }
];

export const initialAttendance: AttendanceRecord[] = [
  // Today's records (2026-10-29)
  { id: 'att-1', tenantId: 'ten-1', propertyId: 'prop-1', date: '2026-10-29', status: 'PRESENT', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 08:30:12' },
  { id: 'att-2', tenantId: 'ten-2', propertyId: 'prop-1', date: '2026-10-29', status: 'PRESENT', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 08:31:00' },
  { id: 'att-3', tenantId: 'ten-3', propertyId: 'prop-1', date: '2026-10-29', status: 'OUT', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 09:15:22', notes: 'At office in Whitefield' },
  { id: 'att-4', tenantId: 'ten-4', propertyId: 'prop-1', date: '2026-10-29', status: 'PRESENT', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 08:32:15' },
  { id: 'att-5', tenantId: 'ten-5', propertyId: 'prop-1', date: '2026-10-29', status: 'PRESENT', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 08:35:40' },
  { id: 'att-6', tenantId: 'ten-6', propertyId: 'prop-1', date: '2026-10-29', status: 'LEAVE', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 07:45:00', notes: 'Home visit to Delhi till Nov 2' },
  { id: 'att-7', tenantId: 'ten-7', propertyId: 'prop-1', date: '2026-10-29', status: 'PRESENT', markedBy: 'Rajesh Nair', timestamp: '2026-10-29 08:40:10' },
  { id: 'att-8', tenantId: 'ten-8', propertyId: 'prop-2', date: '2026-10-29', status: 'PRESENT', markedBy: 'Sunil Kadam', timestamp: '2026-10-29 09:00:00' },
  { id: 'att-9', tenantId: 'ten-9', propertyId: 'prop-2', date: '2026-10-29', status: 'ABSENT', markedBy: 'Sunil Kadam', timestamp: '2026-10-29 09:02:11', notes: 'No response on phone' },
  { id: 'att-10', tenantId: 'ten-10', propertyId: 'prop-3', date: '2026-10-29', status: 'PRESENT', markedBy: 'Karthik Reddy', timestamp: '2026-10-29 08:15:30' }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-29 10:14:02',
    userName: 'Rajesh Nair',
    userRole: 'manager',
    action: 'RECORD_ATTENDANCE',
    entity: 'Attendance',
    details: 'Marked daily attendance for 7 tenants at Silver Oak Elite PG'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-28 17:30:19',
    userName: 'Vikramaditya Singhania',
    userRole: 'owner',
    action: 'TENANT_REGISTER',
    entity: 'Tenant',
    details: 'Registered new applicant Manish Chawla (pending bed allocation)'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-20 14:22:00',
    userName: 'Rajesh Nair',
    userRole: 'manager',
    action: 'COLLECT_RENT',
    entity: 'Payment',
    details: 'Recorded UPI payment ₹12,000 from Karan Mehra (REC-2026-000105)'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-15 11:05:40',
    userName: 'Devansh Verma',
    userRole: 'manager',
    action: 'NOTICE_PERIOD',
    entity: 'Tenant',
    details: 'Tenant Devansh Verma submitted 30-day move-out notice (Room 201)'
  },
  {
    id: 'log-5',
    timestamp: '2026-10-10 16:40:11',
    userName: 'Rajesh Nair',
    userRole: 'manager',
    action: 'COLLECT_RENT_PARTIAL',
    entity: 'Payment',
    details: 'Recorded partial cash payment ₹6,000 for Rohan Deshmukh (Balance ₹6,500)'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '4 Rents Overdue',
    message: '₹19,500 total rent past due date across Silver Oak and Emerald Heights.',
    type: 'overdue',
    timestamp: '2 hours ago',
    read: false,
    linkTab: 'rent'
  },
  {
    id: 'notif-2',
    title: 'KYC Document Missing',
    message: 'Tenant Rohan Deshmukh (Room 102) requires address proof verification.',
    type: 'kyc',
    timestamp: '5 hours ago',
    read: false,
    linkTab: 'tenants'
  },
  {
    id: 'notif-3',
    title: 'Checkout Pending Notice',
    message: 'Devansh Verma (Room 201-A) notice period ends Nov 14. Deposit calculation pending.',
    type: 'checkout',
    timestamp: '1 day ago',
    read: false,
    linkTab: 'tenants'
  },
  {
    id: 'notif-4',
    title: 'Vacant Bed Available',
    message: 'Bed 102-B at Silver Oak Elite is clean and ready for allocation.',
    type: 'vacant',
    timestamp: '1 day ago',
    read: true,
    linkTab: 'properties'
  }
];
