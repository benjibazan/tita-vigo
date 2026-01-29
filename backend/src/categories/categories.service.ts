import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const categories = await this.prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });

        return { data: categories };
    }

    async findOne(id: string) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                products: {
                    where: { status: 'ACTIVE' },
                    take: 10,
                },
            },
        });

        if (!category) {
            throw new NotFoundException('Categoría no encontrada');
        }

        return { data: category };
    }

    async create(createCategoryDto: CreateCategoryDto) {
        const slug = slugify(createCategoryDto.name, { lower: true, strict: true });

        const category = await this.prisma.category.create({
            data: {
                ...createCategoryDto,
                slug,
            },
        });

        return { data: category };
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const exists = await this.prisma.category.findUnique({ where: { id } });

        if (!exists) {
            throw new NotFoundException('Categoría no encontrada');
        }

        const data: Record<string, unknown> = { ...updateCategoryDto };

        if (updateCategoryDto.name) {
            data.slug = slugify(updateCategoryDto.name, { lower: true, strict: true });
        }

        const category = await this.prisma.category.update({
            where: { id },
            data,
        });

        return { data: category };
    }

    async remove(id: string) {
        const exists = await this.prisma.category.findUnique({ where: { id } });

        if (!exists) {
            throw new NotFoundException('Categoría no encontrada');
        }

        await this.prisma.category.delete({ where: { id } });

        return { message: 'Categoría eliminada' };
    }
}
