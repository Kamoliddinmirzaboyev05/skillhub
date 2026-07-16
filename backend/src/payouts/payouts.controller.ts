import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PayoutsService } from './payouts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('payouts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Get('me')
  @Roles(Role.MENTOR)
  getMentorFinancials(@Request() req: any) {
    return this.payoutsService.getMentorFinancials(req.user.id);
  }

  @Post('request')
  @Roles(Role.MENTOR)
  requestPayout(@Request() req: any, @Body() body: { amount: number, cardInfo: string }) {
    return this.payoutsService.requestPayout(req.user.id, body.amount, body.cardInfo);
  }

  @Get('pending')
  @Roles(Role.SUPERADMIN)
  getPendingPayouts() {
    return this.payoutsService.getPendingPayouts();
  }

  @Post(':id/approve')
  @Roles(Role.SUPERADMIN)
  approvePayout(@Param('id') id: string) {
    return this.payoutsService.approvePayout(id);
  }

  @Post(':id/reject')
  @Roles(Role.SUPERADMIN)
  rejectPayout(@Param('id') id: string) {
    return this.payoutsService.rejectPayout(id);
  }
}
