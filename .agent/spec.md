# Especificación Técnica - Tita Vigo

## 1. Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide React Icons.
- **Backend**: NestJS (Monorepo architecture).
- **Database**: PostgreSQL (Railway).
- **ORM**: Prisma.
- **Auth**: JWT (Admin), No auth (Cliente).
- **Images**: Cloudinary (con `multer` en NestJS).

## 2. Database Schema (Draft)

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String?  @db.Text
  price       Decimal  @db.Decimal(10, 2)
  slug        String   @unique
  sku         String?  
  stock       Int      @default(0)
  status      ProductStatus @default(ACTIVE)
  isPreOrder  Boolean  @default(false)
  
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  
  images      ProductImage[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  products    Product[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model ProductImage {
  id        String   @id @default(uuid())
  url       String
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model AdminUser {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed
  name      String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum ProductStatus {
  ACTIVE
  DRAFT
  ARCHIVED
}
```

## 3. API Endpoints

### Public (Store)
- `GET /api/products` - Listar con filtros/paginación.
- `GET /api/products/:slug` - Detalle producto.
- `GET /api/categories` - Listar categorías.

### Admin (Protected)
- `POST /api/auth/login` - Login admin.
- `POST /api/products` - Crear producto.
- `PATCH /api/products/:id` - Editar producto.
- `DELETE /api/products/:id` - Borrar/Archivar.
- `POST /api/upload` - Subir imagenes (multipart/form-data).

## 4. Estructura de Proyecto

```
/apps
  /store (Next.js)
    /app
      /page.tsx (Home)
      /products/[slug]/page.tsx (Detail)
      /admin/ (Protected Routes)
    /components
      /ui (Button, Card, Input)
      /products (ProductCard, ProductGrid)
      /layout (Header, Footer)

/backend
  /src
    /products
    /categories
    /auth
    /upload
```
