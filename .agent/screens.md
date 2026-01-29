# Tita Vigo - Diseño de Pantallas

> **Estilo Visual**: Light Mode, Minimalista con acentos Magenta (#E91E8C).

---

## 📱 App Store (Mobile-First)

### 1. Home / Landing
- **Header**:
  - Left: Logo Tita Vigo
  - Right: Icono WhatsApp (flotante o en header)
- **Hero Section**:
  - Slider o Banner grande con "Joyas que cuentan tu historia".
  - CTA: "Ver Colección".
- **Categorías Destacadas (Stories style)**:
  - Círculos horizontales: Anillos, Collares, Aretes, Pulseras.
- **Productos Destacados (Masonry Grid)**:
  - Tarjetas de producto vertical.
  - Foto producto (aspect-ratio 3:4 o 1:1).
  - Nombre (ej: "Anillo Plata 950").
  - Precio (ej: "S/. 89.00").
  - Badge opcional: "Nuevo", "Último en stock".

### 2. Catálogo / Search
- **Filtros (Sticky Top)**:
  - Pills horizontales: "Todos", "Stock Inmediato", "A Pedido", "Menos de S/50".
- **Grid de Productos**:
  - 2 columnas en móvil.
  - Infinite scroll o paginación.
  - Botón rápido "Ver" en cada tarjeta.

### 3. Detalle de Producto
- **Galería**: Carousel de imágenes (swipeable).
- **Info Core**:
  - Título (H1).
  - Precio (grande, color acento).
  - Estado: "En Stock" (Verde) o "Disponible en 7 días" (Naranja).
- **Descripción**: Texto expandible.
- **CTA Principal (Sticky Bottom)**:
  - Botón ancho total: "Comprar ahora por WhatsApp 💬".
  - Al hacer click, abre API WhatsApp con mensaje pre-cargado.
- **Relacionados**: "También te puede gustar" (horizontal scroll).

---

## 🖥️ Admin Panel (Desktop)

### 4. Login Admin
- **Layout**: Centrado simple.
- **Form**: Email, Password.
- **Feedback**: Mensajes de error claros.

### 5. Dashboard
- **Stats Cards**:
  - Total Productos (Activos/Total).
  - Productos con Stock Bajo.
  - Clics en WhatsApp (si se trackea).
- **Quick Actions**:
  - "Nuevo Producto".
  - "Ver Catálogo".

### 6. Gestión de Productos (CRUD)
- **Lista**: Tabla con columnas (Imagen, Nombre, Precio, Stock, Estado, Acciones).
- **Editor**:
  - Nombre, Descripción, Precio.
  - **Imágenes**: Drag & drop zone (integración Cloudinary).
  - **Inventario**: Toggle "En Stock" vs "A Pedido".
  - **Categoría**: Select dropdown.
