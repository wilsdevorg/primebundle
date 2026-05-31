# PHASE 1 — REQUIREMENTS ANALYSIS

> **Last Updated:** May 2026  
> **Status:** Phase 17 Complete — Backend API Server Built & Running

---

## 1. Project Overview

**Project Name:** ThePlug Store  
**Type:** Multi-service Digital Marketplace  
**Version:** 1.0.0  
**Repository:** Local (`c:\Users\dzani\Desktop\my store`)

### 1.1 Project Description

ThePlug Store is a comprehensive multi-service digital marketplace platform targeting the Ghanaian market. It enables users to:

- Purchase mobile data bundles (MTN, MTN Express, AirtelTigo, Telecel)
- Order social media marketing services (Instagram, TikTok, YouTube, Twitter, Facebook, Telegram, Spotify)
- Manage a digital wallet with top-up functionality
- Earn and redeem loyalty points
- Track all orders and transactions
- Participate in an affiliate/referral program
- Operate as resellers with API access

All through a seamless, modern, mobile-first web interface.

### 1.2 Target Audience

| Segment | Description |
|---------|-------------|
| **Individual Consumers** | Purchasing mobile data bundles for personal use |
| **Social Media Marketers** | Content creators needing SMM services (followers, likes, views) |
| **Resellers** | Entrepreneurs building their own digital services storefront |
| **Affiliate Marketers** | Users promoting ThePlug Store services for commissions |

### 1.3 Currency & Locale

| Item | Value |
|------|-------|
| **Currency** | Ghanaian Cedi (₵ / GHS) |
| **Country** | Ghana |
| **Payment Methods** | MTN MoMo, Vodafone Cash, AirtelTigo Money, Paystack |
| **Mobile Networks** | MTN, MTN Express, AirtelTigo, Telecel |
| **Timezone** | GMT (UTC+0) |

### 1.4 Development Approach

The project follows a **prototype-first** methodology:

- **Phase 1–16 (Complete):** Frontend prototype — fully functional UI with mock data and predefined demo user
- **Phase 17 (Complete):** Backend API server built with Node.js/Express + SQLite database with seed data
- **Phase 18+ (Next):** Frontend-backend integration — replace mock data with real API calls

The project currently runs with:
- **Frontend:** React + Vite SPA with mock data (customer app) + separate admin panel (`admin.html`)
- **Backend:** Node.js/Express REST API server on `localhost:5000` with SQLite database
- **Database:** SQLite (development) with Sequelize ORM — seeded with demo user, bundles, orders, transactions
- **NO** real authentication on the customer-facing app (demo mode)
- **Admin panel** has simple credential-based login (email/password)
- **Predefined demo user** profile for all customer interactions

---

## 2. Core Requirements

### 2.1 Demo User Profile (Phase 1)

| Field | Value |
|-------|-------|
| Name | Demo User |
| User ID | PLUG-DEMO-001 |
| Email | demo@theplug.store |
| Phone | 0201234567 |
| Wallet Balance | ₵0.90 |
| Loyalty Points | 555 |
| Total Orders | 44 |
| Successful Orders | 43 |
| Join Date | January 2025 |
| Tier | Gold |
| Referral Code | PLUG-DEMO-001 |
| Affiliate Balance | ₵0.00 |
| Total Referrals | 0 |
| Total Earned | ₵0.00 |

### 2.2 Core Features (Implemented in Prototype)

| # | Feature | Page | Route | Status |
|---|---------|------|-------|--------|
| 1 | Landing/Marketing Page | `Landing.jsx` | `/` | ✅ Done |
| 2 | Dashboard | `Dashboard.jsx` | `/dashboard` | ✅ Done |
| 3 | Data Marketplace | `DataMarketplace.jsx` | `/data` | ✅ Done |
| 4 | Loyalty Program | `Loyalty.jsx` | `/loyalty` | ✅ Done |
| 5 | Wallet Top-Up | `Wallet.jsx` | `/wallet` | ✅ Done |
| 6 | Order Management | `Orders.jsx` | `/orders` | ✅ Done |
| 7 | SMM Marketplace | `SMM.jsx` | `/smm` | ✅ Done |
| 8 | SMM Orders | `SMMOrders.jsx` | `/smm-orders` | ✅ Done |
| 9 | Affiliate Program | `Affiliate.jsx` | `/affiliate` | ✅ Done |
| 10 | Transaction History | `Transactions.jsx` | `/transactions` | ✅ Done |
| 11 | Reseller Store | `Reseller.jsx` | `/reseller` | ✅ Done |
| 12 | Reseller API Portal | `ResellerAPI.jsx` | `/reseller-api` | ✅ Done |
| **13** | **Admin Login** | `AdminLogin.jsx` | `admin.html` → `/` | ✅ Done |
| **14** | **Admin Dashboard** | `AdminDashboard.jsx` | `admin.html` → `/dashboard` | ✅ Done |
| **15** | **Admin Orders** | `AdminOrders.jsx` | `admin.html` → `/dashboard/orders` | ✅ Done |
| **16** | **Admin SMM Services** | `AdminSMM.jsx` | `admin.html` → `/dashboard/smm` | ✅ Done |
| **17** | **Admin Users** | `AdminUsers.jsx` | `admin.html` → `/dashboard/users` | ✅ Done |
| **18** | **Admin Transactions** | `AdminTransactions.jsx` | `admin.html` → `/dashboard/transactions` | ✅ Done |
| **19** | **Admin Analytics** | `AdminAnalytics.jsx` | `admin.html` → `/dashboard/analytics` | ✅ Done |
| **20** | **Admin Settings** | `AdminSettings.jsx` | `admin.html` → `/dashboard/settings` | ✅ Done |

### 2.3 Navigation Structure

#### Public Pages
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Landing.jsx` | Landing page with hero, services, testimonials |

#### Application Pages (No Auth Required)
| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | `Dashboard.jsx` | Main dashboard with stats & quick actions |
| `/data` | `DataMarketplace.jsx` | Data bundle purchase page |
| `/loyalty` | `Loyalty.jsx` | Loyalty program & rewards |
| `/wallet` | `Wallet.jsx` | Wallet funding & management |
| `/orders` | `Orders.jsx` | General orders list |
| `/smm` | `SMM.jsx` | SMM service catalog |
| `/smm-orders` | `SMMOrders.jsx` | SMM-specific order tracking |
| `/affiliate` | `Affiliate.jsx` | Affiliate/referral program |
| `/transactions` | `Transactions.jsx` | Transaction history |
| `/reseller` | `Reseller.jsx` | Reseller dashboard |
| `/reseller-api` | `ResellerAPI.jsx` | Reseller API documentation & keys |

#### Admin Panel — Separate App (`admin.html`)
> The admin panel runs as a **completely separate React application** with its own HTML entry point (`admin.html`), React root (`admin-root`), router, and context. It is decoupled from the customer app.

| URL | Route | Component | Description |
|-----|-------|-----------|-------------|
| `localhost:5173/admin.html` | `/` | `AdminLogin.jsx` | Admin login page (demo credentials) |
| `localhost:5173/admin.html` | `/dashboard` | `AdminDashboard.jsx` | Admin dashboard with stats |
| `localhost:5173/admin.html` | `/dashboard/orders` | `AdminOrders.jsx` | All customer orders management |
| `localhost:5173/admin.html` | `/dashboard/smm` | `AdminSMM.jsx` | SMM service management |
| `localhost:5173/admin.html` | `/dashboard/users` | `AdminUsers.jsx` | User management & wallets |
| `localhost:5173/admin.html` | `/dashboard/transactions` | `AdminTransactions.jsx` | Transaction history |
| `localhost:5173/admin.html` | `/dashboard/analytics` | `AdminAnalytics.jsx` | Store analytics & insights |
| `localhost:5173/admin.html` | `/dashboard/settings` | `AdminSettings.jsx` | Store configuration |

**Admin Demo Credentials:**
- Email: `admin@theplug.store`
- Password: `admin123`

#### Catch-All
- `/*` → Redirects to `/` (landing page)

---

## 3. Current Project Structure (Full-Stack)

> This is the **actual current structure** of the project — frontend prototype + backend API server.

```
my-store/                              # Project root
├── index.html                         # Customer app HTML entry (Vite SPA)
├── admin.html                         # Admin panel HTML entry (separate SPA)
├── package.json                       # Frontend dependencies (React 18, Vite 6)
├── package-lock.json                  # Frontend locked versions
├── vite.config.js                     # Vite build config (multi-page: index + admin)
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS (Tailwind + Autoprefixer)
├── docs/
│   └── PHASE_1_REQUIREMENTS_ANALYSIS.md   # This document
│
├── src/                               # ═══ FRONTEND (React + Vite) ═══
│   ├── main.jsx                       # Customer app React DOM entry
│   ├── App.jsx                        # Customer app root — routing setup
│   ├── index.css                      # Global styles (Tailwind directives)
│   │
│   ├── admin/                         # Admin Panel (SEPARATE APP)
│   │   ├── main.jsx                   # Admin React DOM entry (own router + root)
│   │   ├── AdminContext.jsx            # Admin auth state (demo login)
│   │   ├── AdminLogin.jsx              # Login page with demo credentials
│   │   ├── AdminLayout.jsx             # Admin shell (dark sidebar + top bar)
│   │   ├── AdminDashboard.jsx          # Stats, recent orders, top services
│   │   ├── AdminOrders.jsx             # All orders management table
│   │   ├── AdminSMM.jsx                # SMM service management table
│   │   ├── AdminUsers.jsx              # User management & wallet balances
│   │   ├── AdminTransactions.jsx       # Transaction history (credits/debits)
│   │   ├── AdminAnalytics.jsx          # Revenue charts, platform breakdown
│   │   └── AdminSettings.jsx           # Store configuration (general, security)
│   │
│   ├── context/
│   │   └── AppContext.jsx              # Global state (useReducer + Context)
│   │
│   ├── data/
│   │   └── mockData.js                # Mock data (used until API integration)
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── Sidebar.jsx            # Desktop sidebar navigation
│   │       ├── BottomNav.jsx          # Mobile bottom tab navigation
│   │       ├── AppLayout.jsx          # App shell (Sidebar + content + BottomNav)
│   │       └── LandingLayout.jsx      # Public landing page shell
│   │
│   └── pages/
│       ├── Landing.jsx                # Marketing landing page
│       ├── Dashboard.jsx              # Dashboard with metrics & quick actions
│       ├── DataMarketplace.jsx        # Data bundle browsing & purchase
│       ├── Wallet.jsx                 # Wallet top-up (MoMo, Paystack)
│       ├── Orders.jsx                 # Unified order list
│       ├── SMM.jsx                    # SMM service catalog & ordering
│       ├── SMMOrders.jsx              # SMM-specific order tracking
│       ├── Loyalty.jsx                # Loyalty points, tiers, daily rewards
│       ├── Affiliate.jsx              # Affiliate dashboard, referral tracking
│       ├── Reseller.jsx               # Reseller storefront management
│       ├── ResellerAPI.jsx            # API docs, key management
│       └── Transactions.jsx           # Full transaction history
│
└── server/                            # ═══ BACKEND (Node.js + Express) ═══
    ├── package.json                   # Backend dependencies (Express, Sequelize, SQLite)
    ├── .env                           # Environment variables (PORT, DB path)
    │
    └── src/
        ├── index.js                   # Server entry point (Express + middleware)
        │                              #   - Helmet, CORS, Morgan, rate limiting
        │                              #   - Routes mounted at /api
        │                              #   - Auto-syncs database on startup
        │
        ├── config/
        │   └── database.js            # Sequelize connection (SQLite)
        │
        ├── models/                    # 10 Sequelize ORM models
        │   ├── index.js               # Model loader + associations
        │   ├── User.js                # User accounts (wallet, loyalty, tier)
        │   ├── DataBundle.js          # Data bundle catalog (MTN, AirtelTigo, Telecel)
        │   ├── SmmService.js          # SMM service catalog (12 services)
        │   ├── Order.js               # Orders (data + SMM, statuses)
        │   ├── Transaction.js         # Wallet transactions (credits/debits)
        │   ├── LoyaltyHistory.js      # Loyalty point events (earn/redeem/bonus)
        │   ├── DailyReward.js         # 7-day reward cycle
        │   ├── AffiliateCommission.js # Referral commission tracking
        │   ├── ResellerSetting.js     # Reseller store configuration
        │   ├── ApiKey.js              # Reseller API keys
        │   └── Admin.js               # Admin accounts
        │
        ├── db/
        │   └── seed.js                # Database seeder (demo user, bundles, orders, etc.)
        │
        ├── routes/
        │   └── index.js               # All API routes (30+ endpoints)
        │                              #   - /api/health, /api/data/*, /api/smm/*
        │                              #   - /api/orders/*, /api/wallet/*
        │                              #   - /api/loyalty/*, /api/affiliate/*
        │                              #   - /api/transactions, /api/reseller/*
        │                              #   - /api/portal/*, /api/user/*
        │                              #   - /api/admin/* (login, stats, orders, users)
        │
        └── middleware/
            └── errorHandler.js         # Global error handling middleware
```

### 3.1 Frontend Dependencies (root `package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | React DOM renderer |
| `react-router-dom` | ^6.28.0 | Client-side routing |
| `lucide-react` | ^0.460.0 | Icon library |
| `recharts` | ^2.13.3 | Chart components |
| `tailwindcss` | ^3.4.16 | Utility-first CSS (dev) |
| `@vitejs/plugin-react` | ^4.3.4 | Vite React plugin (dev) |
| `vite` | ^6.0.0 | Build tool (dev) |
| `postcss` | ^8.4.49 | CSS processing (dev) |
| `autoprefixer` | ^10.4.20 | CSS vendor prefixes (dev) |

### 3.2 Backend Dependencies (`server/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.18.2 | Web application framework |
| `sequelize` | ^6.35.0 | ORM for database operations |
| `sqlite3` | ^5.1.6 | SQLite database driver |
| `cors` | ^2.8.5 | Cross-origin resource sharing |
| `helmet` | ^7.1.0 | Security HTTP headers |
| `morgan` | ^1.10.0 | HTTP request logging |
| `express-rate-limit` | ^7.1.4 | API rate limiting |
| `dotenv` | ^16.3.1 | Environment variable management |
| `joi` | ^17.11.0 | Request validation |
| `uuid` | ^9.0.0 | Unique ID generation |
| `nodemon` | ^3.0.2 | Development auto-restart (dev) |

### 3.3 Available Scripts

**Frontend (root):**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (localhost:5173) |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |

**Backend (server/):**

| Command | Description |
|---------|-------------|
| `node src/index.js` | Start API server (localhost:5000) |
| `node src/db/seed.js` | Seed database with demo data |

---

## 4. Full-Stack Target Structure (Post-Implementation)

> This is the **target structure** after backend integration (Phase 17+).  
> The current monorepo will be reorganized into a `client/` + `server/` structure.

```
theplug-store/                         # Project root
├── client/                            # Frontend (React + Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── assets/                    # Static assets (images, fonts)
│   └── src/
│       ├── main.jsx                   # React DOM entry
│       ├── App.jsx                    # Root component with routing
│       ├── index.css                  # Global styles
│       │
│       ├── services/                  # API client layer (NEW)
│       │   ├── api.js                 # Axios instance + interceptors
│       │   ├── dataService.js         # Data bundle API calls
│       │   ├── orderService.js        # Order API calls
│       │   ├── walletService.js       # Wallet & payment API calls
│       │   ├── smmService.js          # SMM API calls
│       │   ├── loyaltyService.js      # Loyalty & rewards API calls
│       │   ├── affiliateService.js    # Affiliate API calls
│       │   ├── resellerService.js     # Reseller API calls
│       │   └── transactionService.js  # Transaction API calls
│       │
│       ├── context/
│       │   └── AppContext.jsx          # Global app state
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Sidebar.jsx
│       │   │   ├── BottomNav.jsx
│       │   │   ├── AppLayout.jsx
│       │   │   └── LandingLayout.jsx
│       │   └── ui/                    # Reusable UI components (NEW)
│       │       ├── Button.jsx
│       │       ├── Card.jsx
│       │       ├── Modal.jsx
│       │       ├── Input.jsx
│       │       ├── Badge.jsx
│       │       ├── Spinner.jsx
│       │       └── Toast.jsx
│       │
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Dashboard.jsx
│       │   ├── DataMarketplace.jsx
│       │   ├── Wallet.jsx
│       │   ├── Orders.jsx
│       │   ├── SMM.jsx
│       │   ├── SMMOrders.jsx
│       │   ├── Loyalty.jsx
│       │   ├── Affiliate.jsx
│       │   ├── Reseller.jsx
│       │   ├── ResellerAPI.jsx
│       │   └── Transactions.jsx
│       │
│       └── utils/                     # Utility functions (NEW)
│           ├── constants.js
│           ├── formatters.js
│           └── validators.js
│
├── server/                            # Backend (Node.js + Express) (NEW)
│   ├── package.json
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Environment template
│   │
│   ├── config/
│   │   ├── database.js               # Database connection (SQLite/PostgreSQL)
│   │   ├── cors.js                   # CORS configuration
│   │   └── env.js                    # Environment validation
│   │
│   ├── db/
│   │   ├── init.js                   # Database initialization & seeding
│   │   ├── migrations/               # Schema migration files
│   │   └── seeds/                    # Seed data files
│   │       ├── user.seed.js
│   │       ├── bundles.seed.js
│   │       ├── orders.seed.js
│   │       └── transactions.seed.js
│   │
│   ├── models/                        # Sequelize ORM models
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Transaction.js
│   │   ├── DataBundle.js
│   │   ├── SmmService.js
│   │   ├── SmmOrder.js
│   │   ├── LoyaltyHistory.js
│   │   ├── DailyReward.js
│   │   ├── AffiliateCommission.js
│   │   ├── ResellerSettings.js
│   │   └── ApiKey.js
│   │
│   ├── routes/
│   │   ├── index.js                  # Route aggregator
│   │   ├── data.routes.js            # /api/data/*
│   │   ├── orders.routes.js          # /api/orders/*
│   │   ├── wallet.routes.js          # /api/wallet/*
│   │   ├── smm.routes.js             # /api/smm/*
│   │   ├── loyalty.routes.js         # /api/loyalty/*
│   │   ├── affiliate.routes.js       # /api/affiliate/*
│   │   ├── transactions.routes.js    # /api/transactions/*
│   │   ├── reseller.routes.js        # /api/reseller/*
│   │   └── apiportal.routes.js       # /api/portal/*
│   │
│   ├── controllers/
│   │   ├── data.controller.js
│   │   ├── order.controller.js
│   │   ├── wallet.controller.js
│   │   ├── smm.controller.js
│   │   ├── loyalty.controller.js
│   │   ├── affiliate.controller.js
│   │   ├── transaction.controller.js
│   │   ├── reseller.controller.js
│   │   └── apiportal.controller.js
│   │
│   ├── services/                      # Business logic layer
│   │   ├── data.service.js           # Data bundle logic
│   │   ├── order.service.js          # Order processing logic
│   │   ├── payment.service.js        # Payment gateway integration
│   │   ├── smm.service.js            # SMM provider integration
│   │   ├── loyalty.service.js        # Points calculation engine
│   │   └── reseller.service.js       # Reseller markup & management
│   │
│   ├── middleware/
│   │   ├── errorHandler.js           # Global error handling
│   │   ├── validate.js               # Request validation (Joi)
│   │   └── rateLimiter.js            # API rate limiting
│   │
│   └── utils/
│       ├── helpers.js                # Utility functions
│       └── constants.js              # App-wide constants
│
├── package.json                       # Root workspace package.json
└── README.md                          # Project documentation
```

---

## 5. Backend Language & Technology Stack

### 5.1 Required Backend: Node.js with Express.js

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 20 LTS+ | JavaScript runtime environment |
| **Express.js** | 4.18+ | Web application framework |
| **Sequelize** | 6.35+ | ORM for database operations |
| **SQLite** | - | Development database (file-based, zero config) |
| **PostgreSQL** | 15+ | Production database (robust, scalable) |
| **dotenv** | 16.3+ | Environment variable management |
| **cors** | 2.8+ | Cross-origin resource sharing |
| **express-rate-limit** | 7.1+ | API rate limiting |
| **joi** | 17.11+ | Request/data validation |
| **helmet** | 7.1+ | Security HTTP headers |
| **morgan** | 1.10+ | HTTP request logging |
| **nodemon** | 3.0+ | Development auto-restart |

### 5.2 Why Node.js with Express? (Backend Language Justification)

#### JavaScript Full-Stack Consistency
- The frontend is built with React (JavaScript). Using Node.js on the backend creates a **unified JavaScript ecosystem** — one language across the entire stack.
- Shared code patterns, utility functions, and data models between frontend and backend.
- Developers proficient in React can seamlessly work on the backend without context-switching between languages.

#### Performance & Scalability
- Node.js uses a **non-blocking, event-driven I/O model** — ideal for a marketplace handling many concurrent API requests (orders, payments, data lookups).
- Express.js is lightweight and minimal, allowing precise control over API structure without overhead.
- Easy to scale horizontally with clustering or containerization.

#### Rich Ecosystem
- **npm** has the largest package registry in the world — thousands of battle-tested packages for payments, data validation, API integrations.
- Excellent libraries available for all project needs:
  - `axios` for external API calls (payment gateways, SMM providers)
  - `node-cron` for scheduled tasks (loyalty point expiration, daily rewards reset)
  - `bull` or `bullmq` for job queues (order processing, bulk SMM delivery)
  - `socket.io` for real-time order status updates

#### Database Flexibility
- **Sequelize ORM** supports both SQLite (development) and PostgreSQL (production) with zero code changes — just configuration.
- SQLite requires no installation, perfect for local development.
- PostgreSQL provides enterprise-grade reliability for production with JSON support, full-text search, and excellent performance.

#### Community & Long-Term Support
- Node.js 20 LTS is supported until April 2026.
- Express.js is the most widely adopted Node.js framework with extensive documentation.
- Largest developer community among backend JavaScript runtimes.

### 5.3 Alternative Backends Considered & Rejected

| Alternative | Why Rejected |
|------------|-------------|
| Python (Django/Flask) | Adds a second language; overkill ORM; slower cold-start |
| PHP (Laravel) | Different ecosystem; no shared code with React frontend |
| Go | Excellent performance but steeper learning curve; smaller web ecosystem |
| Java (Spring Boot) | Heavyweight; verbose; enterprise-oriented for this project scale |
| Rust | Too low-level for a marketplace CRUD app; smaller web framework ecosystem |

### 5.4 Why Sequelize ORM?

Sequelize provides a unified interface for both SQLite (development) and PostgreSQL (production). This allows developers to work locally without installing PostgreSQL while ensuring the production database uses a robust, scalable solution. Model definitions are database-agnostic.

### 5.5 Why SQLite for Development?

- Zero configuration — no installation or server process needed
- File-based database stored in the project directory
- Perfect for single-developer development and testing
- Full SQL support with most features needed for this project
- Easy to reset by deleting the database file

---

## 6. State Management Architecture

### 6.1 Global State (AppContext)

Managed via `useReducer` + `useContext` pattern:

| State Key | Type | Description |
|----------|------|-------------|
| `user` | Object | Demo user profile, wallet balance, loyalty points |
| `orders` | Array | All data + SMM orders |
| `transactions` | Array | Complete transaction log |
| `loyaltyHistory` | Array | Points earning/redemption history |
| `dailyRewards` | Array | 7-day reward claiming status |
| `smmOrders` | Array | SMM-specific orders |
| `cart` | Array | Shopping cart (future use) |
| `notifications` | Array | In-app notification queue |

### 6.2 Reducer Actions

| Action | Purpose |
|--------|---------|
| `UPDATE_WALLET` | Credit/debit wallet, create transaction record |
| `ADD_ORDER` | Place new order, deduct wallet, award loyalty points |
| `ADD_SMM_ORDER` | Place SMM order, deduct wallet |
| `REDEEM_POINTS` | Convert loyalty points to wallet balance |
| `CLAIM_DAILY_REWARD` | Claim daily loyalty bonus |
| `SAVE_RESELLER_SETTINGS` | Update reseller store configuration |
| `ADD_NOTIFICATION` | Add notification to queue |
| `CLEAR_NOTIFICATIONS` | Clear all notifications |

### 6.3 Why Context + useReducer over Redux?

For a project of this scale with no auth, React's built-in `useReducer` + `useContext` provides sufficient state management without adding Redux as a dependency. The state shape is predictable and the reducer pattern handles all mutations cleanly.

---

## 7. Non-Functional Requirements

- **Responsive Design:** Mobile-first approach, works on all screen sizes
- **Performance:** Fast loading (< 3s initial load)
- **Accessibility:** WCAG 2.1 AA compliant
- **SEO:** Optimized for public landing page
- **PWA-Ready:** Architecture supports future PWA conversion
- **Security:** Helmet.js for HTTP headers, CORS configured, rate limiting on API
- **Error Handling:** Global error boundary, user-friendly error messages
- **Logging:** HTTP request logging (Morgan), application-level logging

---

## 8. Complete Phase-by-Phase Breakdown

### Phase 1: Requirements Analysis ✅
**Status:** Complete  
**Objective:** Define project scope, features, technical requirements, and project structure.  
**Deliverables:**
- Requirements analysis document
- Feature specification
- Technical stack selection
- Project structure definition
- Phase-by-phase roadmap

---

### Phase 2: System Architecture
**Status:** Pending  
**Objective:** Define the overall system architecture and data flow.  
**Deliverables:**
- System architecture diagram
- Data flow diagrams
- API endpoint specification
- Database entity-relationship diagram
- State management architecture
- Frontend-backend interaction contracts

---

### Phase 3: UI/UX Design System
**Status:** Pending  
**Objective:** Establish a consistent design system and component library.  
**Deliverables:**
- Color palette and typography
- Spacing and layout system
- Reusable component specifications
- Design tokens (Tailwind config)
- Icon system (Lucide)
- Mobile and desktop wireframes

---

### Phase 4: Project Bootstrap
**Status:** Complete  
**Objective:** Set up the project scaffolding, tooling, and development environment.  
**Deliverables:**
- Vite + React project initialized
- Tailwind CSS configured
- React Router installed
- ESLint and Prettier configuration
- Folder structure created
- Git repository initialized

---

### Phase 5: Core Layout and Navigation
**Status:** Complete  
**Objective:** Build the application shell with navigation.  
**Deliverables:**
- `AppLayout.jsx` — Main app shell with sidebar
- `LandingLayout.jsx` — Public page shell
- `Sidebar.jsx` — Desktop navigation sidebar
- `BottomNav.jsx` — Mobile bottom navigation
- `AppContext.jsx` — Global state provider
- Route definitions in `App.jsx`

---

### Phase 6: Landing and Marketing Pages
**Status:** Complete  
**Objective:** Build the public-facing marketing page.  
**Deliverables:**
- `Landing.jsx` — Hero section, features, pricing, testimonials, footer
- Responsive design
- Call-to-action buttons routing to dashboard

---

### Phase 7: Dashboard
**Status:** Complete  
**Objective:** Build the main dashboard with key metrics and quick actions.  
**Deliverables:**
- `Dashboard.jsx` — Metrics cards, recent orders, quick actions
- Wallet balance widget
- Loyalty points widget
- Order statistics display
- Activity feed

---

### Phase 8: Data Marketplace
**Status:** Complete  
**Objective:** Build the data bundle browsing and purchasing flow.  
**Deliverables:**
- `DataMarketplace.jsx` — Network tabs, bundle cards, purchase flow
- `mockData.js` — Data bundle seed data (MTN, MTN Express, AirtelTigo, Telecel)
- Purchase confirmation
- Wallet deduction via `ADD_ORDER` action
- Loyalty points awarding

---

### Phase 9: Loyalty System
**Status:** Complete  
**Objective:** Build the loyalty points and rewards system.  
**Deliverables:**
- `Loyalty.jsx` — Points balance, history, tier display
- Daily reward claiming (7-day cycle)
- Points redemption to wallet (`REDEEM_POINTS` action)
- Tier progression visualization (Bronze → Silver → Gold → Platinum)

---

### Phase 10: Wallet Top-Up
**Status:** Complete  
**Objective:** Build the wallet management and top-up flow.  
**Deliverables:**
- `Wallet.jsx` — Balance display, top-up form, payment methods
- Quick amount presets
- Custom amount input
- Top-up history
- `UPDATE_WALLET` action integration

---

### Phase 11: Order Management
**Status:** Complete  
**Objective:** Build the order tracking and management system.  
**Deliverables:**
- `Orders.jsx` — All orders with status badges
- Order filtering (active/completed)
- Order detail expansion
- Status indicators (processing, successful, failed)
- Re-order capability

---

### Phase 12: SMM Marketplace
**Status:** Complete  
**Objective:** Build the social media marketing services marketplace.  
**Deliverables:**
- `SMM.jsx` — Service catalog with category filtering
- Quantity selector with min/max validation
- Price calculator (per 1K units)
- Multi-platform support (YouTube, Instagram, TikTok, Twitter, Facebook, Telegram, Spotify)
- `ADD_SMM_ORDER` action integration

---

### Phase 13: SMM Orders
**Status:** Complete  
**Objective:** Build dedicated SMM order tracking.  
**Deliverables:**
- `SMMOrders.jsx` — SMM-specific order list
- Delivery status tracking
- Service detail display

---

### Phase 14: Affiliate Program
**Status:** Complete  
**Objective:** Build the affiliate/referral program dashboard.  
**Deliverables:**
- `Affiliate.jsx` — Referral dashboard, commission tracking
- Referral link generation
- Multi-level commission display
- Payout history
- Share functionality

---

### Phase 15: Transaction History
**Status:** Complete  
**Objective:** Build the complete transaction history log.  
**Deliverables:**
- `Transactions.jsx` — Full transaction list with filtering
- Credit/debit visual indicators
- Transaction type filtering
- Reference number display

---

### Phase 16: Reseller Store & API Portal
**Status:** Complete  
**Objective:** Build the reseller store management and API documentation portal.  
**Deliverables:**
- `Reseller.jsx` — Store customization, pricing markup, product catalog
- `ResellerAPI.jsx` — API documentation, key management, endpoint reference
- `SAVE_RESELLER_SETTINGS` action

---

### Phase 17: Backend — Node.js/Express API Server
**Status:** ✅ Complete  
**Objective:** Build the REST API backend using Node.js with Express.  
**Backend Language:** **JavaScript (Node.js)**  
**Framework:** **Express.js**  
**Database:** **SQLite (dev) / PostgreSQL (prod)** via Sequelize ORM  

**Completed Deliverables:**
- ✅ Express server setup with middleware (CORS, Helmet, Morgan, rate limiting)
- ✅ Database schema design with 10 Sequelize ORM models
- ✅ Model associations (User → Orders, Transactions, etc.)
- ✅ Seed script with comprehensive demo data (admin, user, bundles, orders, transactions)
- ✅ 30+ RESTful API endpoints across all feature areas:
  - `GET /api/health` — API health check
  - `GET /api/data/bundles` — Fetch all data bundles (grouped by network)
  - `POST /api/data/purchase` — Purchase a data bundle
  - `GET /api/orders` — Fetch user's orders
  - `GET /api/orders/:id` — Fetch single order
  - `POST /api/smm/order` — Place SMM order
  - `GET /api/smm/services` — Fetch SMM service catalog
  - `POST /api/wallet/topup` — Top up wallet
  - `GET /api/wallet/balance` — Get wallet balance
  - `GET /api/loyalty/history` — Get loyalty point history
  - `POST /api/loyalty/redeem` — Redeem loyalty points
  - `POST /api/loyalty/daily-claim` — Claim daily reward
  - `GET /api/affiliate/commissions` — Get affiliate commissions
  - `GET /api/transactions` — Get transaction history
  - `GET /api/reseller/settings` — Get reseller settings
  - `PUT /api/reseller/settings` — Update reseller settings
  - `GET /api/portal/keys` — Get API keys
  - `POST /api/portal/keys` — Generate new API key
  - `GET /api/user/profile` — Get user profile
  - `POST /api/admin/login` — Admin login
  - `GET /api/admin/stats` — Admin dashboard stats
  - `GET /api/admin/orders` — All orders (admin)
  - `GET /api/admin/users` — All users (admin)
  - `GET /api/admin/transactions` — All transactions (admin)
- ✅ Global error handling middleware
- ✅ Environment configuration with dotenv
- ✅ API running on `http://localhost:5000`
- ✅ Database seeded with demo data (SQLite file-based)

---

### Phase 18: Frontend-Backend Integration
**Status:** Pending  
**Objective:** Connect the React frontend to the Express API backend.  
**Deliverables:**
- Axios API service layer (`src/services/`)
- Replace mock data calls with real API calls
- Loading states and error handling for API calls
- API response interceptors
- Environment-based API URL configuration
- End-to-end flow testing for all features

---

### Phase 19: Testing
**Status:** Pending  
**Objective:** Comprehensive testing of all application features.  
**Deliverables:**
- Unit tests for backend controllers and services
- Integration tests for API endpoints
- Component tests for React components
- End-to-end flow tests
- Error scenario testing
- Mobile responsiveness testing
- Cross-browser compatibility testing

---

### Phase 20: Deployment
**Status:** Pending  
**Objective:** Deploy the application to production.  
**Deliverables:**
- Frontend deployment (Vercel / Netlify)
- Backend deployment (Railway / Render / DigitalOcean)
- PostgreSQL database provisioning
- Environment variable configuration
- Domain setup and SSL
- CI/CD pipeline configuration
- Production build optimization

---

### Phase 21: Documentation & Handoff
**Status:** Pending  
**Objective:** Complete all project documentation.  
**Deliverables:**
- README.md with setup instructions
- API documentation (OpenAPI/Swagger)
- Deployment guide
- Environment variable reference
- Contributing guidelines
- Project summary and architecture overview

---

## 9. Phase Summary Table

| Phase | Name | Status | Type |
|-------|------|--------|------|
| 1 | Requirements Analysis | ✅ Complete | Planning |
| 2 | System Architecture | ⏳ Pending | Planning |
| 3 | UI/UX Design System | ⏳ Pending | Design |
| 4 | Project Bootstrap | ✅ Complete | Setup |
| 5 | Core Layout & Navigation | ✅ Complete | Frontend |
| 6 | Landing & Marketing Pages | ✅ Complete | Frontend |
| 7 | Dashboard | ✅ Complete | Frontend |
| 8 | Data Marketplace | ✅ Complete | Frontend |
| 9 | Loyalty System | ✅ Complete | Frontend |
| 10 | Wallet Top-Up | ✅ Complete | Frontend |
| 11 | Order Management | ✅ Complete | Frontend |
| 12 | SMM Marketplace | ✅ Complete | Frontend |
| 13 | SMM Orders | ✅ Complete | Frontend |
| 14 | Affiliate Program | ✅ Complete | Frontend |
| 15 | Transaction History | ✅ Complete | Frontend |
| 16 | Reseller Store & API Portal | ✅ Complete | Frontend |
| 17 | Backend API (Node.js/Express) | ✅ Complete | Backend |
| 18 | Frontend-Backend Integration | ⏳ Pending | Integration |
| 19 | Testing | ⏳ Pending | Quality |
| 20 | Deployment | ⏳ Pending | DevOps |
| 21 | Documentation & Handoff | ⏳ Pending | Documentation |

---

## 10. Key Design Decisions

### 10.1 Why No Authentication?
This project is designed as a **demo/prototype** marketplace. Removing authentication simplifies the development flow, eliminates security complexity, and allows immediate access to all features. Authentication can be added in a future iteration when moving to production.

### 10.2 Why Context + useReducer over Redux?
For a project of this scale with no auth, React's built-in `useReducer` + `useContext` provides sufficient state management without adding Redux as a dependency. The state shape is predictable and the reducer pattern handles all mutations cleanly.

### 10.3 Why Sequelize ORM?
Sequelize provides a unified interface for both SQLite (development) and PostgreSQL (production). This allows developers to work locally without installing PostgreSQL while ensuring the production database uses a robust, scalable solution. Model definitions are database-agnostic.

### 10.4 Why SQLite for Development?
- Zero configuration — no installation or server process needed
- File-based database stored in the project directory
- Perfect for single-developer development and testing
- Full SQL support with most features needed for this project
- Easy to reset by deleting the database file

### 10.5 Why Multi-Page Architecture (Separate `admin.html`)?
- **Complete isolation:** The admin panel has its own React root (`#admin-root`), router, and context — zero coupling with the customer app.
- **Independent deployment:** Admin and customer apps can be deployed, cached, and updated independently.
- **Security:** Admin code (login, dashboard, user management) is never bundled into the customer-facing app. Users navigating to `index.html` never load admin JavaScript.
- **Cleaner codebase:** `App.jsx` only handles customer routes; `admin/main.jsx` only handles admin routes. No route conflicts or auth guard complexity.
- **Vite multi-page support:** Vite natively supports multiple HTML entry points via `rollupOptions.input`, requiring no extra tooling.

---

## 11. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Scope creep from adding auth later | Medium | Architecture designed to support future auth addition |
| Mock data divergence from real API | Medium | Define API contracts early in Phase 2 |
| SQLite limitations in concurrent access | Low | Development only; PostgreSQL for production |
| Payment gateway integration complexity | High | Start with simulated payments; integrate real gateways incrementally |
| SMM provider API reliability | Medium | Implement retry logic, fallback providers, and clear error messages |

---

*Document last updated: May 2026*  
*Phase 17 Status: ✅ Complete — Backend API Server Built & Running*  
*Next: Phase 18 — Frontend-Backend Integration*
