import { PrismaClient, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.adminUser.upsert({
        where: { email: 'admin@titavigo.pe' },
        update: {},
        create: {
            email: 'admin@titavigo.pe',
            password: hashedPassword,
            name: 'Admin',
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // Create Categories
    const categories = [
        { name: 'Anillos', slug: 'anillos' },
        { name: 'Collares', slug: 'collares' },
        { name: 'Aretes', slug: 'aretes' },
        { name: 'Pulseras', slug: 'pulseras' },
    ];

    const createdCategories: Record<string, string> = {};

    for (const cat of categories) {
        const category = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: { name: cat.name },
            create: cat,
        });
        createdCategories[cat.slug] = category.id;
        console.log(`✅ Category: ${category.name}`);
    }

    // Create Products
    const products = [
        {
            name: 'Anillo Orquídea Plata 950',
            description: 'Elegante anillo de plata ley 950 con diseño de orquídea. Hecho a mano en Perú. Ideal para cualquier ocasión especial.',
            price: 120.00,
            slug: 'anillo-orquidea-plata-950',
            stock: 5,
            categorySlug: 'anillos',
            images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600'],
        },
        {
            name: 'Anillo Erantena Plata',
            description: 'Anillo minimalista de plata 950 con piedra central. Diseño elegante y moderno.',
            price: 120.00,
            slug: 'anillo-erantena-plata',
            stock: 3,
            categorySlug: 'anillos',
            images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600'],
        },
        {
            name: 'Anillo Plata 950 Minimalista',
            description: 'Anillo de plata ley 950 con un diseño minimalista, perfecto para uso diario.',
            price: 89.00,
            slug: 'anillo-plata-950',
            stock: 8,
            categorySlug: 'anillos',
            images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600'],
        },
        {
            name: 'Collar Orquídea Plata',
            description: 'Collar de plata con dije de orquídea. Cadena de 45cm ajustable.',
            price: 150.00,
            slug: 'collar-orquidea-plata',
            stock: 0,
            isPreOrder: true,
            categorySlug: 'collares',
            images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'],
        },
        {
            name: 'Collar Cadena Plata 950',
            description: 'Cadena de plata 950 de 50cm. Estilo clásico y elegante.',
            price: 95.00,
            slug: 'collar-cadena-plata',
            stock: 12,
            categorySlug: 'collares',
            images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600'],
        },
        {
            name: 'Aretes Flor Plata',
            description: 'Aretes de plata con diseño floral. Livianos y elegantes.',
            price: 75.00,
            slug: 'aretes-flor-plata',
            stock: 6,
            categorySlug: 'aretes',
            images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600'],
        },
        {
            name: 'Aretes Gota Perla',
            description: 'Aretes de plata con perla cultivada en forma de gota.',
            price: 110.00,
            slug: 'aretes-gota-perla',
            stock: 0,
            isPreOrder: true,
            categorySlug: 'aretes',
            images: ['https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600'],
        },
        {
            name: 'Pulsera Eslabones Plata',
            description: 'Pulsera de eslabones en plata 950. Largo ajustable de 17-20cm.',
            price: 135.00,
            slug: 'pulsera-eslabones-plata',
            stock: 4,
            categorySlug: 'pulseras',
            images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600'],
        },
    ];

    for (const prod of products) {
        const { images, categorySlug, ...productData } = prod;

        const product = await prisma.product.upsert({
            where: { slug: prod.slug },
            update: {
                ...productData,
                categoryId: createdCategories[categorySlug],
                status: ProductStatus.ACTIVE,
            },
            create: {
                ...productData,
                categoryId: createdCategories[categorySlug],
                status: ProductStatus.ACTIVE,
                isPreOrder: prod.isPreOrder || false,
            },
        });

        // Create images
        for (let i = 0; i < images.length; i++) {
            await prisma.productImage.upsert({
                where: { id: `${product.id}-img-${i}` },
                update: { url: images[i], order: i },
                create: {
                    id: `${product.id}-img-${i}`,
                    url: images[i],
                    order: i,
                    productId: product.id,
                },
            });
        }

        console.log(`✅ Product: ${product.name}`);
    }

    console.log('🌱 Seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
