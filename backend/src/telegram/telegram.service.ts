import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name);
  
  // Temporary map for linking: code -> userId
  private linkingCodes = new Map<string, string>();

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || token.includes('placeholder')) {
      this.logger.warn('TELEGRAM_BOT_TOKEN is missing or is a placeholder. Telegram Bot is disabled.');
      return;
    }

    this.bot = new Telegraf(token);

    this.bot.start(async (ctx) => {
      const payload = ctx.message.text.split(' ')[1]; // Extract the payload after /start
      if (payload) {
        // Linking flow
        const userId = this.linkingCodes.get(payload);
        if (userId) {
          await this.prisma.user.update({
            where: { id: userId },
            data: { telegramId: ctx.from.id.toString() }
          });
          this.linkingCodes.delete(payload); // Remove code after use
          ctx.reply('🎉 Hisobingiz muvaffaqiyatli Telegram bilan ulandi! Endi barcha xabarnomalarni shu yerda qabul qilasiz.');
        } else {
          ctx.reply('❌ Noto\'g\'ri yoki eskirgan ulanish kodi.');
        }
      } else {
        ctx.reply('Assalomu alaykum! ProAcademy tizimidan xabarlar olish uchun avval platforma orqali hisobingizni ulang.');
      }
    });

    this.bot.launch().catch(err => {
      this.logger.error('Failed to launch Telegram bot', err);
    });
    
    this.logger.log('Telegram bot successfully launched.');
  }

  generateLinkingCode(userId: string): string {
    const code = uuidv4().substring(0, 8).toUpperCase();
    this.linkingCodes.set(code, userId);
    return code;
  }

  async sendNotification(telegramId: string, message: string) {
    if (!this.bot) return; // Silent return if bot is disabled
    try {
      await this.bot.telegram.sendMessage(telegramId, message, { parse_mode: 'HTML' });
    } catch (error) {
      this.logger.error(`Failed to send message to ${telegramId}`, error);
    }
  }

  async sendCourseApprovedAlert(telegramId: string, courseName: string) {
    const message = `✅ <b>Tabriklaymiz!</b>\n\nSizning <b>"${courseName}"</b> kursingiz admin tomonidan tasdiqlandi va platformada e'lon qilindi!`;
    return this.sendNotification(telegramId, message);
  }

  async sendCourseRejectedAlert(telegramId: string, courseName: string) {
    const message = `❌ <b>Kechirasiz.</b>\n\nSizning <b>"${courseName}"</b> kursingiz qoidalarga mos kelmagani uchun admin tomonidan rad etildi.`;
    return this.sendNotification(telegramId, message);
  }

  async sendPurchaseReceipt(telegramId: string, courseName: string, amount: number) {
    const message = `🎓 <b>Yangi kurs xarid qilindi!</b>\n\nSiz <b>"${courseName}"</b> kursini muvaffaqiyatli xarid qildingiz.\nTo'lov summasi: ${amount} UZS.`;
    return this.sendNotification(telegramId, message);
  }

  async sendPayoutAlert(telegramId: string, amount: number) {
    const message = `💰 <b>To'lov qabul qilindi!</b>\n\nSizga ${amount} UZS miqdorida payout (foyda) muvaffaqiyatli o'tkazib berildi.`;
    return this.sendNotification(telegramId, message);
  }
}
