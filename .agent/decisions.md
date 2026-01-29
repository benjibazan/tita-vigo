# Decisiones de Arquitectura - Tita Vigo

## Stack Técnico

| Capa | Decisión | Alternativas | Razón |
|------|----------|--------------|-------|
| **Frontend** | Next.js 14 (App Router) | Vite, Astro | SSR para SEO, experiencia previa |
| **Styling** | Tailwind CSS + custom components | Shadcn, CSS Modules | Velocidad de desarrollo, consistencia |
| **Backend** | NestJS (monolito modular) | Express, Fastify | Estructura clara, TypeScript nativo |
| **Database** | PostgreSQL | MySQL, MongoDB | Relacional, gratis en Railway |
| **ORM** | Prisma | TypeORM, Drizzle | DX excelente, migraciones simples |
| **Auth** | JWT + bcrypt | NextAuth, Clerk | Simple, sin dependencias externas |
| **Deploy** | Railway | Vercel + Supabase | Todo en un lugar, simple |
| **Storage** | Cloudinary o Railway Volume | S3, Uploadthing | Gratis tier suficiente |

---

## Decisiones de Producto

| Decisión | Opción Elegida | Razón |
|----------|----------------|-------|
| Modelo de venta | Híbrido (stock + contra-demanda) | Flexibilidad, menor inversión inicial |
| Canal de contacto | WhatsApp (link directo) | Familiar para usuarios peruanos |
| Pagos MVP | Solo instrucciones manuales | Rápido de implementar, sin comisiones |
| Pagos Post-MVP | Yape QR + Mercado Pago | Los más usados en Perú |
| Idioma | Solo español | Target solo Perú |
| Moneda | PEN (Soles) | Mercado local |
| Envíos | Olva Courier / Shalom | Cobertura nacional, económico |

---

## Arquitectura de Proyecto

```
tita-vigo3/
├── apps/
│   ├── store/          # Next.js - Landing + Catálogo
│   └── admin/          # Next.js - Panel de administración
├── backend/            # NestJS - API
│   ├── src/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   └── uploads/
│   └── prisma/
└── packages/
    └── shared/         # Types compartidos
```

---

## Decisiones de UX

| Aspecto | Decisión | Razón |
|---------|----------|-------|
| Mobile-first | Sí, 360px base | 80%+ tráfico será móvil |
| Sin carrito MVP | Solo WhatsApp directo | Reduce fricción, más personal |
| Fotos producto | Mínimo 3 por producto | Joyas requieren múltiples ángulos |
| Precios visibles | Siempre mostrar precio | Transparencia, no ahuyenta |

---

## Integraciones Externas

| Servicio | Propósito | Prioridad |
|----------|-----------|-----------|
| WhatsApp (wa.me links) | Contacto con cliente | MVP |
| Cloudinary | Almacenamiento de imágenes | MVP |
| Google Analytics | Tracking básico | MVP |
| Mercado Pago | Pagos online | Post-MVP |
| AliExpress (scraping) | Importar productos | Post-MVP |

---

## Riesgos Identificados

| Riesgo | Mitigación |
|--------|------------|
| Baja conversión WhatsApp | Mensaje pre-armado optimizado, CTA claros |
| Fotos de baja calidad | Guía de fotografía, usar fotos de proveedor |
| Demora en contra-demanda | Tiempos claros en UI, comunicación proactiva |
| Competencia de precio | Diferenciarse por atención, no solo precio |

---

## Decisiones Pendientes

- [ ] Dominio final (titavigo.pe / titavigo.com)
- [ ] Hostname en Railway
- [ ] Cuenta de WhatsApp Business
- [ ] Courier preferido para envíos

---

*Última actualización: 2026-01-27*
