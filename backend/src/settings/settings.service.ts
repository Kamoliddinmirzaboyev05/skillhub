import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    let setting = await this.prisma.setting.findUnique({ where: { id: 'singleton' } });
    if (!setting) {
      setting = await this.prisma.setting.create({
        data: { id: 'singleton', commissionRate: 30.0 }
      });
    }
    return setting;
  }

  async updateSettings(data: { commissionRate?: number, heroTitle?: string, heroSubtitle?: string, faqJson?: string }) {
    return this.prisma.setting.upsert({
      where: { id: 'singleton' },
      update: data,
      create: {
        id: 'singleton',
        commissionRate: data.commissionRate || 30.0,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        faqJson: data.faqJson
      }
    });
  }
}
