Migration For All (MFA) - Client & Casework Management System

An enterprise-grade client management, visa workflow tracking, and financial database engine designed for Migration For All (MFA). Built with a Python/FastAPI backend, PostgreSQL relational database, and a React-based Client & Operations Portal, the platform supports role-based access control (RBAC), client self-service onboarding, cohort management, and seamless integration with Trexo AI for WhatsApp automation.

🌟 Key Features

Multi-Track Process Workflow: Supports specialized documentation pipelines for Marriage, Business, Ministry Envoy, and Medical migration programs.

Gated Client Progress Dashboard: Clients submit applications online but documentation tracking unlocks only after an in-person office visit, fee settlement, and official initiation by the Operations/IT team (is_initiated = TRUE).

Catalog & Proposed Pricing Engine: Displays standard organization price tags while enabling clients to submit proposed budgets and dates for review.

Legal Sign-Off & Audit Logging: Captures digital signatures (canvas drawing or passport number verification) alongside timestamped IP logs linked to versioned Terms & Conditions.

Cohort & Co-Client Grouping: Enables tracking of delegation groups, family memberships, and specific envoy roles.

Color-Coded Status Reporting: Real-time management dashboards featuring visual indicator badges (Green: Paid/Certified, Yellow: Pending, Gray/Red: None/Unavailable).

Role-Based Access Control (RBAC): Enforces strict data scoping across Super Admins, Operations Managers, General Staff (Report-Only), and Clients.

Trexo AI & WhatsApp Integration: Native hooks for AI-driven 24/7 client status updates and document reminders via WhatsApp.

🏗️ System Architecture

+-----------------------------------------------------------------------------------+
|                                   MFA ECOSYSTEM                                   |
|                                                                                   |
|  +------------------------+  +------------------------+  +---------------------+  |
|  |  Client Self-Service   |  |     WhatsApp Client    |  |   Operations & IT   |  |
|  |     Web/Mobile Portal  |  |   (via Trexo AI Engine)|  |    Admin Dashboard  |  |
|  +-----------+------------+  +-----------+------------+  +----------+----------+  |
|              |                           |                          |             |
|              | (Restricted APIs)         | (RAG Status Queries)     | (Full/RBAC) |
|              v                           v                          v             |
|  +-----------------------------------------------------------------------------+  |
|  |                         FastAPI Backend Application                         |  |
|  |            (JWT Auth | Authorization Guards | Business Logic)               |  |
|  +-------------------------------------+---------------------------------------+  |
|                                        |                                          |
|                                        v                                          |
|  +-----------------------------------------------------------------------------+  |
|  |                     PostgreSQL Relational Database                          |  |
|  |  (Clients | Programs | Submissions | Payments | Documents | Cohorts)        |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+


🗄️ Database Schema & Entities

The database is normalized to 3rd Normal Form (3NF) and contains 10 core tables:

Submission_Leads: Tracks referring MPs, Permanent Secretaries, and Parliamentary Staff.

Clients: Client PII, contact info, and security credentials.

Visa_Processing_Catalog: Master catalog containing process types and standard price tags.

Cohorts: Grouping table for delegations, co-clients, and family tracks.

Programs: Core program assignment linking clients, proposed budgets, official dates, and initiation flags (is_initiated).

Terms_And_Conditions: Version-controlled legal disclaimers.

Client_Consent_Logs: Legally binding sign-off logs with digital signatures and passport verifications.

Payments: Transaction records for visa fees, service charges, and receipt logs.

Process Details Tables: Track-specific checklists (Marriage_Process_Details, Business_Process_Details, Ministry_Envoy_Process_Details, Medical_Process_Details).

System_Audit_Logs: System activity and automated bot action records.

🗺️ Module Phase Implementation Plan

Phase 1: Database Architecture & Core Setup — PostgreSQL provisioning, migrations, and relationship constraints.

Phase 2: Authentication & RBAC Engine — JWT token system, role middleware, and client data scoping.

Phase 3: Operations & IT Management Portal — Catalog administration, application review queue, and cohort assignment UI.

Phase 4: Client Portal & Intake Form Workflow — Multi-step intake form, catalog pricing previews, and legal sign-off module.

Phase 5: Financial Ledger & Gated Tracking — Receipt logging, gated access guards (is_initiated), and transparency dashboards.

Phase 6: Trexo AI Integration & Cloud Launch — WhatsApp webhooks, background notifications, and production deployment.

🚀 Getting Started

Prerequisites

Python: 3.10+

Node.js: 18+

PostgreSQL: 14+

Git

Backend Setup (FastAPI)

Clone the repository:

git clone https://github.com/your-org/mfa-client-database.git
cd mfa-client-database/backend


Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install dependencies:

pip install -r requirements.txt


Set up environment variables:
Create a .env file in the backend/ root directory:

DATABASE_URL=postgresql://user:password@localhost:5432/mfa_db
SECRET_KEY=your_jwt_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
TREXO_API_KEY=your_trexo_api_key


Run database migrations:

alembic upgrade head


Start the FastAPI development server:

uvicorn main:app --reload


Access API docs at http://localhost:8000/docs.

Frontend Setup (React / Dashboard & Portal)

Navigate to the frontend folder:

cd ../frontend


Install npm dependencies:

npm install


Configure environment variables (.env.local):

VITE_API_BASE_URL=http://localhost:8000/api/v1


Start the frontend server:

npm run dev


🔒 Security & Compliance

Data Isolation: Clients are scoped strictly to their own client_id context. API queries cross-checking other records return 403 Forbidden.

PII Redaction: General Staff (Report-Only) view aggregate dashboard metrics with sensitive client details (passports, financial balances) stripped out.

Auditability: All state changes and agreement sign-offs are logged immutably in Client_Consent_Logs and System_Audit_Logs.

📄 License

Distributed under the MIT License. See LICENSE for more information.
