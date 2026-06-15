import {
  IsString,
  IsArray,
  IsOptional,
  IsInt,
  Min,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePOSSaleItemDto {
  @IsString()
  variantId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  price: number;
}

export class CreatePOSSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePOSSaleItemDto)
  items: CreatePOSSaleItemDto[];

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsInt()
  @Min(0)
  subtotal: number;

  @IsInt()
  @Min(0)
  discount: number;

  @IsInt()
  @Min(0)
  tax: number;

  @IsInt()
  @Min(0)
  total: number;

  @IsString()
  @IsOptional()
  notes?: string;
}