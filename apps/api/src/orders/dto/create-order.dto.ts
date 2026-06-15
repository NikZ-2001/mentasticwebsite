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

export class CreateOrderItemDto {
  @IsString()
  variantId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  addressId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsInt()
  @Min(0)
  subtotal: number;

  @IsInt()
  @Min(0)
  shipping: number;

  @IsInt()
  @Min(0)
  total: number;

  @IsString()
  @IsOptional()
  couponId?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}