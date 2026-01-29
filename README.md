# Tita Vigo - E-commerce de Joyas

> E-commerce de joyas para el mercado peruano. Mobile-first, WhatsApp-driven.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Setup database
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL
npx prisma migrate dev

# Start all services
npm run dev:backend  # Terminal 1
npm run dev:store    # Terminal 2
npm run dev:admin    # Terminal 3
```

## 📁 Project Structure

```
tita-vigo3/
├── apps/
│   ├── store/          # Public landing + catalog
│   └── admin/          # Admin panel
├── backend/            # NestJS API
├── packages/           # Shared code
└── docs/mockups/       # Design references
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: NestJS + Prisma + PostgreSQL
- **Deploy**: Railway

## 📖 Documentation

See [AGENT.md](./AGENT.md) for development guidelines.
