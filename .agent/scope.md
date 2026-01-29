# Scope del Proyecto - Tita Vigo

## 🎯 Objetivo MVP

Lanzar un e-commerce funcional que permita:
1. Mostrar productos según inventario real
2. Recibir pedidos vía WhatsApp
3. Gestionar inventario y pedidos desde admin panel

---

## ✅ Incluido (Must Have) - MVP

### Landing/Store
- [ ] Hero section con branding Tita Vigo
- [ ] Catálogo de productos con filtros (categoría, precio)
- [ ] Página de detalle de producto
- [ ] Indicador de disponibilidad (en stock / contra-demanda)
- [ ] Botón "Comprar por WhatsApp" (abre chat con producto seleccionado)
- [ ] Diseño mobile-first (360-430px base)
- [ ] SEO básico

### Admin Panel
- [ ] Login admin (JWT)
- [ ] CRUD de productos (nombre, descripción, precio, fotos, stock, categoría)
- [ ] Gestión de categorías
- [ ] Lista de pedidos (manual tracking)
- [ ] Dashboard básico (productos activos, pedidos del día)

### WhatsApp Integration
- [ ] Botón que abre WhatsApp con mensaje pre-armado
- [ ] Mensaje incluye: producto, precio, link de referencia

### Pagos
- [ ] Instrucciones de pago (Yape, Plin, transferencia)
- [ ] Botón para contactar y coordinar pago

---

## 🟡 Considerado (Nice to Have) - Post-MVP

### Store Enhancements
- [ ] Carrito de compras en la web
- [ ] Checkout con Mercado Pago / Yape QR
- [ ] Wishlist / Favoritos
- [ ] Newsletter signup
- [ ] Notificaciones de stock (avisame cuando llegue)

### Admin Enhancements
- [ ] Importador de productos desde AliExpress (scraper)
- [ ] Gestión de clientes (CRM básico)
- [ ] Reportes de ventas
- [ ] Multi-usuario admin (roles)

### Automatización
- [ ] Bot de WhatsApp para respuestas automáticas
- [ ] Tracking de envíos integrado
- [ ] Seguimiento post-venta automático

---

## ❌ Explícitamente Excluido (No-Go)

| Feature | Razón |
|---------|-------|
| App móvil nativa | Web responsive es suficiente para MVP |
| Multi-idioma | Solo Perú por ahora |
| Marketplace multi-vendedor | Single brand |
| Sistema de reviews | Complejidad innecesaria para MVP |
| Chat en vivo | WhatsApp cumple esta función |
| Programa de afiliados | Fase futura |

---

## 📏 Métricas de Éxito MVP

| Métrica | Target |
|---------|--------|
| Tiempo a primer pedido real | < 2 semanas post-launch |
| Productos cargados | Mínimo 20 |
| Conversión visita → WhatsApp | > 5% |
| Load time mobile (3G) | < 3 segundos |

---

## 📅 Timeline Estimado

| Fase | Duración |
|------|----------|
| Design (vistas + specs) | 2-3 días |
| Backend + Admin MVP | 3-4 días |
| Frontend/Store | 3-4 días |
| Testing + Polish | 2 días |
| **Total MVP** | **~2 semanas** |
