import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsUUID,
    IsArray,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
    @Type(() => Number)
    price: number;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    stock?: number;

    @IsBoolean()
    @IsOptional()
    isPreOrder?: boolean;

    @IsUUID()
    @IsNotEmpty({ message: 'La categoría es requerida' })
    categoryId: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    imageUrls?: string[];
}
