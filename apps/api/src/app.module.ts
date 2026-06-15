import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { POSModule } from './pos/pos.module';

@Module({
  imports: [AuthModule, ProductsModule, CategoriesModule, OrdersModule, POSModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}