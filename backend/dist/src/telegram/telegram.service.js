"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let TelegramService = TelegramService_1 = class TelegramService {
    prisma;
    bot;
    logger = new common_1.Logger(TelegramService_1.name);
    linkingCodes = new Map();
    constructor(prisma) {
        this.prisma = prisma;
    }
    onModuleInit() {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token || token.includes('placeholder')) {
            this.logger.warn('TELEGRAM_BOT_TOKEN is missing or is a placeholder. Telegram Bot is disabled.');
            return;
        }
        this.bot = new telegraf_1.Telegraf(token);
        this.bot.start(async (ctx) => {
            const payload = ctx.message.text.split(' ')[1];
            if (payload) {
                const userId = this.linkingCodes.get(payload);
                if (userId) {
                    await this.prisma.user.update({
                        where: { id: userId },
                        data: { telegramId: ctx.from.id.toString() }
                    });
                    this.linkingCodes.delete(payload);
                    ctx.reply('🎉 Hisobingiz muvaffaqiyatli Telegram bilan ulandi! Endi barcha xabarnomalarni shu yerda qabul qilasiz.');
                }
                else {
                    ctx.reply('❌ Noto\'g\'ri yoki eskirgan ulanish kodi.');
                }
            }
            else {
                ctx.reply('Assalomu alaykum! ProAcademy tizimidan xabarlar olish uchun avval platforma orqali hisobingizni ulang.');
            }
        });
        this.bot.launch().catch(err => {
            this.logger.error('Failed to launch Telegram bot', err);
        });
        this.logger.log('Telegram bot successfully launched.');
    }
    generateLinkingCode(userId) {
        const code = (0, uuid_1.v4)().substring(0, 8).toUpperCase();
        this.linkingCodes.set(code, userId);
        return code;
    }
    async sendNotification(telegramId, message) {
        if (!this.bot)
            return;
        try {
            await this.bot.telegram.sendMessage(telegramId, message, { parse_mode: 'HTML' });
        }
        catch (error) {
            this.logger.error(`Failed to send message to ${telegramId}`, error);
        }
    }
    async sendCourseApprovedAlert(telegramId, courseName) {
        const message = `✅ <b>Tabriklaymiz!</b>\n\nSizning <b>"${courseName}"</b> kursingiz admin tomonidan tasdiqlandi va platformada e'lon qilindi!`;
        return this.sendNotification(telegramId, message);
    }
    async sendCourseRejectedAlert(telegramId, courseName) {
        const message = `❌ <b>Kechirasiz.</b>\n\nSizning <b>"${courseName}"</b> kursingiz qoidalarga mos kelmagani uchun admin tomonidan rad etildi.`;
        return this.sendNotification(telegramId, message);
    }
    async sendPurchaseReceipt(telegramId, courseName, amount) {
        const message = `🎓 <b>Yangi kurs xarid qilindi!</b>\n\nSiz <b>"${courseName}"</b> kursini muvaffaqiyatli xarid qildingiz.\nTo'lov summasi: ${amount} UZS.`;
        return this.sendNotification(telegramId, message);
    }
    async sendPayoutAlert(telegramId, amount) {
        const message = `💰 <b>To'lov qabul qilindi!</b>\n\nSizga ${amount} UZS miqdorida payout (foyda) muvaffaqiyatli o'tkazib berildi.`;
        return this.sendNotification(telegramId, message);
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map