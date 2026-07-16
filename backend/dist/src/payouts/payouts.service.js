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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const telegram_service_1 = require("../telegram/telegram.service");
let PayoutsService = class PayoutsService {
    prisma;
    telegramService;
    constructor(prisma, telegramService) {
        this.prisma = prisma;
        this.telegramService = telegramService;
    }
    async getMentorFinancials(mentorId) {
        const courses = await this.prisma.course.findMany({ where: { mentorId }, select: { id: true } });
        const courseIds = courses.map(c => c.id);
        const payments = await this.prisma.payment.aggregate({
            where: { courseId: { in: courseIds }, status: 'SUCCESS' },
            _sum: { amount: true }
        });
        const totalRevenue = payments._sum.amount || 0;
        const mentorCut = totalRevenue * 0.7;
        const payouts = await this.prisma.payout.findMany({ where: { mentorId } });
        let paidOrPending = 0;
        payouts.forEach(p => {
            if (p.status === 'APPROVED' || p.status === 'PENDING') {
                paidOrPending += p.amount;
            }
        });
        const availableBalance = mentorCut - paidOrPending;
        return { totalRevenue, mentorCut, availableBalance, payouts };
    }
    async requestPayout(mentorId, amount, cardInfo) {
        const financials = await this.getMentorFinancials(mentorId);
        if (amount > financials.availableBalance) {
            throw new common_1.BadRequestException('Insufficient balance');
        }
        return this.prisma.payout.create({
            data: {
                mentorId,
                amount,
                cardInfo,
                status: 'PENDING'
            }
        });
    }
    async getPendingPayouts() {
        return this.prisma.payout.findMany({
            where: { status: 'PENDING' },
            include: { mentor: { select: { fullName: true, telegramId: true } } }
        });
    }
    async approvePayout(id) {
        const payout = await this.prisma.payout.update({
            where: { id },
            data: { status: 'APPROVED' },
            include: { mentor: true }
        });
        if (payout.mentor.telegramId) {
            this.telegramService.sendPayoutAlert(payout.mentor.telegramId, payout.amount).catch(() => { });
        }
        return payout;
    }
    async rejectPayout(id) {
        return this.prisma.payout.update({
            where: { id },
            data: { status: 'REJECTED' }
        });
    }
};
exports.PayoutsService = PayoutsService;
exports.PayoutsService = PayoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        telegram_service_1.TelegramService])
], PayoutsService);
//# sourceMappingURL=payouts.service.js.map