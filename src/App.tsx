import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { PropertiesView } from './components/properties/PropertiesView';
import { TenantsView } from './components/tenants/TenantsView';
import { RentView } from './components/rent/RentView';
import { ReceiptsView } from './components/receipts/ReceiptsView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { ReportsView } from './components/reports/ReportsView';
import { AuditLogsView } from './components/audit/AuditLogsView';

// Modals
import { TenantProfileModal } from './components/tenants/TenantProfileModal';
import { AddTenantModal } from './components/tenants/AddTenantModal';
import { AllocateBedModal } from './components/allocation/AllocateBedModal';
import { RecordPaymentModal } from './components/rent/RecordPaymentModal';
import { ReceiptModal } from './components/receipts/ReceiptModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { AddPropertyModal } from './components/properties/AddPropertyModal';
import { AddRoomModal } from './components/properties/AddRoomModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Content View Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-white overflow-x-hidden min-h-[calc(100vh-80px)]">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'properties' && <PropertiesView />}
          {activeTab === 'tenants' && <TenantsView />}
          {activeTab === 'rent' && <RentView />}
          {activeTab === 'receipts' && <ReceiptsView />}
          {activeTab === 'attendance' && <AttendanceView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'audit' && <AuditLogsView />}
        </main>
      </div>

      {/* Global Modals & Dialogs */}
      <TenantProfileModal />
      <AddTenantModal />
      <AllocateBedModal />
      <RecordPaymentModal />
      <ReceiptModal />
      <CheckoutModal />
      <AddPropertyModal />
      <AddRoomModal />
      <GlobalSearchModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
