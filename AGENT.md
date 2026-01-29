# AGENT.md — Tita Vigo E-commerce

> E-commerce de joyas para el mercado peruano. Mobile-first, WhatsApp-driven.

---

## 🎯 Project Overview

**Tita Vigo** es un e-commerce de joyas con modelo híbrido (stock + contra-demanda).
El cliente contacta vía WhatsApp para completar la compra.

### Tech Stack
- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: NestJS + Prisma + PostgreSQL
- **Deploy**: Railway
- **Images**: Cloudinary

---

## 📁 Project Structure

```
tita-vigo3/
├── apps/
│   ├── store/          # Landing + Catálogo (público)
│   └── admin/          # Panel de administración
├── backend/            # API NestJS
├── packages/shared/    # Types compartidos
├── docs/mockups/       # Diseños de referencia
└── .agent/             # Configuración del agente
```

---

## 📋 Agent Rules

| Rule File | Purpose |
|-----------|---------|
| [00-project-context.md](.agent/rules/00-project-context.md) | Stack, entidades, contexto de negocio |
| [10-architecture.md](.agent/rules/10-architecture.md) | Estructura de código, naming, patterns |
| [20-quality-dod.md](.agent/rules/20-quality-dod.md) | Definition of Done, quality gates |

---

## 🎨 Design References

Ver mockups en `docs/mockups/`:
- Home Mobile
- Catálogo Mobile
- Detalle Producto
- Admin Dashboard
- Admin Products
- Admin Login

---

## ⚡ Quick Commands

```bash
# Backend
cd backend && npm run start:dev

# Store (public)
cd apps/store && npm run dev

# Admin Panel
cd apps/admin && npm run dev

# Prisma
cd backend && npx prisma studio
```

---

## 🔗 Key Files

| Purpose | Path |
|---------|------|
| Prisma Schema | `backend/prisma/schema.prisma` |
| Tailwind Config | `apps/store/tailwind.config.js` |
| API Routes | `backend/src/` |

---

*Last updated: 2026-01-27*
