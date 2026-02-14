# Contractor Management Application - Technical Specification Document

**Version:** 1.0  
**Last Updated:** February 14, 2026  
**Document Type:** Technical Specification for Spec-Driven Development

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Core Requirements](#core-requirements)
4. [Technical Architecture](#technical-architecture)
5. [Feature Specifications](#feature-specifications)
6. [Data Models](#data-models)
7. [API Specifications](#api-specifications)
8. [Plugin Architecture](#plugin-architecture)
9. [Security & Compliance](#security--compliance)
10. [UI/UX Guidelines](#uiux-guidelines)
11. [Internationalization](#internationalization)
12. [Deployment Strategy](#deployment-strategy)
13. [Testing Requirements](#testing-requirements)
14. [Future Enhancements](#future-enhancements)

---

## 1. Executive Summary

### 1.1 Purpose
This document defines the technical specifications for a contractor management application designed specifically for small to medium-sized contracting businesses (electricians, plumbers, HVAC, etc.). The application prioritizes simplicity and ease of use for non-technical users while providing essential business management capabilities.

### 1.2 Key Objectives
- Provide dead-simple interface for non-technical contractors
- Enable time tracking with location verification
- Streamline project management and financial tracking
- Support bilingual operation (English/Spanish) with easy language expansion
- Facilitate team communication and client relationship management
- Support extensibility through plugin architecture
- Function reliably in offline scenarios

### 1.3 Target Users
- **Primary:** Contractors, field workers, project managers
- **Secondary:** Office staff, administrators, clients
- **Technical Proficiency:** Low to medium

---

## 2. Project Overview

### 2.1 Application Type
Progressive Web Application (PWA) with offline-first capabilities

### 2.2 Core Value Proposition
A simple, bilingual business management tool that reduces administrative burden for contractors while ensuring accurate time tracking, project oversight, and client communication.

### 2.3 Success Metrics
- User adoption rate among non-technical workers
- Time to complete common tasks (clock in, create project, etc.)
- Offline functionality reliability
- User satisfaction scores
- Reduction in administrative overhead

---

## 3. Core Requirements

### 3.1 Functional Requirements

#### FR-001: User Authentication & Authorization
- Secure user registration and login
- Role-based access control (Admin, Manager, Worker, Client)
- Password reset functionality
- Session management with configurable timeout
- Multi-factor authentication (optional, admin-configurable)
- Social login options (Google, Apple) - optional

#### FR-002: Time Tracking & Geolocation
- Clock in/out functionality
- Real-time GPS location capture on clock events
- Geofencing validation (configurable radius per project)
- Automatic clock-out after configurable period
- Break time tracking
- Offline clock events (synced when online)
- Location history and audit trail
- Manual time entry (admin/manager only, with approval workflow)

#### FR-003: Project Management
- Create, read, update, delete (CRUD) projects
- Project status workflow (Lead → Quoted → Approved → In Progress → Completed → Invoiced → Paid)
- Assign team members to projects
- Track project materials and equipment
- Photo uploads for project documentation
- Project notes and comments
- Milestone tracking with dates
- Project templates for common job types

#### FR-004: Financial Tracking
- Expense entry and categorization
- Receipt photo capture and attachment
- Payment tracking (deposits, progress payments, final payment)
- Invoice generation (basic PDF)
- Budget vs. actual tracking per project
- Mileage tracking with automatic calculation
- Payment reminders and notifications

#### FR-005: Dashboard & Reporting
- Executive dashboard (all projects overview)
- Project-specific dashboard
- Worker productivity dashboard
- Financial summary dashboard
- Time tracking summary reports
- Project profitability reports
- Custom report builder (admin only)
- Export reports (PDF, CSV, Excel)
- Scheduled report delivery via email

#### FR-006: Communication
- In-app messaging between team members
- Group chat per project
- Direct messages
- Message read receipts
- Push notifications for new messages
- File/photo sharing in messages
- Message search functionality

#### FR-007: Client Relationship Management (CRM)
- Client contact management
- Client project history
- Client notes and preferences
- Client portal access (view project status, invoices)
- In-app messaging with clients
- SMS integration for client communication (plugin)
- Email notifications to clients
- Client feedback collection

#### FR-008: Offline Functionality
- View project details offline
- Clock in/out offline (synced when online)
- Create/edit notes offline
- View dashboards with last synced data
- Queue actions for sync when back online
- Conflict resolution for offline changes
- Offline indicator in UI

#### FR-009: Notifications
- Push notifications for important events
- Email notifications (configurable)
- SMS notifications (optional, plugin)
- Notification preferences per user
- Notification history

#### FR-010: Plugin System
- Load and initialize plugins at runtime
- Plugin API for extending functionality
- Plugin marketplace (future)
- Plugin configuration interface
- Plugin dependency management
- Safe plugin sandboxing

### 3.2 Non-Functional Requirements

#### NFR-001: Performance
- Initial page load < 3 seconds on 4G
- Subsequent page loads < 1 second (PWA cache)
- API response time < 500ms (95th percentile)
- Support 100 concurrent users per instance
- Database queries optimized (< 100ms for common queries)

#### NFR-002: Scalability
- Horizontal scaling capability
- Database sharding support for growth
- CDN for static assets
- Efficient data pagination
- Background job processing for heavy tasks

#### NFR-003: Reliability
- 99.5% uptime SLA
- Automated backups (daily full, hourly incremental)
- Point-in-time recovery capability
- Graceful degradation when services unavailable
- Error logging and monitoring
- Automated health checks

#### NFR-004: Security
- HTTPS/TLS 1.3 only
- Data encryption at rest (AES-256)
- Encrypted backups
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting on API endpoints
- Security headers (CSP, HSTS, etc.)
- Regular security audits
- Compliance with OSHA record-keeping (time tracking)
- GDPR compliance for data handling

#### NFR-005: Usability
- Intuitive navigation requiring minimal training
- Maximum 3 clicks to any feature
- Large touch targets (minimum 44x44px)
- Clear error messages in user's language
- Consistent UI patterns throughout
- Accessibility compliance (WCAG 2.1 AA)
- Mobile-first responsive design

#### NFR-006: Maintainability
- Comprehensive code documentation
- API documentation (OpenAPI/Swagger)
- Modular architecture
- Automated testing (unit, integration, e2e)
- CI/CD pipeline
- Code quality standards and linting
- Version control with git

---

## 4. Technical Architecture

### 4.1 Architecture Overview
**Pattern:** Three-tier architecture with plugin support
- **Presentation Layer:** React-based PWA
- **Application Layer:** RESTful API (Node.js/Express or similar)
- **Data Layer:** PostgreSQL database with Redis caching

### 4.2 Technology Stack

#### 4.2.1 Frontend
- **Framework:** React 18+
- **State Management:** Redux Toolkit or Zustand
- **Routing:** React Router 6+
- **UI Components:** Material-UI (MUI) or Chakra UI (professional, clean aesthetic)
- **Forms:** React Hook Form with Yup validation
- **PWA:** Workbox for service worker management
- **Maps/Geolocation:** Mapbox GL JS or Google Maps API
- **Offline Storage:** IndexedDB via Dexie.js
- **Build Tool:** Vite or Create React App
- **Testing:** Jest + React Testing Library, Playwright for E2E

#### 4.2.2 Backend
- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js or NestJS (for better structure)
- **Language:** TypeScript
- **Authentication:** Passport.js with JWT
- **Validation:** Joi or class-validator
- **ORM:** Prisma or TypeORM
- **Background Jobs:** Bull (Redis-based queue)
- **File Upload:** Multer with S3/MinIO storage
- **Email:** SendGrid or AWS SES
- **SMS:** Twilio (for plugin)
- **Testing:** Jest + Supertest

#### 4.2.3 Database & Caching
- **Primary Database:** PostgreSQL 15+
- **Caching:** Redis 7+
- **File Storage:** AWS S3 / MinIO / Local filesystem (configurable)
- **Search:** PostgreSQL full-text search (upgrade to Elasticsearch if needed)

#### 4.2.4 Infrastructure
- **Hosting:** AWS / Google Cloud / DigitalOcean
- **Container:** Docker
- **Orchestration:** Docker Compose (small scale) or Kubernetes (scale)
- **Reverse Proxy:** Nginx
- **SSL:** Let's Encrypt
- **Monitoring:** Prometheus + Grafana, or Datadog
- **Logging:** Winston + ELK Stack or CloudWatch
- **CI/CD:** GitHub Actions, GitLab CI, or Jenkins

### 4.3 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Browser    │  │    Mobile    │  │   Tablet     │     │
│  │     PWA      │  │     PWA      │  │     PWA      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │ HTTPS/WSS
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      CDN / Load Balancer                    │
└─────────────────────────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │              API Gateway / Nginx                   │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   Core API  │ │ Plugin API   │ │  WebSocket   │        │
│  │   Server    │ │   Server     │ │   Server     │        │
│  └─────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────────────────────────────────────┐          │
│  │         Background Job Processor              │          │
│  │    (Email, SMS, Reports, Sync, Cleanup)      │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
          │                  │                  │
          ↓                  ↓                  ↓
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │     Redis    │  │   S3/MinIO   │     │
│  │   Database   │  │     Cache    │  │  File Store  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────────┐
│                   External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Email     │  │  SMS (Twilio)│  │  Maps API    │     │
│  │   Provider   │  │   (Plugin)   │  │  (Mapbox)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │     LLM      │  │   Payment    │                        │
│  │  Translation │  │   Gateway    │                        │
│  │   (Plugin)   │  │   (Future)   │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### 4.4 Data Flow

#### 4.4.1 User Authentication Flow
```
User → Login Form → API /auth/login → Validate Credentials → 
Generate JWT → Return Token + User Data → Store in localStorage → 
Set Authorization Header → Redirect to Dashboard
```

#### 4.4.2 Clock In/Out Flow
```
User → Click Clock In → Check Geofence → Capture GPS → 
API POST /time-entries → Validate Location → Create DB Record → 
Push Notification to Manager → Update UI
```

#### 4.4.3 Offline Sync Flow
```
User Offline → Action Queued in IndexedDB → 
User Back Online → Service Worker Detects → 
Batch Sync Queued Actions → API POST /sync → 
Resolve Conflicts → Update Local DB → Update UI
```

### 4.5 Database Schema Overview

**Core Tables:**
- users
- roles
- permissions
- companies
- projects
- time_entries
- expenses
- payments
- clients
- messages
- notifications
- files
- reports
- plugins
- settings
- audit_logs

**Internationalization Tables:**
- translations
- languages

**Plugin Tables:**
- plugin_data (JSON storage for plugin-specific data)
- plugin_settings

---

## 5. Feature Specifications

### 5.1 Time Tracking Module

#### 5.1.1 Clock In/Out

**User Story:**
As a field worker, I want to clock in when I arrive at a job site so that my hours are accurately tracked.

**Acceptance Criteria:**
- User can clock in with a single button tap
- GPS location is automatically captured and stored
- If geofencing is enabled for the project, clock in is only allowed within the specified radius
- If user is outside geofence, show clear error message with distance to site
- Clock in time is displayed prominently after successful clock in
- If offline, clock in is queued and synced when back online
- User receives confirmation notification of successful clock in
- Manager receives notification when worker clocks in

**Technical Requirements:**
- Use Geolocation API for position
- Calculate distance using Haversine formula
- Store coordinates with timestamp
- Background location tracking NOT required (privacy)
- Request location permission on first clock in attempt

**API Endpoint:**
```
POST /api/v1/time-entries
{
  "project_id": "uuid",
  "type": "clock_in",
  "location": {
    "latitude": 34.0522,
    "longitude": -118.2437,
    "accuracy": 10
  },
  "timestamp": "2026-02-14T08:00:00Z"
}
```

**Database Fields:**
```sql
time_entries:
  id (uuid, PK)
  user_id (uuid, FK)
  project_id (uuid, FK)
  type (enum: clock_in, clock_out, break_start, break_end)
  timestamp (timestamptz)
  location_lat (decimal)
  location_lng (decimal)
  location_accuracy (decimal)
  is_within_geofence (boolean)
  distance_from_site (decimal, meters)
  synced_at (timestamptz, null if not offline entry)
  created_at (timestamptz)
  updated_at (timestamptz)
```

**UI Mockup:**
```
┌─────────────────────────────────┐
│  Clock In                    ☰  │
├─────────────────────────────────┤
│                                 │
│   Current Project:              │
│   █ Smith Residence Rewiring    │
│                                 │
│   Current Time:                 │
│   █ 8:00 AM                     │
│                                 │
│   ┌───────────────────────────┐ │
│   │                           │ │
│   │    [CLOCK IN BUTTON]      │ │
│   │         Large             │ │
│   │      Green Button         │ │
│   │                           │ │
│   └───────────────────────────┘ │
│                                 │
│   Last Clock In:                │
│   Yesterday at 7:45 AM          │
│   Johnson Commercial            │
│                                 │
└─────────────────────────────────┘
```

#### 5.1.2 Geofencing Configuration

**User Story:**
As a project manager, I want to set a geofence around a job site so that workers can only clock in when they're actually on site.

**Acceptance Criteria:**
- Manager can set geofence center by entering address or dropping pin on map
- Manager can adjust geofence radius (default: 100m, range: 50m-500m)
- Geofence visualization on map
- Ability to enable/disable geofence per project
- Geofence settings saved with project

**API Endpoint:**
```
PATCH /api/v1/projects/:id/geofence
{
  "enabled": true,
  "latitude": 34.0522,
  "longitude": -118.2437,
  "radius_meters": 100,
  "address": "123 Main St, Los Angeles, CA"
}
```

#### 5.1.3 Time Entry Management

**User Story:**
As an administrator, I want to view and edit time entries so that I can correct mistakes or handle special circumstances.

**Acceptance Criteria:**
- View all time entries with filters (user, project, date range)
- Edit time entries with reason logging
- Delete time entries with reason logging (soft delete)
- Approve/reject manual time entries
- Export time entries to CSV/Excel
- Audit trail for all time entry changes

---

### 5.2 Project Management Module

#### 5.2.1 Project Creation

**User Story:**
As a project manager, I want to create a new project quickly so that I can start tracking work immediately.

**Acceptance Criteria:**
- Simple form with essential fields only
- Optional fields can be added later
- Project templates for common job types
- Ability to copy settings from previous project
- Assign team members during creation or later
- Set project location (for geofencing)
- Upload initial photos/documents

**Required Fields:**
- Project name
- Client (select from existing or create new)
- Project type (from customizable list)
- Start date
- Status (default: Lead)

**Optional Fields:**
- Description
- End date
- Budget
- Assigned workers
- Materials list
- Special instructions

**API Endpoint:**
```
POST /api/v1/projects
{
  "name": "Kitchen Renovation - Martinez",
  "client_id": "uuid",
  "project_type": "Residential Plumbing",
  "status": "lead",
  "start_date": "2026-02-20",
  "estimated_end_date": "2026-03-15",
  "budget": 5000.00,
  "location": {
    "address": "456 Oak Ave, Miami, FL",
    "latitude": 25.7617,
    "longitude": -80.1918
  },
  "assigned_users": ["uuid1", "uuid2"],
  "geofence": {
    "enabled": true,
    "radius_meters": 150
  }
}
```

**Database Schema:**
```sql
projects:
  id (uuid, PK)
  company_id (uuid, FK)
  client_id (uuid, FK)
  name (varchar)
  description (text)
  project_type (varchar)
  status (enum: lead, quoted, approved, in_progress, completed, invoiced, paid, cancelled)
  start_date (date)
  estimated_end_date (date)
  actual_end_date (date, nullable)
  budget (decimal)
  total_expenses (decimal, computed)
  total_payments (decimal, computed)
  location_address (text)
  location_lat (decimal)
  location_lng (decimal)
  geofence_enabled (boolean)
  geofence_radius_meters (integer)
  created_by (uuid, FK users)
  created_at (timestamptz)
  updated_at (timestamptz)
  deleted_at (timestamptz, nullable)
```

#### 5.2.2 Project Status Workflow

**Workflow States:**
1. **Lead** - Initial inquiry or opportunity
2. **Quoted** - Estimate provided to client
3. **Approved** - Client accepted quote
4. **In Progress** - Work has started
5. **Completed** - Work finished, pending payment
6. **Invoiced** - Invoice sent to client
7. **Paid** - Payment received
8. **Cancelled** - Project cancelled

**Transition Rules:**
- Only managers/admins can change project status
- Some transitions require confirmation (e.g., Completed → Invoiced checks for outstanding time/expenses)
- Status changes trigger notifications to relevant parties
- Audit log captures all status changes

**API Endpoint:**
```
PATCH /api/v1/projects/:id/status
{
  "status": "in_progress",
  "notes": "Client signed contract, work beginning Monday"
}
```

#### 5.2.3 Project Dashboard

**Widgets:**
1. Project header (name, client, status, dates)
2. Team members assigned
3. Hours logged (this week, total)
4. Financial summary (budget, expenses, payments, profit)
5. Upcoming milestones
6. Recent activity feed
7. Quick actions (clock in, add expense, message team)
8. Photos gallery
9. Files list

**Performance Requirements:**
- Dashboard loads in < 1 second
- Real-time updates for clock in/out events
- Cached data for offline viewing

---

### 5.3 Financial Tracking Module

#### 5.3.1 Expense Management

**User Story:**
As a worker, I want to quickly log expenses while on the job so that I don't forget and lose reimbursement.

**Acceptance Criteria:**
- Quick expense entry form
- Take photo of receipt
- Auto-categorize common expenses
- Associate with project
- Submit for approval
- Track reimbursement status

**Expense Categories:**
- Materials
- Tools/Equipment
- Fuel/Mileage
- Permits/Fees
- Meals (if applicable)
- Other

**API Endpoint:**
```
POST /api/v1/expenses
{
  "project_id": "uuid",
  "category": "materials",
  "amount": 125.50,
  "description": "PVC pipes and fittings",
  "vendor": "Home Depot",
  "date": "2026-02-14",
  "receipt_photo_id": "uuid",
  "requires_reimbursement": true
}
```

**Database Schema:**
```sql
expenses:
  id (uuid, PK)
  project_id (uuid, FK)
  user_id (uuid, FK) -- who logged it
  category (varchar)
  amount (decimal)
  description (text)
  vendor (varchar)
  expense_date (date)
  receipt_file_id (uuid, FK files, nullable)
  requires_reimbursement (boolean)
  reimbursed (boolean)
  reimbursed_date (date, nullable)
  approved_by (uuid, FK users, nullable)
  approved_at (timestamptz, nullable)
  created_at (timestamptz)
  updated_at (timestamptz)
```

#### 5.3.2 Payment Tracking

**Payment Types:**
- Deposit
- Progress Payment
- Final Payment
- Warranty Holdback

**User Story:**
As a project manager, I want to track payments received so that I know the financial status of each project.

**API Endpoint:**
```
POST /api/v1/projects/:id/payments
{
  "amount": 1500.00,
  "payment_type": "deposit",
  "payment_method": "check",
  "payment_date": "2026-02-14",
  "reference_number": "CHK-12345",
  "notes": "50% deposit per contract"
}
```

#### 5.3.3 Invoice Generation

**User Story:**
As an administrator, I want to generate a professional invoice for a completed project.

**Invoice Components:**
- Company logo and information
- Client information
- Project details
- Line items (labor hours, materials, other charges)
- Subtotal, tax, total
- Payment terms
- Payment history
- Amount due

**API Endpoint:**
```
POST /api/v1/invoices
{
  "project_id": "uuid",
  "invoice_number": "INV-2026-001",
  "invoice_date": "2026-02-14",
  "due_date": "2026-03-14",
  "line_items": [
    {
      "description": "Labor - 40 hours @ $85/hr",
      "quantity": 40,
      "unit_price": 85.00,
      "total": 3400.00
    },
    {
      "description": "Materials",
      "quantity": 1,
      "unit_price": 850.00,
      "total": 850.00
    }
  ],
  "tax_rate": 0.0725,
  "notes": "Payment due within 30 days"
}
```

**Output:**
- PDF generated and stored
- Email to client with PDF attachment
- Update project status to "Invoiced"

---

### 5.4 Dashboard & Reporting Module

#### 5.4.1 Executive Dashboard

**Key Metrics:**
- Active projects count
- Total revenue (this month, YTD)
- Outstanding invoices
- Team utilization rate
- Profit margin by project
- Upcoming deadlines
- Recent activity

**Charts/Visualizations:**
- Revenue trend (last 12 months)
- Projects by status (pie chart)
- Top clients by revenue
- Worker productivity comparison
- Cash flow projection

**Filters:**
- Date range
- Project status
- Worker
- Client

#### 5.4.2 Modular Reporting System

**Report Definition Structure:**
```typescript
interface ReportDefinition {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'time' | 'project' | 'worker' | 'custom';
  parameters: ReportParameter[];
  dataSource: {
    type: 'sql' | 'api' | 'computed';
    query?: string;
    endpoint?: string;
    computeFunction?: string;
  };
  columns: ReportColumn[];
  formatters?: ReportFormatter[];
  sorting: {
    column: string;
    direction: 'asc' | 'desc';
  };
  grouping?: {
    column: string;
    aggregations?: Aggregation[];
  };
  exportFormats: ('pdf' | 'csv' | 'excel' | 'json')[];
  schedule?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
  };
}

interface ReportParameter {
  name: string;
  label: string;
  type: 'date' | 'dateRange' | 'select' | 'multiSelect' | 'text' | 'number';
  required: boolean;
  defaultValue?: any;
  options?: { label: string; value: any }[];
}

interface ReportColumn {
  field: string;
  header: string;
  type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'boolean';
  width?: number;
  align?: 'left' | 'center' | 'right';
  formatter?: string; // reference to formatter function
}
```

**Example Report Definition (Time by Project):**
```json
{
  "id": "time-by-project",
  "name": "Time Tracking by Project",
  "description": "Shows hours logged per project with breakdown by worker",
  "category": "time",
  "parameters": [
    {
      "name": "dateRange",
      "label": "Date Range",
      "type": "dateRange",
      "required": true,
      "defaultValue": "currentMonth"
    },
    {
      "name": "projectId",
      "label": "Project",
      "type": "select",
      "required": false,
      "options": "projects.active"
    }
  ],
  "dataSource": {
    "type": "sql",
    "query": "SELECT p.name as project_name, u.name as worker_name, SUM(EXTRACT(EPOCH FROM (te.clock_out - te.clock_in))/3600) as hours FROM time_entries te JOIN projects p ON te.project_id = p.id JOIN users u ON te.user_id = u.id WHERE te.timestamp >= :startDate AND te.timestamp <= :endDate AND (:projectId IS NULL OR te.project_id = :projectId) GROUP BY p.name, u.name ORDER BY p.name, hours DESC"
  },
  "columns": [
    {
      "field": "project_name",
      "header": "Project",
      "type": "string"
    },
    {
      "field": "worker_name",
      "header": "Worker",
      "type": "string"
    },
    {
      "field": "hours",
      "header": "Hours",
      "type": "number",
      "formatter": "decimal2"
    }
  ],
  "grouping": {
    "column": "project_name",
    "aggregations": [
      {
        "column": "hours",
        "function": "sum",
        "label": "Total Hours"
      }
    ]
  },
  "exportFormats": ["pdf", "csv", "excel"]
}
```

**Report Engine Architecture:**
```typescript
class ReportEngine {
  async executeReport(definitionId: string, parameters: Record<string, any>): Promise<ReportResult> {
    const definition = await this.loadDefinition(definitionId);
    this.validateParameters(definition.parameters, parameters);
    
    const data = await this.fetchData(definition.dataSource, parameters);
    const formatted = this.applyFormatters(data, definition.columns, definition.formatters);
    const grouped = definition.grouping 
      ? this.applyGrouping(formatted, definition.grouping)
      : formatted;
    
    return {
      definition,
      data: grouped,
      metadata: {
        generatedAt: new Date(),
        rowCount: data.length,
        parameters
      }
    };
  }
  
  async exportReport(result: ReportResult, format: ExportFormat): Promise<Buffer> {
    const exporter = this.getExporter(format);
    return await exporter.export(result);
  }
}
```

**Adding New Reports:**
1. Create JSON definition file in `/config/reports/`
2. Place in appropriate category folder
3. Report automatically available in UI
4. No code changes required for standard SQL reports
5. For computed reports, implement computation function and reference in definition

#### 5.4.3 Standard Reports Included

1. **Time Tracking Summary** - Hours by worker, project, date range
2. **Project Profitability** - Revenue vs. expenses by project
3. **Worker Productivity** - Hours logged, projects completed
4. **Expense Report** - All expenses by category, project, date
5. **Payment History** - All payments received with aging
6. **Outstanding Invoices** - Unpaid invoices with days overdue
7. **Project Status Overview** - All projects with current status
8. **Client Activity** - Client engagement and project history
9. **Budget vs. Actual** - Planned vs. actual costs per project
10. **Mileage Report** - Travel distances and reimbursement

---

### 5.5 Communication Module

#### 5.5.1 In-App Messaging

**Message Types:**
- Direct message (1-on-1)
- Group chat (project team)
- Company-wide announcements

**Features:**
- Real-time delivery (WebSocket)
- Message history
- Read receipts
- Typing indicators
- File/photo attachments
- Emoji reactions
- Message search
- Push notifications

**API Endpoints:**
```
POST /api/v1/messages
{
  "conversation_id": "uuid",
  "content": "The materials arrived, starting installation",
  "attachments": ["file_uuid1", "file_uuid2"]
}

GET /api/v1/conversations/:id/messages?before=timestamp&limit=50

POST /api/v1/conversations
{
  "type": "direct" | "group" | "project",
  "participants": ["user_uuid1", "user_uuid2"],
  "project_id": "uuid", // for project conversations
  "name": "Smith Residence Team" // for group chats
}
```

**WebSocket Events:**
```
// Client → Server
{
  "type": "message.send",
  "data": { ... }
}

{
  "type": "message.read",
  "message_id": "uuid"
}

{
  "type": "typing.start",
  "conversation_id": "uuid"
}

// Server → Client
{
  "type": "message.new",
  "data": { ... }
}

{
  "type": "message.read",
  "message_id": "uuid",
  "read_by": "user_uuid"
}

{
  "type": "user.typing",
  "conversation_id": "uuid",
  "user_id": "uuid"
}
```

**Database Schema:**
```sql
conversations:
  id (uuid, PK)
  type (enum: direct, group, project)
  name (varchar, nullable)
  project_id (uuid, FK, nullable)
  created_at (timestamptz)
  updated_at (timestamptz)

conversation_participants:
  conversation_id (uuid, FK)
  user_id (uuid, FK)
  joined_at (timestamptz)
  last_read_at (timestamptz)
  PRIMARY KEY (conversation_id, user_id)

messages:
  id (uuid, PK)
  conversation_id (uuid, FK)
  sender_id (uuid, FK users)
  content (text)
  created_at (timestamptz)
  updated_at (timestamptz)
  deleted_at (timestamptz, nullable)

message_attachments:
  message_id (uuid, FK)
  file_id (uuid, FK files)
  PRIMARY KEY (message_id, file_id)

message_reads:
  message_id (uuid, FK)
  user_id (uuid, FK)
  read_at (timestamptz)
  PRIMARY KEY (message_id, user_id)
```

#### 5.5.2 Client Communication (CRM Integration)

**Core Feature:**
- In-app messaging with clients
- Client can access via web portal (no app install required)
- Associated with specific project
- Notifications to client via email

**SMS Plugin (Add-on):**
- Send/receive SMS to clients
- SMS bridges to in-app conversation
- Two-way sync
- Track SMS costs per project
- Client replies via SMS appear in app

**API Endpoint:**
```
POST /api/v1/clients/:id/messages
{
  "project_id": "uuid",
  "content": "Your project is scheduled to start Monday at 8am",
  "channel": "in_app" | "sms",
  "sms_number": "+1234567890" // if SMS
}
```

---

### 5.6 Client Relationship Management (CRM)

#### 5.6.1 Client Management

**Client Profile:**
- Contact information (name, phone, email, address)
- Company name (for commercial clients)
- Client type (Residential / Commercial)
- Preferred contact method
- Notes
- Tags (VIP, Recurring, etc.)
- Custom fields (plugin extensible)

**API Endpoint:**
```
POST /api/v1/clients
{
  "name": "John Martinez",
  "email": "john@email.com",
  "phone": "+1-305-555-0123",
  "address": {
    "street": "456 Oak Ave",
    "city": "Miami",
    "state": "FL",
    "zip": "33101"
  },
  "client_type": "residential",
  "preferred_contact": "phone",
  "notes": "Prefers morning appointments",
  "tags": ["recurring"]
}
```

**Database Schema:**
```sql
clients:
  id (uuid, PK)
  company_id (uuid, FK)
  name (varchar)
  email (varchar)
  phone (varchar)
  company_name (varchar, nullable)
  client_type (enum: residential, commercial)
  preferred_contact (enum: phone, email, sms)
  address_street (varchar)
  address_city (varchar)
  address_state (varchar)
  address_zip (varchar)
  notes (text)
  tags (text[], array)
  custom_fields (jsonb)
  created_at (timestamptz)
  updated_at (timestamptz)
  deleted_at (timestamptz, nullable)
```

#### 5.6.2 Client Portal

**Features:**
- View project status
- View invoices and payment history
- Make payments (future integration)
- Upload documents/photos
- Message project team
- View project timeline
- Approve change orders

**Access:**
- Unique link sent via email
- Magic link authentication (no password)
- Limited access (only their projects)
- Mobile-responsive

**API Endpoints:**
```
GET /api/v1/portal/projects
// Returns projects for authenticated client

GET /api/v1/portal/projects/:id
// Returns detailed project info

GET /api/v1/portal/invoices/:id
// Returns invoice with payment link
```

#### 5.6.3 Client History

**Tracked Information:**
- All projects with this client
- Total revenue from client
- Average project value
- Payment history and patterns
- Communication history
- Service requests
- Referrals made

---

### 5.7 Internationalization (i18n)

#### 5.7.1 Core Language Support

**Supported Languages (Initial):**
- English (en-US)
- Spanish (es-ES, es-MX)

**Translation Architecture:**
```typescript
// Translation key structure
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  },
  "auth": {
    "login": "Log In",
    "logout": "Log Out",
    "forgotPassword": "Forgot Password?"
  },
  "projects": {
    "createProject": "Create Project",
    "projectName": "Project Name",
    "status": {
      "lead": "Lead",
      "inProgress": "In Progress",
      "completed": "Completed"
    }
  }
}
```

**Implementation:**
- Frontend: react-i18next
- Backend: i18next
- Translation files: JSON format
- Namespace-based organization
- Language detection from user preference or browser
- RTL support for future languages (Arabic, Hebrew)

**Database Translation Storage:**
```sql
translations:
  id (uuid, PK)
  language_code (varchar)
  namespace (varchar)
  key (varchar)
  value (text)
  created_at (timestamptz)
  updated_at (timestamptz)
  UNIQUE (language_code, namespace, key)

languages:
  code (varchar, PK) -- en-US, es-ES
  name (varchar) -- English, Español
  native_name (varchar) -- English, Español
  enabled (boolean)
  is_default (boolean)
  created_at (timestamptz)
```

#### 5.7.2 Dynamic Content Translation

**User-Generated Content:**
- Project names, descriptions
- Client notes
- Messages
- Reports

**Translation Service Plugin:**
- LLM-based translation (OpenAI, Claude, etc.)
- Translate on demand or automatically
- Translation memory for consistency
- Cost tracking per translation

**API Endpoint:**
```
POST /api/v1/translate
{
  "text": "The wiring installation is complete",
  "source_language": "en",
  "target_language": "es",
  "context": "project_note"
}

Response:
{
  "translated_text": "La instalación del cableado está completa",
  "source_language": "en",
  "target_language": "es",
  "confidence": 0.98
}
```

#### 5.7.3 Language Switching

**User Preferences:**
- Language preference saved to user profile
- Instant switching (no page reload)
- Persists across sessions
- Affects all UI text, emails, reports

**Implementation:**
```typescript
// Language context
const LanguageContext = React.createContext();

// Language switcher component
<LanguageSelect 
  currentLanguage={userLanguage}
  onChange={(lang) => changeLanguage(lang)}
  availableLanguages={['en-US', 'es-ES']}
/>

// Usage in components
const { t } = useTranslation('projects');
<Button>{t('createProject')}</Button>
```

#### 5.7.4 Date, Time, Number Formatting

**Locale-Aware Formatting:**
- Dates: MM/DD/YYYY (US) vs DD/MM/YYYY (others)
- Time: 12-hour vs 24-hour
- Numbers: 1,234.56 vs 1.234,56
- Currency: $1,234.56 vs 1.234,56 €

**Implementation:**
```typescript
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Date formatting
format(new Date(), 'PPP', { locale: userLocale });

// Currency formatting
new Intl.NumberFormat(userLocale, {
  style: 'currency',
  currency: userCurrency
}).format(1234.56);
```

#### 5.7.5 Adding New Languages

**Process:**
1. Add language to `languages` table
2. Create translation namespace files
3. Translate all keys (use base language as reference)
4. Test with native speaker
5. Enable language in settings
6. Deploy

**Translation Management:**
- Export/import translation files (CSV, Excel)
- Translation interface for non-developers
- Track translation completion percentage
- Highlight missing translations in dev mode

---

### 5.8 Plugin Architecture

#### 5.8.1 Plugin System Design

**Goals:**
- Extend functionality without modifying core
- Industry-specific features (electrical, plumbing, HVAC)
- Third-party integrations
- Easy installation and configuration
- Safe sandboxing

**Plugin Types:**
1. **Feature Plugins** - Add new pages/components
2. **Extension Plugins** - Extend existing features
3. **Integration Plugins** - Connect to external services
4. **Report Plugins** - Add custom reports
5. **Theme Plugins** - Customize appearance

**Plugin Manifest:**
```json
{
  "id": "electrical-permit-tracker",
  "name": "Electrical Permit Tracker",
  "version": "1.0.0",
  "description": "Track electrical permits and inspections",
  "author": "ContractorApp Team",
  "category": "industry_specific",
  "requires": {
    "core_version": ">=1.0.0",
    "plugins": []
  },
  "permissions": [
    "projects:read",
    "projects:write",
    "files:read",
    "files:write"
  ],
  "hooks": [
    {
      "name": "project.created",
      "handler": "onProjectCreated"
    },
    {
      "name": "project.page.tabs",
      "handler": "addPermitsTab"
    }
  ],
  "api_endpoints": [
    {
      "path": "/plugins/electrical-permits",
      "methods": ["GET", "POST", "PUT", "DELETE"]
    }
  ],
  "ui_components": [
    {
      "id": "permits-tab",
      "type": "project_tab",
      "label": "Permits",
      "icon": "permit-icon",
      "component": "PermitsTab"
    }
  ],
  "database_migrations": [
    "001_create_permits_table.sql",
    "002_add_inspection_fields.sql"
  ],
  "settings_schema": {
    "permit_authority_name": {
      "type": "string",
      "label": "Permit Authority Name",
      "required": true
    },
    "auto_request_inspection": {
      "type": "boolean",
      "label": "Auto-request inspection on completion",
      "default": false
    }
  }
}
```

**Plugin API Interface:**
```typescript
interface Plugin {
  id: string;
  manifest: PluginManifest;
  
  // Lifecycle hooks
  onInstall?(): Promise<void>;
  onUninstall?(): Promise<void>;
  onEnable?(): Promise<void>;
  onDisable?(): Promise<void>;
  onUpdate?(oldVersion: string, newVersion: string): Promise<void>;
  
  // Event handlers
  onEvent?(event: PluginEvent): Promise<void>;
  
  // API routes
  registerRoutes?(router: Router): void;
  
  // UI components
  registerComponents?(): PluginComponent[];
  
  // Database
  getMigrations?(): Migration[];
  
  // Settings
  getSettingsSchema?(): SettingsSchema;
  validateSettings?(settings: any): boolean;
}

interface PluginEvent {
  name: string;
  data: any;
  context: {
    userId: string;
    companyId: string;
    timestamp: Date;
  };
}
```

#### 5.8.2 Plugin Lifecycle

```
Installation Flow:
1. Upload plugin package (.zip) or install from marketplace
2. Validate manifest and dependencies
3. Check permissions
4. Run database migrations
5. Register API routes and UI components
6. Call onInstall() hook
7. Enable plugin
8. Refresh UI

Update Flow:
1. Upload new version
2. Validate compatibility
3. Run migration from old to new version
4. Call onUpdate() hook
5. Reload plugin

Uninstallation Flow:
1. Call onUninstall() hook
2. Disable plugin
3. Remove API routes and UI components
4. Optionally remove plugin data
5. Update plugin registry
```

#### 5.8.3 Core Plugin Hooks

**Project Hooks:**
- `project.created`
- `project.updated`
- `project.status_changed`
- `project.deleted`
- `project.page.tabs` - Add custom tabs to project page
- `project.page.widgets` - Add widgets to project dashboard

**Time Entry Hooks:**
- `time_entry.created`
- `time_entry.updated`
- `time_entry.clock_in`
- `time_entry.clock_out`

**UI Hooks:**
- `navigation.main_menu` - Add menu items
- `navigation.user_menu` - Add user menu items
- `dashboard.widgets` - Add dashboard widgets
- `settings.pages` - Add settings pages

**Data Hooks:**
- `report.definitions` - Register custom reports
- `export.formats` - Add export formats
- `import.formats` - Add import formats

**Example Plugin Implementation:**
```typescript
// electrical-permit-tracker.plugin.ts
class ElectricalPermitTrackerPlugin implements Plugin {
  id = 'electrical-permit-tracker';
  manifest = require('./manifest.json');
  
  async onInstall() {
    console.log('Installing Electrical Permit Tracker...');
    // Run setup tasks
  }
  
  async onEvent(event: PluginEvent) {
    if (event.name === 'project.created') {
      const project = event.data;
      // Create default permit tracking for new electrical projects
      if (project.project_type === 'Electrical') {
        await this.createPermitRecord(project.id);
      }
    }
  }
  
  registerRoutes(router: Router) {
    router.get('/plugins/electrical-permits/:projectId', this.getPermits);
    router.post('/plugins/electrical-permits', this.createPermit);
    router.put('/plugins/electrical-permits/:id', this.updatePermit);
  }
  
  registerComponents() {
    return [
      {
        id: 'permits-tab',
        type: 'project_tab',
        component: PermitsTab,
        label: 'Permits',
        icon: 'DocumentCheck'
      }
    ];
  }
  
  private async createPermitRecord(projectId: string) {
    // Implementation
  }
  
  private getPermits = async (req, res) => {
    // Implementation
  }
  
  private createPermit = async (req, res) => {
    // Implementation
  }
  
  private updatePermit = async (req, res) => {
    // Implementation
  }
}
```

#### 5.8.4 Plugin Database Schema

```sql
plugins:
  id (varchar, PK) -- from manifest
  name (varchar)
  version (varchar)
  enabled (boolean)
  installed_at (timestamptz)
  updated_at (timestamptz)
  settings (jsonb)

plugin_data:
  id (uuid, PK)
  plugin_id (varchar, FK plugins)
  entity_type (varchar) -- project, client, user, etc.
  entity_id (uuid)
  data (jsonb)
  created_at (timestamptz)
  updated_at (timestamptz)
  INDEX (plugin_id, entity_type, entity_id)
```

#### 5.8.5 Example Plugins

**1. SMS Communication Plugin**
- Twilio integration
- Send/receive SMS
- Associate SMS with projects and clients
- SMS cost tracking
- Auto-responses

**2. LLM Translation Plugin**
- OpenAI/Claude API integration
- Translate messages, notes, documents
- Translation memory
- Cost tracking

**3. Electrical Code Compliance Plugin**
- Code reference database
- Inspection checklists
- Permit tracking
- Violation logging
- Photo documentation requirements

**4. Plumbing Materials Calculator Plugin**
- Material quantity calculator
- Price list integration
- Supplier comparison
- Automatic PO generation

**5. HVAC Load Calculation Plugin**
- Load calculation forms
- Equipment sizing recommendations
- Energy efficiency reports

**6. Payment Gateway Plugin**
- Stripe/Square integration
- Accept credit cards
- Payment links in invoices
- Automatic payment recording

**7. QuickBooks Integration Plugin**
- Sync invoices
- Sync expenses
- Sync clients
- Sync payments

---

## 6. Data Models

### 6.1 Core Entity Relationship Diagram

```
┌─────────────┐
│  companies  │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────┐       ┌──────────┐
│    users    │───────│   roles  │
└──────┬──────┘  N:M  └──────────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│    projects     │
└──────┬──────────┘
       │
       ├───1:N───┐time_entries│
       ├───1:N───│expenses    │
       ├───1:N───│payments    │
       ├───1:N───│milestones  │
       ├───1:N───│files       │
       └───1:N───│messages    │

┌──────────────┐
│   clients    │
└──────┬───────┘
       │
       │ 1:N
       │
       └────────→ projects
```

### 6.2 Detailed Database Schema

```sql
-- Core entities
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(50),
  address_zip VARCHAR(20),
  logo_file_id UUID REFERENCES files(id),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  role_id UUID NOT NULL REFERENCES roles(id),
  language_preference VARCHAR(10) DEFAULT 'en-US',
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  avatar_file_id UUID REFERENCES files(id),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  is_system_role BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company_name VARCHAR(255),
  client_type VARCHAR(50) DEFAULT 'residential', -- residential, commercial
  preferred_contact VARCHAR(50) DEFAULT 'email', -- phone, email, sms
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(50),
  address_zip VARCHAR(20),
  notes TEXT,
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  project_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'lead',
  start_date DATE,
  estimated_end_date DATE,
  actual_end_date DATE,
  budget DECIMAL(12,2),
  location_address TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  geofence_enabled BOOLEAN DEFAULT false,
  geofence_radius_meters INTEGER DEFAULT 100,
  created_by UUID NOT NULL REFERENCES users(id),
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE project_assignments (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50), -- lead, worker
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  clock_in TIMESTAMPTZ NOT NULL,
  clock_out TIMESTAMPTZ,
  break_duration_minutes INTEGER DEFAULT 0,
  clock_in_lat DECIMAL(10,8),
  clock_in_lng DECIMAL(11,8),
  clock_in_accuracy DECIMAL(8,2),
  clock_out_lat DECIMAL(10,8),
  clock_out_lng DECIMAL(11,8),
  clock_out_accuracy DECIMAL(8,2),
  is_within_geofence BOOLEAN,
  distance_from_site_meters DECIMAL(10,2),
  notes TEXT,
  is_manual BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ, -- null if not an offline entry
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  vendor VARCHAR(255),
  expense_date DATE NOT NULL,
  receipt_file_id UUID REFERENCES files(id),
  requires_reimbursement BOOLEAN DEFAULT false,
  reimbursed BOOLEAN DEFAULT false,
  reimbursed_date DATE,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_type VARCHAR(50) NOT NULL, -- deposit, progress, final, warranty_holdback
  payment_method VARCHAR(50), -- cash, check, credit_card, bank_transfer
  payment_date DATE NOT NULL,
  reference_number VARCHAR(100),
  notes TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,4),
  tax_amount DECIMAL(10,2),
  total DECIMAL(10,2) NOT NULL,
  notes TEXT,
  pdf_file_id UUID REFERENCES files(id),
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoice_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  sort_order INTEGER
);

CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES users(id),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  storage_path TEXT NOT NULL,
  entity_type VARCHAR(50), -- project, expense, invoice, message, etc.
  entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- direct, group, project
  name VARCHAR(255),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversation_participants (
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE message_attachments (
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  file_id UUID NOT NULL REFERENCES files(id),
  PRIMARY KEY (message_id, file_id)
);

CREATE TABLE message_reads (
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (message_id, user_id)
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_code VARCHAR(10) NOT NULL,
  namespace VARCHAR(100) NOT NULL,
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (language_code, namespace, key)
);

CREATE TABLE plugins (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  version VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT false,
  settings JSONB DEFAULT '{}',
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plugin_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugin_id VARCHAR(255) NOT NULL REFERENCES plugins(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_plugin_data_lookup ON plugin_data(plugin_id, entity_type, entity_id);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_company ON projects(company_id);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_time_entries_user ON time_entries(user_id);
CREATE INDEX idx_time_entries_project ON time_entries(project_id);
CREATE INDEX idx_time_entries_date ON time_entries(clock_in);
CREATE INDEX idx_expenses_project ON expenses(project_id);
CREATE INDEX idx_payments_project ON payments(project_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_files_entity ON files(entity_type, entity_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, read);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
```

---

## 7. API Specifications

### 7.1 API Design Principles

- RESTful architecture
- JSON request/response bodies
- JWT-based authentication
- Consistent error handling
- API versioning (/api/v1/)
- Rate limiting
- Comprehensive documentation (OpenAPI/Swagger)
- Pagination for list endpoints
- Filtering and sorting support
- Idempotency for write operations

### 7.2 Authentication

**Endpoint:** `POST /api/v1/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4=",
    "expires_in": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "worker",
      "company_id": "uuid"
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

### 7.3 Standard Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-02-14T12:00:00Z",
    "request_id": "uuid"
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  },
  "meta": {
    "timestamp": "2026-02-14T12:00:00Z",
    "request_id": "uuid"
  }
}
```

### 7.4 Pagination

**Request:**
```
GET /api/v1/projects?page=1&limit=20&sort=-created_at
```

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_pages": 5,
      "total_records": 98
    }
  }
}
```

### 7.5 Key API Endpoints

#### Projects
```
GET    /api/v1/projects              - List all projects
POST   /api/v1/projects              - Create project
GET    /api/v1/projects/:id          - Get project details
PATCH  /api/v1/projects/:id          - Update project
DELETE /api/v1/projects/:id          - Delete project (soft)
PATCH  /api/v1/projects/:id/status   - Update project status
GET    /api/v1/projects/:id/dashboard - Get project dashboard data
POST   /api/v1/projects/:id/assign   - Assign users to project
```

#### Time Entries
```
GET    /api/v1/time-entries          - List time entries
POST   /api/v1/time-entries          - Clock in/out
GET    /api/v1/time-entries/:id      - Get time entry
PATCH  /api/v1/time-entries/:id      - Update time entry
DELETE /api/v1/time-entries/:id      - Delete time entry
GET    /api/v1/time-entries/current  - Get current active time entry
POST   /api/v1/time-entries/sync     - Sync offline time entries
```

#### Expenses
```
GET    /api/v1/expenses              - List expenses
POST   /api/v1/expenses              - Create expense
GET    /api/v1/expenses/:id          - Get expense
PATCH  /api/v1/expenses/:id          - Update expense
DELETE /api/v1/expenses/:id          - Delete expense
POST   /api/v1/expenses/:id/approve  - Approve expense
```

#### Clients
```
GET    /api/v1/clients               - List clients
POST   /api/v1/clients               - Create client
GET    /api/v1/clients/:id           - Get client
PATCH  /api/v1/clients/:id           - Update client
DELETE /api/v1/clients/:id           - Delete client
GET    /api/v1/clients/:id/projects  - Get client's projects
GET    /api/v1/clients/:id/history   - Get client history
```

#### Messages
```
GET    /api/v1/conversations         - List conversations
POST   /api/v1/conversations         - Create conversation
GET    /api/v1/conversations/:id/messages - Get messages
POST   /api/v1/messages              - Send message
PATCH  /api/v1/messages/:id/read     - Mark message as read
DELETE /api/v1/messages/:id          - Delete message
```

#### Reports
```
GET    /api/v1/reports               - List available reports
POST   /api/v1/reports/generate      - Generate report
GET    /api/v1/reports/:id           - Get report result
GET    /api/v1/reports/:id/export    - Export report (PDF/CSV/Excel)
POST   /api/v1/reports/schedule      - Schedule recurring report
```

#### Dashboard
```
GET    /api/v1/dashboard/executive   - Executive dashboard data
GET    /api/v1/dashboard/worker      - Worker dashboard data
```

### 7.6 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_CREDENTIALS | 401 | Invalid login credentials |
| UNAUTHORIZED | 401 | Missing or invalid auth token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 422 | Request validation failed |
| DUPLICATE_ENTRY | 409 | Resource already exists |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Internal server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |

### 7.7 Rate Limiting

- **Per User:** 1000 requests per hour
- **Per IP:** 5000 requests per hour
- **Authentication Endpoints:** 10 requests per minute
- **File Upload:** 100 requests per hour

Response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1644854400
```

---

## 8. Security & Compliance

### 8.1 Authentication & Authorization

#### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Cannot be a common password
- Cannot contain user's name or email

#### Session Management
- JWT tokens with 1-hour expiration
- Refresh tokens with 30-day expiration
- Automatic logout after 24 hours of inactivity
- Concurrent session limit: 3 devices

#### Multi-Factor Authentication (Optional)
- TOTP-based (Google Authenticator, Authy)
- SMS-based (via Twilio plugin)
- Email-based backup codes

### 8.2 Data Protection

#### Encryption
- **In Transit:** TLS 1.3
- **At Rest:** AES-256 encryption for sensitive data
- **Database:** Encrypted columns for PII
- **Backups:** Encrypted with separate keys

#### Data Retention
- Active data: Indefinite
- Deleted data: Soft delete with 30-day recovery
- Audit logs: 7 years
- Backups: 90 days

#### Privacy
- GDPR compliance for EU users
- Right to access (data export)
- Right to deletion (account deletion)
- Right to rectification (profile updates)
- Data portability (export to JSON/CSV)

### 8.3 Security Measures

#### Application Security
- SQL injection prevention (parameterized queries)
- XSS protection (input sanitization, CSP headers)
- CSRF protection (tokens)
- Secure headers (HSTS, X-Frame-Options, etc.)
- Input validation on all endpoints
- Output encoding
- File upload restrictions (type, size)
- Malware scanning for uploads

#### Infrastructure Security
- Firewall rules (whitelist-based)
- DDoS protection
- Regular security patches
- Vulnerability scanning
- Penetration testing (annually)
- Security incident response plan

#### Logging & Monitoring
- All authentication attempts
- All authorization failures
- All data modifications (audit log)
- All system errors
- API usage patterns
- Security events (failed logins, etc.)
- Real-time alerting for suspicious activity

### 8.4 Compliance

#### Labor Law Compliance
- Accurate time tracking
- Meal break tracking
- Overtime calculation
- OSHA record-keeping

#### Financial Compliance
- Audit trail for all transactions
- Expense approval workflow
- Payment documentation
- Invoice numbering

#### Data Protection Compliance
- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- SOC 2 Type II (future)

---

## 9. UI/UX Guidelines

### 9.1 Design Principles

1. **Simplicity First** - Minimize cognitive load
2. **Mobile-First** - Design for small screens first
3. **Professional Aesthetic** - Avoid flashy, gimmicky design
4. **Consistency** - Reuse patterns and components
5. **Accessibility** - WCAG 2.1 AA compliance
6. **Performance** - Fast, responsive interactions

### 9.2 Visual Design

#### Color Palette
```
Primary: #2563EB (Blue - trustworthy, professional)
Secondary: #059669 (Green - success, positive actions)
Accent: #DC2626 (Red - warnings, important actions)
Neutral:
  - Gray 50: #F9FAFB (backgrounds)
  - Gray 200: #E5E7EB (borders)
  - Gray 700: #374151 (text)
  - Gray 900: #111827 (headers)
```

#### Typography
```
Font Family: Inter, system-ui, sans-serif
Headers: 600-700 weight
Body: 400 weight
Small text: 14px minimum
Line height: 1.5
```

#### Spacing
```
Base unit: 4px
Common spacing: 8px, 12px, 16px, 24px, 32px
Consistent padding/margin using base unit multiples
```

#### Components
- Large touch targets (minimum 44x44px)
- Clear button states (default, hover, active, disabled)
- Obvious form field focus indicators
- Descriptive error messages
- Loading indicators for async operations
- Success confirmations after actions

### 9.3 Layout

#### Navigation
```
Mobile:
- Bottom tab bar for main sections
- Hamburger menu for secondary items
- Floating action button for primary action

Desktop:
- Left sidebar for main navigation
- Top bar for user menu and notifications
- Breadcrumbs for deep navigation
```

#### Page Structure
```
┌─────────────────────────────────────┐
│  Header (title, actions)            │
├─────────────────────────────────────┤
│  Filters/Search (if applicable)     │
├─────────────────────────────────────┤
│                                     │
│  Main Content Area                  │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### 9.4 Key Screens

#### Dashboard
- Key metrics at top (cards)
- Quick actions
- Activity feed
- Charts/graphs for trends
- Project list with status

#### Project Detail
- Header with key info
- Tab navigation (Overview, Time, Expenses, Files, Team)
- Quick stats
- Recent activity
- Action buttons

#### Clock In/Out
- Large, centered clock in/out button
- Current time display
- Current project selection
- Location status indicator
- Recent clock ins

#### Forms
- Single column on mobile
- Logical field grouping
- Inline validation
- Clear error messages
- Save/Cancel always visible
- Auto-save (when appropriate)

### 9.5 Accessibility

- Keyboard navigation for all interactive elements
- Screen reader compatible
- Sufficient color contrast (4.5:1 minimum)
- Text resizing support
- Focus indicators
- Alternative text for images
- Semantic HTML
- ARIA labels where needed

### 9.6 Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

---

## 10. Deployment Strategy

### 10.1 Environment Setup

#### Environments
1. **Development** - Local developer machines
2. **Staging** - Pre-production testing
3. **Production** - Live application

#### Environment Variables
```
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
SENDGRID_API_KEY=...
MAPBOX_ACCESS_TOKEN=...
```

### 10.2 Infrastructure

#### Option 1: Simple Deployment (DigitalOcean)
```
1x App Platform Instance (Node.js)
1x Managed PostgreSQL Database
1x Managed Redis
1x Spaces (S3-compatible storage)
```

#### Option 2: AWS Deployment
```
EC2 instances behind Application Load Balancer
RDS PostgreSQL (Multi-AZ)
ElastiCache Redis
S3 for file storage
CloudFront for CDN
Route 53 for DNS
```

#### Option 3: Container Orchestration
```
Kubernetes cluster
PostgreSQL via managed service or StatefulSet
Redis via managed service or StatefulSet
S3/MinIO for storage
Ingress controller (Nginx)
```

### 10.3 CI/CD Pipeline

#### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: |
          # Deployment script

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # Deployment script
```

### 10.4 Database Migrations

```bash
# Create migration
npm run migration:create -- add_project_templates

# Run migrations
npm run migration:run

# Rollback migration
npm run migration:revert
```

### 10.5 Monitoring & Logging

#### Monitoring Tools
- **Application Monitoring:** Datadog / New Relic / Sentry
- **Infrastructure Monitoring:** Prometheus + Grafana
- **Uptime Monitoring:** UptimeRobot / Pingdom
- **Log Aggregation:** ELK Stack / CloudWatch

#### Key Metrics
- Request latency (p50, p95, p99)
- Error rate
- Throughput (requests/minute)
- Database query time
- Memory usage
- CPU usage
- Disk I/O
- Network I/O

#### Alerts
- Error rate > 5%
- Response time > 2s
- Database connection pool exhausted
- Disk usage > 80%
- Memory usage > 85%
- SSL certificate expiring soon

### 10.6 Backup & Recovery

#### Automated Backups
- Database: Daily full backup, hourly incremental
- File storage: Daily snapshot
- Retention: 30 days
- Offsite backup to different region

#### Disaster Recovery
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour
- Documented recovery procedures
- Quarterly disaster recovery drills

---

## 11. Testing Requirements

### 11.1 Testing Strategy

#### Test Pyramid
```
      /\
     /E2E\      10% - End-to-End Tests
    /______\
   /        \
  /Integration\ 30% - Integration Tests
 /____________\
/              \
/   Unit Tests  \ 60% - Unit Tests
/________________\
```

### 11.2 Unit Tests

**Coverage Target:** 80% minimum

**Tools:** Jest, React Testing Library

**What to Test:**
- Business logic functions
- React components
- API route handlers
- Database queries
- Utility functions
- Validation schemas

**Example:**
```typescript
describe('Time Entry Service', () => {
  describe('clockIn', () => {
    it('should create time entry with valid location', async () => {
      const result = await timeEntryService.clockIn({
        userId: 'user-123',
        projectId: 'project-456',
        location: { lat: 34.0522, lng: -118.2437, accuracy: 10 }
      });
      
      expect(result).toHaveProperty('id');
      expect(result.isWithinGeofence).toBe(true);
    });
    
    it('should reject clock in outside geofence', async () => {
      await expect(
        timeEntryService.clockIn({
          userId: 'user-123',
          projectId: 'project-456',
          location: { lat: 40.7128, lng: -74.0060, accuracy: 10 }
        })
      ).rejects.toThrow('Location is outside geofence');
    });
  });
});
```

### 11.3 Integration Tests

**Tools:** Jest + Supertest

**What to Test:**
- API endpoints
- Database operations
- External service integrations
- Authentication flows
- File uploads

**Example:**
```typescript
describe('Projects API', () => {
  let authToken: string;
  
  beforeAll(async () => {
    // Login and get token
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    authToken = response.body.data.token;
  });
  
  describe('POST /api/v1/projects', () => {
    it('should create a new project', async () => {
      const response = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Project',
          clientId: 'client-123',
          projectType: 'Electrical'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
    });
  });
});
```

### 11.4 End-to-End Tests

**Tools:** Playwright / Cypress

**What to Test:**
- Critical user journeys
- Cross-browser compatibility
- Mobile responsiveness
- Offline functionality
- Plugin loading

**Example Scenarios:**
1. Complete time tracking flow
2. Create project and assign team
3. Submit and approve expense
4. Generate and send invoice
5. Send message to team
6. Switch language

**Example:**
```typescript
test('Clock in flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'worker@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  // Navigate to clock in
  await page.click('[data-testid="clock-in-tab"]');
  
  // Select project
  await page.selectOption('[name="project"]', 'project-123');
  
  // Mock geolocation
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: 34.0522, longitude: -118.2437 });
  
  // Clock in
  await page.click('[data-testid="clock-in-button"]');
  
  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('[data-testid="clock-out-button"]')).toBeVisible();
});
```

### 11.5 Performance Tests

**Tools:** k6, Apache JMeter

**Scenarios:**
- 100 concurrent users
- 1000 requests per minute
- Database query optimization
- API response times

**Example:**
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Steady state
    { duration: '2m', target: 0 },   // Ramp down
  ],
};

export default function () {
  let response = http.get('https://api.example.com/api/v1/projects');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

### 11.6 Security Tests

**Automated:**
- OWASP ZAP scanning
- npm audit / yarn audit
- Dependency vulnerability scanning
- SQL injection testing
- XSS testing

**Manual:**
- Penetration testing (annually)
- Security code review
- Authentication/authorization testing

---

## 12. Future Enhancements

### Phase 2 (6-12 months)
1. **Mobile Native Apps** - iOS and Android native apps
2. **Advanced Reporting** - Custom dashboard builder
3. **Equipment Tracking** - Track tools and equipment location
4. **Inventory Management** - Materials inventory with reorder alerts
5. **Schedule/Calendar Integration** - Google Calendar, Outlook sync
6. **Customer Quotes** - Interactive quote builder with e-signature
7. **Document Templates** - Customizable contracts and forms

### Phase 3 (12-24 months)
1. **AI-Powered Features**
   - Automatic project estimation based on historical data
   - Predictive analytics for project completion
   - Chatbot for common questions
   - Automatic expense categorization
2. **Advanced Integrations**
   - QuickBooks Online
   - Xero accounting
   - ADP/Gusto payroll
   - Material supplier APIs
3. **Marketplace**
   - Plugin marketplace
   - Template marketplace
   - Training materials

### Phase 4 (24+ months)
1. **Multi-Company Management** - For holding companies
2. **Franchise Features** - Centralized management for franchises
3. **Advanced Analytics** - Machine learning insights
4. **Video Calling** - Integrated video calls for remote support
5. **AR Features** - Augmented reality for measurements and planning

---

## 13. Appendices

### Appendix A: Glossary

- **PWA:** Progressive Web Application
- **Geofencing:** Virtual perimeter for a real-world geographic area
- **JWT:** JSON Web Token
- **CRUD:** Create, Read, Update, Delete
- **API:** Application Programming Interface
- **REST:** Representational State Transfer
- **WCAG:** Web Content Accessibility Guidelines
- **i18n:** Internationalization
- **L10n:** Localization
- **SLA:** Service Level Agreement
- **RTO:** Recovery Time Objective
- **RPO:** Recovery Point Objective

### Appendix B: Third-Party Services

| Service | Purpose | Alternatives |
|---------|---------|--------------|
| Twilio | SMS messaging | Plivo, Vonage |
| SendGrid | Email delivery | Mailgun, AWS SES |
| Mapbox | Maps & geolocation | Google Maps, OpenStreetMap |
| Stripe | Payment processing | Square, PayPal |
| OpenAI | AI translation | Claude API, Google Translate |
| Sentry | Error tracking | Rollbar, Bugsnag |

### Appendix C: Estimated Costs

**Infrastructure (Monthly):**
- Hosting: $50-200
- Database: $50-150
- File Storage: $20-100
- Email/SMS: $30-200 (usage-based)
- Monitoring: $30-100
- **Total: $180-750/month**

**Development:**
- Initial MVP: 3-6 months
- Team: 2-4 developers
- Ongoing maintenance: 1 developer

**Third-Party Services:**
- Domain: $15/year
- SSL: Free (Let's Encrypt)
- Analytics: Free (self-hosted) or $50-200/month

### Appendix D: Success Metrics

**Technical:**
- 99.5% uptime
- < 2s page load time
- < 500ms API response time
- 80%+ test coverage
- Zero critical security vulnerabilities

**Business:**
- User adoption rate: 80%+ of employees
- Daily active users: 70%+ of workforce
- Customer satisfaction: 4.5/5 or higher
- Support tickets: < 5 per 100 active users/month

**User Experience:**
- Time to clock in: < 10 seconds
- Time to create project: < 2 minutes
- Mobile usage: 60%+ of sessions
- Feature adoption: 80%+ use core features

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-14 | System Architect | Initial specification |

**Approval:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | |
| Technical Lead | | | |
| Security Officer | | | |

**Next Review Date:** 2026-08-14

---

*End of Document*
