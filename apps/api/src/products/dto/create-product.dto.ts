import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsString()
  sku: string;

  @IsString()
  size: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  mrp: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  barcode?: string;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  categoryId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants: CreateVariantDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}