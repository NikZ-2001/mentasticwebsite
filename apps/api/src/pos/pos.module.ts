import { Module } from '@nestjs/common';
import { POSController } from './pos.controller';
import { POSService } from './pos.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [POSController],
  providers: [POSService, PrismaService],
  exports: [POSService],
})
export class POSModule {}