import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        userId,
        addressId: dto.addressId,
        subtotal: dto.subtotal,
        shipping: dto.shipping,
        total: dto.total,
        couponId: dto.couponId,
        notes: dto.notes,
        items: {
          create: dto.items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
        address: true,
      },
    });

    // Update stock for each variant
    for (const item of dto.items) {
      await this.prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
        address: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: {
          include: {
            variant: {
              include: { product: true },
            },
          },
        },
        address: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any },
    });
  }
}