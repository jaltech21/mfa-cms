# MFA Client & Casework Management System - Implementation Plan

**Project:** Migration For All (MFA) - Client & Casework Management System  
**Lead Developer:** Implementation Plan  
**Date:** October 28, 2026  
**Tech Stack:** Python/FastAPI, PostgreSQL, React, Trexo AI/WhatsApp API

---

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Phase 1: Database Architecture & Core Setup](#phase-1-database-architecture--core-setup)
- [Phase 2: Authentication & RBAC Engine](#phase-2-authentication--rbac-engine)
- [Phase 3: Operations & IT Management Portal](#phase-3-operations--it-management-portal)
- [Phase 4: Client Portal & Intake Form Workflow](#phase-4-client-portal--intake-form-workflow)
- [Phase 5: Financial Ledger & Gated Tracking](#phase-5-financial-ledger--gated-tracking)
- [Phase 6: Trexo AI Integration & Cloud Launch](#phase-6-trexo-ai-integration--cloud-launch)
- [Testing Strategy](#testing-strategy)
- [Deployment Checklist](#deployment-checklist)
- [Risk Mitigation](#risk-mitigation)

---

## Overview

This plan follows the 6-phase approach outlined in the README. Each phase builds on the previous one, with clear deliverables, dependencies, and acceptance criteria.

---

## Project Structure

```
mfa-cms/
├── backend/
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── api/v1/           # API routes
│   │   ├── core/             # Config, security, constants
│   │   ├── crud/             # Database operations
│   │   ├── db/               # Database session, base
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helpers, validators
│   │   └── main.py
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── features/         # Feature modules
│   │   ├── hooks/            # Custom hooks
│   │   ├── layouts/          # Layout components
│   │   ├── lib/              # API client, utils
│   │   ├── pages/            # Route pages
│   │   ├── store/            # State management
│   │   └── App.tsx
│   ├── package.json
│   └── .env.example
└── docs/                     # Additional documentation
```

---

## Phase 1: Database Architecture & Core Setup
**Duration:** 1-2 weeks | **Priority:** Critical | **Dependencies:** None

### Objective
Establish the PostgreSQL database schema with all 10 core entities, relationships, migrations, and foundational backend structure.

### Tasks

#### 1.1 Project Initialization
- [ ] **Backend scaffolding**: Initialize FastAPI project with proper folder structure
- [ ] **Frontend scaffolding**: Initialize React + Vite/CRA with TypeScript
- [ ] **Environment setup**: Create `.env.example` files for both backend and frontend
- [ ] **Git configuration**: Add `.gitignore` files
- [ ] **Dependencies**: Set up `requirements.txt` (FastAPI, SQLAlchemy, Alembic, psycopg2, pydantic, python-jose, passlib, etc.) and `package.json`

#### 1.2 Database Design & Models
- [ ] **Base model setup**: Create `Base` class with common fields (id, created_at, updated_at)
- [ ] **Submission_Leads model**: Track referring MPs, PS, Parliamentary Staff
- [ ] **Clients model**: PII, contact info, credentials, status fields
- [ ] **Visa_Processing_Catalog model**: Process types, categories, standard prices
- [ ] **Cohorts model**: Delegation groups, family memberships
- [ ] **Programs model**: Client-program linkage, proposed budgets/dates, `is_initiated` flag
- [ ] **Terms_And_Conditions model**: Version-controlled legal text
- [ ] **Client_Consent_Logs model**: Sign-offs, signatures (base64/image), passport verification, IP, timestamps
- [ ] **Payments model**: Transactions, fees, receipts, payment status
- [ ] **Process Details models**: 
  - `Marriage_Process_Details`
  - `Business_Process_Details`
  - `Ministry_Envoy_Process_Details`
  - `Medical_Process_Details`
- [ ] **System_Audit_Logs model**: Action tracking, user context, metadata

#### 1.3 Relationships & Constraints
- [ ] **Foreign keys**: Establish all relationships between entities
- [ ] **Enums**: Define enums for roles, program types, payment status, etc.
- [ ] **Indexes**: Add indexes for frequently queried fields (client_id, email, program_id)
- [ ] **Constraints**: Add CHECK constraints, unique constraints where appropriate
- [ ] **Cascades**: Configure proper cascade rules

#### 1.4 Migrations & DB Setup
- [ ] **Alembic initialization**: Configure Alembic with database URL
- [ ] **Initial migration**: Generate migration for all models
- [ ] **Migration testing**: Test upgrade/downgrade
- [ ] **Seed data**: Create seed scripts for admin user, test catalog, terms & conditions
- [ ] **DB connection**: Set up SQLAlchemy engine and session management

### Deliverables
- Complete database schema implemented
- All migrations functional
- Database connection established
- Seed data available
- ERD diagram (can be generated or documented)

### Acceptance Criteria
- [ ] All 10 tables created with correct fields and relationships
- [ ] Migrations run successfully (`alembic upgrade head`)
- [ ] Can connect to PostgreSQL and perform CRUD operations
- [ ] Seed data loads without errors

---

## Phase 2: Authentication & RBAC Engine
**Duration:** 1-2 weeks | **Priority:** Critical | **Dependencies:** Phase 1

### Objective
Implement secure authentication with JWT, role-based access control, and strict data scoping for different user types.

### Tasks

#### 2.1 Core Security Setup
- [ ] **Config management**: Environment variables, settings with Pydantic
- [ ] **Password hashing**: Implement bcrypt with passlib
- [ ] **JWT tokens**: Access token generation/validation with python-jose
- [ ] **Token dependencies**: Create auth dependencies for protected routes
- [ ] **Security utils**: Token creation, verification, password utilities

#### 2.2 User Models & Authentication
- [ ] **User/Client auth**: Extend models for authentication (password hashes)
- [ ] **Registration endpoints**: Client registration flow
- [ ] **Login endpoint**: Email/password authentication returning JWT
- [ ] **Token refresh**: Implement refresh token mechanism (optional but recommended)
- [ ] **Logout**: Token invalidation strategy
- [ ] **Password reset**: Forgot password flow with secure tokens

#### 2.3 RBAC Implementation
- [ ] **Role definitions**: Define roles (Super Admin, Operations Manager, General Staff/Report-Only, Client)
- [ ] **Role middleware/decorators**: `@require_roles()` decorator for route protection
- [ ] **Permission system**: Granular permissions per role
- [ ] **Role assignment**: Admin ability to assign roles
- [ ] **Default roles**: Proper role assignment on registration

#### 2.4 Data Scoping & Security
- [ ] **Client data isolation**: Ensure clients can only access their own data
- [ ] **Cross-client protection**: Return 403 for unauthorized cross-client access
- [ ] **PII redaction**: Implement redaction logic for General Staff (Report-Only)
- [ ] **Query filtering**: Auto-filter queries based on user role/context
- [ ] **Audit logging**: Log authentication events (login, failed attempts, role changes)

#### 2.5 Auth API Endpoints
- [ ] `POST /api/v1/auth/register` - Client registration
- [ ] `POST /api/v1/auth/login` - Login
- [ ] `POST /api/v1/auth/me` - Get current user
- [ ] `POST /api/v1/auth/logout` - Logout
- [ ] `POST /api/v1/auth/change-password` - Change password
- [ ] `POST /api/v1/auth/reset-password` - Password reset

### Deliverables
- Complete auth system with JWT
- RBAC enforced across all protected routes
- Data scoping implemented
- Auth API endpoints functional

### Acceptance Criteria
- [ ] Users can register and login successfully
- [ ] JWT tokens are validated correctly
- [ ] Role-based access is enforced (unauthorized roles get 403)
- [ ] Clients cannot access other clients' data
- [ ] General Staff see redacted PII in appropriate contexts

---

## Phase 3: Operations & IT Management Portal
**Duration:** 2-3 weeks | **Priority:** High | **Dependencies:** Phase 2

### Objective
Build the admin/operations interface for managing catalog, reviewing applications, assigning cohorts, and overseeing the system.

### Tasks

#### 3.1 Backend - Catalog Management
- [ ] **CRUD endpoints**: Visa_Processing_Catalog management
- [ ] **Catalog validation**: Validate process types and pricing
- [ ] **Bulk operations**: Support bulk updates if needed
- [ ] **Active/inactive**: Toggle catalog items
- [ ] **API routes**: 
  - `GET/POST/PUT/DELETE /api/v1/admin/catalog`

#### 3.2 Backend - Application Review Queue
- [ ] **Submission listing**: View all client applications/submissions
- [ ] **Filtering**: Filter by status, program type, date, cohort
- [ ] **Application details**: View full client application
- [ ] **Status updates**: Update application status
- [ ] **Notes/comments**: Add internal notes (staff only)
- [ ] **API routes**: 
  - `GET /api/v1/admin/applications`
  - `GET /api/v1/admin/applications/{id}`
  - `PUT /api/v1/admin/applications/{id}/status`

#### 3.3 Backend - Cohort Management
- [ ] **Cohort CRUD**: Create, read, update, delete cohorts
- [ ] **Client assignment**: Assign clients to cohorts
- [ ] **Co-client grouping**: Manage family/delegation relationships
- [ ] **Envoy roles**: Assign specific roles within cohorts
- [ ] **Bulk assignment**: Assign multiple clients at once
- [ ] **API routes**: 
  - `GET/POST/PUT/DELETE /api/v1/admin/cohorts`
  - `POST /api/v1/admin/cohorts/{id}/assign`

#### 3.4 Backend - User & Client Management
- [ ] **Client listing**: View all clients with filters
- [ ] **Client details**: Full client profile view
- [ ] **Role management**: Assign/update user roles
- [ ] **Account status**: Activate/deactivate accounts
- [ ] **Submission leads**: Manage referral tracking
- [ ] **API routes**: 
  - `GET /api/v1/admin/clients`
  - `GET /api/v1/admin/clients/{id}`
  - `PUT /api/v1/admin/users/{id}/role`

#### 3.5 Backend - Terms & Conditions Management
- [ ] **Version control**: Create new versions of T&C
- [ ] **Activation**: Set active version
- [ ] **History**: View all versions
- [ ] **API routes**: 
  - `GET/POST/PUT /api/v1/admin/terms`

#### 3.6 Frontend - Operations Portal UI
- [ ] **Layout**: Admin layout with navigation, role-based menu
- [ ] **Dashboard**: Overview stats, pending applications, alerts
- [ ] **Catalog management**: Table with CRUD modals
- [ ] **Application queue**: Data table with filters, status badges
- [ ] **Application detail view**: Full client info, documents, history
- [ ] **Cohort management**: Cohort list, assignment interface
- [ ] **Client management**: Client directory with search/filters
- [ ] **User management**: Role assignment UI
- [ ] **Terms management**: T&C editor/versioning UI
- [ ] **Responsive design**: Mobile-friendly admin interface

### Deliverables
- Full Operations & IT Management Portal (backend + frontend)
- Catalog administration working
- Application review workflow functional
- Cohort management operational

### Acceptance Criteria
- [ ] Admins can manage catalog items
- [ ] Operations staff can review and update application statuses
- [ ] Cohorts can be created and clients assigned
- [ ] Role-based UI shows appropriate menus
- [ ] All admin actions are audit logged

---

## Phase 4: Client Portal & Intake Form Workflow
**Duration:** 2-3 weeks | **Priority:** High | **Dependencies:** Phase 3

### Objective
Build the client-facing portal with multi-step intake form, catalog pricing preview, and legal sign-off module.

### Tasks

#### 4.1 Backend - Client Profile & Intake
- [ ] **Client onboarding**: Complete profile setup
- [ ] **Multi-step intake**: Support partial saves/drafts
- [ ] **Program selection**: Select from catalog (Marriage/Business/Ministry Envoy/Medical)
- [ ] **Submission leads**: Link referrer information
- [ ] **Validation**: Comprehensive field validation
- [ ] **API routes**: 
  - `GET/POST/PUT /api/v1/client/profile`
  - `POST /api/v1/client/intake/start`
  - `PUT /api/v1/client/intake/{step}`

#### 4.2 Backend - Catalog & Pricing Preview
- [ ] **Public catalog view**: Clients can view available programs/prices
- [ ] **Pricing display**: Show standard catalog prices
- [ ] **Proposed budget**: Allow clients to submit proposed budgets/dates
- [ ] **Comparison view**: Show standard vs proposed
- [ ] **API routes**: 
  - `GET /api/v1/client/catalog`
  - `POST /api/v1/client/programs/propose`

#### 4.3 Backend - Legal Sign-Off & Consent
- [ ] **Active T&C retrieval**: Get current version
- [ ] **Digital signature**: Accept base64 canvas signature or passport number verification
- [ ] **Consent logging**: Create immutable consent log entry
- [ ] **IP tracking**: Capture client IP address
- [ ] **Version tracking**: Link to specific T&C version
- [ ] **Validation**: Ensure sign-off before proceeding
- [ ] **API routes**: 
  - `GET /api/v1/client/terms/active`
  - `POST /api/v1/client/consent/sign`

#### 4.4 Backend - Process Details
- [ ] **Track-specific forms**: Create/update process details per program type
- [ ] **Dynamic forms**: Load appropriate form based on program
- [ ] **Checklist items**: Track document requirements
- [ ] **API routes**: 
  - `GET/POST/PUT /api/v1/client/process-details/{program_type}`

#### 4.5 Frontend - Client Portal UI
- [ ] **Client layout**: Portal layout with navigation
- [ ] **Dashboard**: Client dashboard (status depends on initiation)
- [ ] **Profile setup**: Personal information form
- [ ] **Multi-step intake wizard**: Step-by-step form with progress indicator
- [ ] **Program selection**: Catalog view with pricing
- [ ] **Budget proposal**: Form to propose budget and preferred dates
- [ ] **Legal sign-off**: T&C display, signature canvas, passport verification option
- [ ] **Process details form**: Track-specific questionnaires
- [ ] **Application status**: View submission status
- [ ] **Responsive design**: Mobile-friendly

#### 4.6 Client Dashboard Gating
- [ ] **Initial state**: Before initiation, show limited/restricted view
- [ ] **Gated access**: Only show full tracking after `is_initiated = TRUE`
- [ ] **Status messaging**: Clear messages about initiation requirements
- [ ] **Progress indicators**: Show what's completed vs pending

### Deliverables
- Client self-service portal functional
- Multi-step intake form working
- Legal sign-off with audit trail
- Catalog pricing and budget proposal working
- Gated dashboard logic implemented

### Acceptance Criteria
- [ ] Clients can complete multi-step intake
- [ ] Can view catalog and propose budgets/dates
- [ ] Legal sign-off captures signature and creates consent log
- [ ] Before initiation, dashboard shows gated/restricted state
- [ ] Form data persists across sessions (drafts)

---

## Phase 5: Financial Ledger & Gated Tracking
**Duration:** 1-2 weeks | **Priority:** High | **Dependencies:** Phase 4

### Objective
Implement financial tracking, receipt logging, enforce gated access based on initiation status, and build transparency dashboards.

### Tasks

#### 5.1 Backend - Financial Ledger
- [ ] **Payment CRUD**: Create, read, update payments
- [ ] **Receipt management**: Upload/store receipt references
- [ ] **Payment types**: Visa fees, service charges, etc.
- [ ] **Payment status**: Pending, paid, partial, refunded
- [ ] **Payment validation**: Amount validation, duplicate checks
- [ ] **Balance calculation**: Calculate outstanding balances per client/program
- [ ] **API routes**: 
  - `GET/POST/PUT /api/v1/admin/payments`
  - `GET /api/v1/client/payments`
  - `GET /api/v1/client/payments/balance`

#### 5.2 Backend - Gated Access Guards
- [ ] **Initiation check**: Middleware/dependency to check `is_initiated`
- [ ] **Guard implementation**: Protect tracking endpoints
- [ ] **Client-side guards**: Return appropriate errors/messages
- [ ] **Status flags**: Check program initiation status
- [ ] **Bypass for admins**: Operations staff can access regardless
- [ ] **API routes protection**: Apply guards to document tracking, process updates
- [ ] **Dependency**: `require_initiated()` dependency

#### 5.3 Backend - Document & Process Tracking
- [ ] **Document checklist**: Track required documents per process
- [ ] **Upload tracking**: Document submission status
- [ ] **Approval workflow**: Staff can approve/reject documents
- [ ] **Process milestones**: Track progress through workflow
- [ ] **Status updates**: Update process status
- [ ] **API routes**: 
  - `GET /api/v1/client/tracking` (gated)
  - `GET /api/v1/admin/tracking/{client_id}`
  - `PUT /api/v1/admin/tracking/{id}/status`

#### 5.4 Frontend - Financial Dashboard
- [ ] **Admin ledger**: Full financial overview with filters
- [ ] **Payment entry**: Form to log payments/receipts
- [ ] **Client payments**: Client view of payment history (if initiated or as appropriate)
- [ ] **Balance display**: Outstanding balance cards
- [ ] **Receipt viewer**: View receipt attachments
- [ ] **Color-coded status**: Green (Paid), Yellow (Pending), Gray/Red (None)
- [ ] **Reports**: Financial summaries

#### 5.5 Frontend - Gated Tracking Dashboard
- [ ] **Client tracking**: Full tracking view (only if initiated)
- [ ] **Pre-initiation view**: Show message with requirements
- - [ ] **Process checklist**: Visual checklist with status
- [ ] **Milestone tracker**: Timeline of progress
- [ ] **Document status**: Track document submissions/approvals
- [ ] **Initiation management**: Admin UI to mark program as initiated
- [ ] **Transparency dashboard**: Show real-time progress

#### 5.6 Audit & Compliance
- [ ] **System audit logs**: Log all financial transactions
- [ ] **Initiation logging**: Log when programs are initiated
- [ ] **Payment audit trail**: Immutable payment logs
- [ ] **Access logging**: Log gated access attempts

### Deliverables
- Financial ledger system complete
- Gated access fully enforced
- Document/process tracking operational
- Transparent dashboards with color-coding

### Acceptance Criteria
- [ ] Payments can be logged with receipts
- [ ] Clients cannot access tracking until `is_initiated = TRUE`
- [ ] Admins can initiate programs (sets flag and logs action)
- [ ] Color-coded statuses display correctly
- [ ] All financial actions are audit logged
- [ ] Balance calculations are accurate

---

## Phase 6: Trexo AI Integration & Cloud Launch
**Duration:** 1-2 weeks | **Priority:** Medium-High | **Dependencies:** Phase 5

### Objective
Integrate Trexo AI for WhatsApp automation, implement webhooks, add notifications, and prepare for production deployment.

### Tasks

#### 6.1 Trexo AI Integration - Backend
- [ ] **API client**: Create Trexo API client/service
- [ ] **Configuration**: Add Trexo API key to config
- [ ] **Message templates**: Create templates for status updates, reminders
- [ ] **Status queries**: Handle RAG-based status queries from WhatsApp
- [ ] **Notification service**: Trigger notifications on key events
- [ ] **Webhook endpoint**: Receive webhooks from Trexo
- [ ] **Event triggers**: 
  - Application status changes
  - Payment received
  - Document approved/rejected
  - Program initiated
  - Appointment reminders

#### 6.2 WhatsApp Notification Flows
- [ ] **Welcome message**: On registration/approval
- [ ] **Status updates**: Automated updates on progress
- [ ] **Document reminders**: Remind about pending documents
- [ ] **Payment reminders**: Remind about outstanding balances
- [ ] **Initiation notification**: Notify when access is unlocked
- [ ] **Custom messages**: Allow staff to send custom messages
- [ ] **Opt-in/opt-out**: Respect communication preferences

#### 6.3 Backend - Webhooks & Automation
- [ ] **Webhook security**: Validate webhook signatures
- [ ] **Webhook routes**: 
  - `POST /api/v1/webhooks/trexo` 
- [ ] **Background tasks**: Use Celery/BackgroundTasks for async notifications
- [ ] **Queue management**: Handle failed message retries
- [ ] **Logging**: Log all WhatsApp interactions

#### 6.4 System Enhancements
- [ ] **System audit logs**: Ensure all bot actions logged
- [ ] **Error handling**: Robust error handling and alerts
- [ ] **Rate limiting**: Prevent abuse
- [ ] **API documentation**: Complete Swagger/OpenAPI docs
- [ ] **Health checks**: Health endpoint for monitoring

#### 6.5 Frontend - Notification Management
- [ ] **Notification settings**: Client preferences
- [ ] **Message history**: View WhatsApp message history
- [ ] **Manual messaging**: Admin can send messages
- [ ] **Template management**: Manage message templates

#### 6.6 Cloud Deployment Preparation
- [ ] **Environment config**: Production env setup
- [ ] **Database**: Production PostgreSQL setup/migration
- [ ] **Backend deployment**: Deploy FastAPI (Render/Railway/Heroku/AWS)
- [ ] **Frontend deployment**: Deploy React (Vercel/Netlify)
- [ ] **SSL/HTTPS**: Configure SSL certificates
- [ ] **CORS**: Production CORS settings
- [ ] **Static files**: Handle file uploads if needed
- [ ] **Monitoring**: Set up logging/monitoring
- [ ] **Backups**: Database backup strategy
- [ ] **Domain setup**: Configure custom domain

### Deliverables
- Trexo AI/WhatsApp integration working
- Automated notifications functional
- Webhooks processing correctly
- Application deployed to production
- Monitoring and backups configured

### Acceptance Criteria
- [ ] WhatsApp notifications sent on key events
- [ ] Trexo webhooks received and processed
- [ ] Status queries work via WhatsApp
- [ ] Production deployment successful
- [ ] Health checks passing
- [ ] All environments configured correctly

---

## Testing Strategy

### Unit Testing
- **Backend**: Pytest for models, CRUD, utilities, auth
- **Frontend**: Jest/React Testing Library for components
- **Coverage target**: >70% for critical modules

### Integration Testing
- API endpoint testing with test database
- Auth flow testing
- RBAC enforcement testing
- Payment and financial flow testing

### End-to-End Testing
- Complete client intake flow
- Admin review and initiation flow
- Gated access flow
- Payment logging flow

### Security Testing
- Authentication/authorization tests
- Data isolation verification
- PII redaction testing
- SQL injection prevention
- XSS protection

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Security audit completed
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Backup created
- [ ] SSL certificates ready

### Backend Deployment
- [ ] Deploy to production server
- [ ] Run migrations
- [ ] Seed initial data (admin, catalog, T&C)
- [ ] Configure environment variables
- [ ] Set up process manager (gunicorn/uvicorn)
- [ ] Configure reverse proxy (nginx)

### Frontend Deployment
- [ ] Build production bundle
- [ ] Deploy to hosting platform
- [ ] Configure API base URL
- [ ] Test all routes
- [ ] Verify CORS

### Post-Deployment
- [ ] Smoke tests
- [ ] Health check verification
- [ ] Monitor logs
- [ ] Test critical flows
- [ ] Document deployment

---

## Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Complex RBAC implementation | High | Medium | Start with simple role checks, test thoroughly per phase |
| Gated access logic errors | High | Medium | Extensive testing, clear guards, admin bypass for testing |
| Data isolation bugs | Critical | Low | Automated tests for cross-client access, code reviews |
| Trexo API changes | Medium | Medium | Abstract API client, version checking, fallback |
| Migration issues | High | Medium | Test migrations on staging, backup before prod |
| Signature storage | Medium | Medium | Store as base64 or in object storage, consider size limits |

---

## Development Guidelines

- **Code Quality**: Follow PEP 8 (Python), ESLint/Prettier (TypeScript)
- **Git Workflow**: Feature branches, PR reviews, conventional commits
- **Documentation**: Update docs with each feature
- **Security First**: Never commit secrets, validate all inputs
- **Audit Everything**: Log state changes, especially financial/legal actions
- **Data Privacy**: Respect PII, implement redaction properly

---

## Next Steps

1. **Start Phase 1**: Initialize project structure and begin database models
2. **Set up dev environment**: PostgreSQL, Python venv, Node.js
3. **Create ERD**: Visualize schema before implementing
4. **Daily standups**: Track progress against phase milestones
5. **Regular testing**: Test each phase thoroughly before moving to next

**Total Estimated Timeline:** 8-12 weeks for full implementation

**Note:** This plan is based on the README specification. Adjust timelines and scope as requirements are clarified during development.