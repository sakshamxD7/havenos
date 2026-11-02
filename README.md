# HavenOS — PG & Property Management OS

A centralized property, room, bed, tenant, rent, dues, and operational lifecycle operating system built for PG, hostel, co-living, and rental property owners.

---

## 🏢 Overview

**HavenOS** eliminates dependence on physical registers, fragmented spreadsheets, and manual rent calculations by unifying all property workflows into an ultra-fast, single source of truth.

- **Bed-Level Matrix**: Track every bed (`AVAILABLE`, `OCCUPIED`, `RESERVED`, `MAINTENANCE`, `BLOCKED`) with live occupancy indicators.
- **Tenant Registry & KYC**: Complete 360° resident profiles with Aadhaar/PAN verification, stay dates, emergency contacts, and move-out tracking.
- **Rent & Dues Ledger**: Structured financial cycles, partial payment reconciliation, overdue tracking, and automated receipt generation (`REC-2026-XXXXXX`).
- **Official Print Receipts**: Clean printable digital receipts with tax breakdown, transaction reference, and authorized signatory.
- **Daily Attendance**: Rapid check-in/out roster with single-click "Mark All Present" and absentee tracking.
- **Move-Out / Checkout Settlement**: Built-in settlement calculator (Security Deposit minus unpaid rent and damage adjustments) with automatic bed release.
- **Role-Based Views**: Instant simulation of Owner, Manager, and Staff operation levels.
- **Audit Trail**: Security-backed logging of all financial and occupancy state changes.

---

## 🎨 Design Philosophy: Flat Design & Color Blocking

Built strictly conforming to the **Flat Design Specification**:
- **Zero Artificial Depth**: No drop-shadows (`shadow-none`), no bevels, no glassy blurs.
- **Color as Structure**: High-contrast, vibrant digital-native colors (`#3B82F6` Action Blue, `#10B981` Emerald, `#F59E0B` Amber, `#EF4444` Crimson) define structural blocks.
- **Typography as Interface**: Pure geometric sans-serif **'Outfit'** with tight letter-spacing.
- **Snappy Interactive Feedback**: Crisp scale transitions (`hover:scale-105`), instant color fills, and pronounced button states.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Running Locally
```bash
# Navigate to project folder
cd C:\Users\saksh\.gemini\antigravity\scratch\havenos-pg-manager

# Start Vite dev server
npm run dev

# Or build production assets
npm run build
```
