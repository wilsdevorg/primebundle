# ThePlug Store — Backend API Server

## Overview

ThePlug Store backend is a **Node.js + Express.js** REST API server that powers the digital marketplace. It uses **Sequelize ORM** with **SQLite** (development) for the database.

**Base URL:** `http://localhost:5000/api`

---

## Quick Start

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Seed the Database

This creates all tables and populates them with demo data:

```bash
node src/db/seed.js
```

You should see:
```
📦 Database synced (tables recreated)
✅ Admin seeded
✅ Demo user seeded
✅ Data bundles seeded
...
🎉 Database seeded successfully!
👤 Admin: admin@theplug.store / admin123
👤 Demo User: demo@theplug.store
```

### Step 3: Start the Server

```bash
node src/index.js
```

You should see:
```
📦 Database synced
🚀 ThePlug Store API running on http://localhost:5000
📡 API endpoints: http://localhost:5000/api/health
🌍 Environment: development
```

### Step 4: Verify It Works

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "ThePlug Store API is running",
  "timestamp": "2026-05-21T03:00:00.000Z"
}
```

---

## API Key Setup — Step by Step Guide

API keys allow resellers and external applications to interact with ThePlug Store API programmatically. Follow these steps to generate and use an API key.

### Step 1: Understand API Key Authentication

API keys are used to authenticate requests to the API. Each key is:
- **Unique** — tied to a specific user account
- **Revocable** — can be deactivated without deleting the user
- **Tracked** — request count and last used timestamp are recorded

API keys are passed in the request header:
```
x-api-key: tpk_your_api_key_here
```

### Step 2: Generate an API Key

**Via the API endpoint:**

```bash
curl -X POST http://localhost:5000/api/portal/keys \
  -H "Content-Type: application/json" \
  -d '{"name": "My Reseller Key"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "name": "My Reseller Key",
    "isActive": true,
    "lastUsed": null,
    "requestCount": 0
  }
}
```

> ⚠️ **Save your API key immediately!** It won't be shown again in full after creation.

### Step 3: List Your API Keys

```bash
curl http://localhost:5000/api/portal/keys
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "key": "tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      "name": "My Reseller Key",
      "isActive": true,
      "lastUsed": null,
      "requestCount": 0
    }
  ]
}
```

### Step 4: Use Your API Key in Requests

Include the API key in the `x-api-key` header with every request:

#### Fetch Data Bundles
```bash
curl http://localhost:5000/api/data/bundles \
  -H "x-api-key: tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

#### Purchase a Data Bundle
```bash
curl -X POST http://localhost:5000/api/data/purchase \
  -H "Content-Type: application/json" \
  -H "x-api-key: tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
  -d '{
    "bundleId": "mtn-3",
    "recipient": "0241234567"
  }'
```

#### Place an SMM Order
```bash
curl -X POST http://localhost:5000/api/smm/order \
  -H "Content-Type: application/json" \
  -H "x-api-key: tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
  -d '{
    "serviceId": "smm-4",
    "link": "https://instagram.com/example",
    "quantity": 1000
  }'
```

#### Check Wallet Balance
```bash
curl http://localhost:5000/api/wallet/balance \
  -H "x-api-key: tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

#### Top Up Wallet
```bash
curl -X POST http://localhost:5000/api/wallet/topup \
  -H "Content-Type: application/json" \
  -H "x-api-key: tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
  -d '{
    "amount": 50,
    "method": "MTN MoMo"
  }'
```

#### Get Order History
```bash
curl http://localhost:5000/api/orders \
  -H "x-api-key: tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

### Step 5: Integrate API Key in Your Application

#### JavaScript (fetch)
```javascript
const API_BASE = 'http://localhost:5000/api';
const API_KEY = 'tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

// Fetch all data bundles
const response = await fetch(`${API_BASE}/data/bundles`, {
  headers: {
    'x-api-key': API_KEY
  }
});
const data = await response.json();
console.log(data);
```

#### JavaScript (axios)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'x-api-key': 'tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
  }
});

// Purchase data bundle
const result = await api.post('/data/purchase', {
  bundleId: 'mtn-3',
  recipient: '0241234567'
});
```

#### Python (requests)
```python
import requests

API_BASE = 'http://localhost:5000/api'
API_KEY = 'tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
headers = {'x-api-key': API_KEY}

# Get data bundles
response = requests.get(f'{API_BASE}/data/bundles', headers=headers)
bundles = response.json()
print(bundles)

# Purchase data
response = requests.post(f'{API_BASE}/data/purchase', 
    headers={**headers, 'Content-Type': 'application/json'},
    json={'bundleId': 'mtn-3', 'recipient': '0241234567'}
)
print(response.json())
```

#### PHP (cURL)
```php
<?php
$apiBase = 'http://localhost:5000/api';
$apiKey = 'tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

// Fetch data bundles
$ch = curl_init("$apiBase/data/bundles");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["x-api-key: $apiKey"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
?>
```

### Step 6: Build a Reseller Storefront (Example)

Here's a complete example of building a simple reseller storefront using the API:

```javascript
// reseller-store.js
const API_BASE = 'http://localhost:5000/api';
const API_KEY = 'tpk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
};

async function getBundles() {
  const res = await fetch(`${API_BASE}/data/bundles`, { headers });
  return res.json();
}

async function purchaseBundle(bundleId, phone) {
  const res = await fetch(`${API_BASE}/data/purchase`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ bundleId, recipient: phone })
  });
  return res.json();
}

async function checkBalance() {
  const res = await fetch(`${API_BASE}/wallet/balance`, { headers });
  return res.json();
}

// Usage
(async () => {
  // 1. Check balance
  const balance = await checkBalance();
  console.log('Wallet Balance: ₵' + balance.data.balance);

  // 2. Get available bundles
  const bundles = await getBundles();
  console.log('Available Networks:', Object.keys(bundles.data));

  // 3. Purchase a bundle
  const result = await purchaseBundle('mtn-1', '0241234567');
  if (result.success) {
    console.log('Order ID:', result.data.orderId);
    console.log('Amount: ₵' + result.data.amount);
    console.log('New Balance: ₵' + result.data.newBalance);
  }
})();
```

---

## Complete API Endpoints Reference

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health check |

### Data Bundles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data/bundles` | Get all bundles (grouped by network) |
| POST | `/api/data/purchase` | Purchase a data bundle |

### SMM Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/smm/services` | Get all SMM services |
| POST | `/api/smm/order` | Place an SMM order |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/:id` | Get single order details |

### Wallet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet/balance` | Get wallet balance |
| POST | `/api/wallet/topup` | Top up wallet |

### Loyalty
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/loyalty/history` | Get loyalty point history |
| POST | `/api/loyalty/redeem` | Redeem points to wallet |
| POST | `/api/loyalty/daily-claim` | Claim daily reward |

### Affiliate
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/affiliate/commissions` | Get affiliate commissions |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get transaction history |

### Reseller
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reseller/settings` | Get reseller settings |
| PUT | `/api/reseller/settings` | Update reseller settings |

### API Portal (Key Management)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portal/keys` | List API keys |
| POST | `/api/portal/keys` | Generate new API key |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/orders` | All orders |
| GET | `/api/admin/users` | All users |
| GET | `/api/admin/transactions` | All transactions |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `DB_PATH` | `./database.sqlite` | SQLite database file path |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX` | `100` | Max requests per window |

---

## Demo Credentials

| Account | Email | Password |
|---------|-------|----------|
| **Admin** | admin@theplug.store | admin123 |
| **Demo User** | demo@theplug.store | — (no auth required) |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **Sequelize** | ORM (Object-Relational Mapping) |
| **SQLite** | Development database |
| **PostgreSQL** | Production database (via Sequelize config change) |
| **Helmet** | Security headers |
| **CORS** | Cross-origin support |
| **Morgan** | Request logging |
| **express-rate-limit** | API rate limiting |
| **Joi** | Request validation |
| **uuid** | Unique key generation |