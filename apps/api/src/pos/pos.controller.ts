import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { POSService } from './pos.service';
import { CreatePOSSaleDto } from './dto/create-pos-sale.dto';

@Controller('pos')
@UseGuards(AuthGuard('jwt'))
export class POSController {
  constructor(private posService: POSService) {}

  @Post('sales')
  createSale(@Request() req: any, @Body() dto: CreatePOSSaleDto) {
    return this.posService.createSale(req.user.id, dto);
  }

  @Get('sales')
  findAll() {
    return this.posService.findAll();
  }

  @Get('sales/today')
  getDailySales() {
    return this.posService.getDailySales();
  }

  @Get('sales/:id')
  findOne(@Param('id') id: string) {
    return this.posService.findOne(id);
  }
}