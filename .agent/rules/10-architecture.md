# Tita Vigo - Architecture Rules

## 📁 Project Structure

```
tita-vigo3/
├── apps/
│   ├── store/              # Next.js - Landing + Catálogo (público)
│   │   ├── app/
│   │   │   ├── page.tsx        # Home
│   │   │   ├── products/
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── layout.tsx
│   │   └── components/
│   │       ├── ui/             # Botones, Cards, Input
│   │       ├── products/       # ProductCard, ProductGrid
│   │       └── layout/         # Header, Footer, Nav
│   │
│   └── admin/              # Next.js - Panel de administración
│       ├── app/
│       │   ├── login/page.tsx
│       │   ├── dashboard/page.tsx
│       │   ├── products/
│       │   └── categories/
│       └── components/
│
├── backend/                # NestJS API
│   ├── src/
│   │   ├── auth/           # Login admin, JWT
│   │   ├── products/       # CRUD productos
│   │   ├── categories/     # CRUD categorías
│   │   ├── upload/         # Cloudinary integration
│   │   └── common/         # Guards, decorators, pipes
│   └── prisma/
│       └── schema.prisma
│
├── packages/
│   └── shared/             # Types compartidos (opcional)
│
├── docs/
│   └── mockups/            # Imágenes de diseño
│
└── .agent/                 # Config del agente
```

---

## 🔧 Backend Rules (NestJS)

### Module Structure
```
src/[module]/
├── [module].module.ts
├── [module].controller.ts
├── [module].service.ts
├── dto/
│   ├── create-[module].dto.ts
│   └── update-[module].dto.ts
└── entities/
    └── [module].entity.ts (si se necesita fuera de Prisma)
```

### Naming Conventions
| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Archivos | kebab-case | `create-product.dto.ts` |
| Clases | PascalCase | `CreateProductDto` |
| Variables | camelCase | `productService` |
| Constantes | UPPER_SNAKE | `MAX_FILE_SIZE` |
| DB Tables | PascalCase (Prisma) | `Product`, `AdminUser` |

### API Design
- Prefijo: `/api`
- Versioning: No requerido para MVP
- Response format: `{ data: ... }` para éxito
- Error format: `{ error: { code, message, details? } }`

---

## 🎨 Frontend Rules (Next.js)

### Component Naming
| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `ProductCard.tsx` |
| Hooks | useCamelCase | `useProducts.ts` |
| Utils | camelCase | `formatPrice.ts` |
| Pages | kebab-case folders | `products/[slug]/page.tsx` |

### Component Template
```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}
```

### Styling
- Tailwind CSS para todo
- Colores custom en `tailwind.config.js`:
  ```js
  colors: {
    primary: {
      DEFAULT: '#E91E8C',
      dark: '#C4186F',
    }
  }
  ```

---

## 🗃️ Database Rules (Prisma)

### Schema Conventions
- IDs: `String @id @default(uuid())`
- Timestamps: Siempre `createdAt`, `updatedAt`
- Soft delete: `deletedAt DateTime?` cuando sea necesario
- Relaciones: Cascade delete para imágenes de producto

### Migrations
```bash
# Crear migración
npx prisma migrate dev --name <nombre_descriptivo>

# Aplicar en producción
npx prisma migrate deploy
```

---

## 🔐 Auth Rules

### Admin Only
- Solo usuarios admin requieren autenticación
- Store es 100% público
- JWT con expiración de 7 días
- Refresh token: No requerido para MVP

### Protected Routes
```typescript
@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class AdminProductsController { ... }
```

---

## 📸 Image Upload Rules

### Cloudinary
- Folder: `tita-vigo/products`
- Max size: 5MB
- Formats: jpg, png, webp
- Transformations: Auto-optimize, max width 1200px
