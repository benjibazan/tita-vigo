import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import slugify from 'slugify';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(query: ProductQueryDto) {
        const { page = 1, limit = 20, categoryId, status, inStock, search } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.ProductWhereInput = {};

        // Only show active products on public queries
        if (status) {
            where.status = status;
        } else {
            where.status = 'ACTIVE';
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (inStock !== undefined) {
            where.stock = inStock ? { gt: 0 } : { equals: 0 };
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    category: true,
                    images: {
                        orderBy: { order: 'asc' },
                        take: 1,
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);

        return {
            data: products,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findBySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                images: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        return { data: product };
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                images: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        return { data: product };
    }

    async create(createProductDto: CreateProductDto) {
        const slug = slugify(createProductDto.name, { lower: true, strict: true });

        // Ensure unique slug
        let finalSlug = slug;
        let counter = 1;
        while (await this.prisma.product.findUnique({ where: { slug: finalSlug } })) {
            finalSlug = `${slug}-${counter}`;
            counter++;
        }

        const { imageUrls, ...data } = createProductDto;

        const product = await this.prisma.product.create({
            data: {
                ...data,
                slug: finalSlug,
                images: imageUrls?.length
                    ? {
                        create: imageUrls.map((url, index) => ({
                            url,
                            order: index,
                        })),
                    }
                    : undefined,
            },
            include: {
                category: true,
                images: true,
            },
        });

        return { data: product };
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const exists = await this.prisma.product.findUnique({ where: { id } });

        if (!exists) {
            throw new NotFoundException('Producto no encontrado');
        }

        const { imageUrls, ...data } = updateProductDto;

        // If name changed, update slug
        if (data.name && data.name !== exists.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }

        const product = await this.prisma.product.update({
            where: { id },
            data,
            include: {
                category: true,
                images: true,
            },
        });

        return { data: product };
    }

    async remove(id: string) {
        const exists = await this.prisma.product.findUnique({ where: { id } });

        if (!exists) {
            throw new NotFoundException('Producto no encontrado');
        }

        // Soft delete - set status to ARCHIVED
        await this.prisma.product.update({
            where: { id },
            data: { status: 'ARCHIVED' },
        });

        return { message: 'Producto archivado' };
    }

    async addImage(productId: string, url: string, publicId?: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true },
        });

        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        const order = product.images.length;

        const image = await this.prisma.productImage.create({
            data: {
                url,
                publicId,
                order,
                productId,
            },
        });

        return { data: image };
    }

    async removeImage(imageId: string) {
        await this.prisma.productImage.delete({
            where: { id: imageId },
        });

        return { message: 'Imagen eliminada' };
    }
}
