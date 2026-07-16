import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  updateSettings(@Body() body: any) {
    return this.settingsService.updateSettings({
      commissionRate: body.commissionRate ? Number(body.commissionRate) : undefined,
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      faqJson: body.faqJson
    });
  }
}
