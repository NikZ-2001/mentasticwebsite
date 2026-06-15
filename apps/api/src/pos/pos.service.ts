import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePOSSaleDto } from './dto/create-pos-sale.dto';

@Injectable()
export class POSService {
  constructor(private prisma: PrismaService) {}

  async createSale(staffId: string, dto: CreatePOSSaleDto) {
    const invoiceNumber = `POS-${Date.now()}`;

    const sale = await this.prisma.pOSSale.create({
      data: {
        invoiceNumber,
        staffId,
        paymentMethod: (dto.paymentMethod as any) || 'CASH',
        subtotal: dto.subtotal,
        discount: dto.discount,
        tax: dto.tax,
        total: dto.total,
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
      },
    });

    // Update stock
    for (const item of dto.items) {
      await this.prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return sale;
  }

  async findAll() {
    return this.prisma.pOSSale.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.pOSSale.findUnique({
      where: { id },
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
      },
    });
  }

  async getDailySales() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.pOSSale.findMany({
      where: {
        createdAt: { gte: today },
      },
      include: {
        items: true,
      },
    });
  }
}