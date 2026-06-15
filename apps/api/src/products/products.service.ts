import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    category?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    sale?: boolean;
    search?: string;
  }) {
    const where: any = { isActive: true };

    if (query.category) {
      where.category = { slug: query.category };
    }

    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    if (query.sale) {
      where.variants = {
        some: {
          price: { lt: query.minPrice || 999999 },
        },
      };
    }

    let orderBy: any = { createdAt: 'desc' };

    if (query.sort === 'price-low') {
      orderBy = { variants: { _min: { price: 'asc' } } };
    } else if (query.sort === 'price-high') {
      orderBy = { variants: { _min: { price: 'desc' } } };
    }

    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        variants: true,
      },
    });

    return products;
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        categoryId: dto.categoryId,
        isActive: dto.isActive ?? true,
        isFeatured: dto.isFeatured ?? false,
        variants: {
          create: dto.variants,
        },
        images: {
          create: dto.images?.map((url, index) => ({
            url,
            isPrimary: index === 0,
            order: index,
          })),
        },
      },
      include: {
        variants: true,
        images: true,
      },
    });

    return product;
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        isActive: dto.isActive,
        isFeatured: dto.isFeatured,
      },
      include: {
        variants: true,
        images: true,
      },
    });

    return product;
  }

  async remove(id: string) {
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  async updateStock(variantId: string, quantity: number) {
    const variant = await this.prisma.productVariant.update({
      where: { id: variantId },
      data: { stock: { decrement: quantity } },
    });

    return variant;
  }
}