import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class PayoutsService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService
  ) {}

  async getMentorFinancials(mentorId: string) {
    // 1. Calculate total earnings (e.g. 70% of total payments for mentor's courses)
    const courses = await this.prisma.course.findMany({ where: { mentorId }, select: { id: true } });
    const courseIds = courses.map(c => c.id);

    const payments = await this.prisma.payment.aggregate({
      where: { courseId: { in: courseIds }, status: 'SUCCESS' },
      _sum: { amount: true }
    });

    const totalRevenue = payments._sum.amount || 0;
    const mentorCut = totalRevenue * 0.7; // 70% to mentor

    // 2. Calculate already paid out or pending
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

  async requestPayout(mentorId: string, amount: number, cardInfo: string) {
    const financials = await this.getMentorFinancials(mentorId);
    if (amount > financials.availableBalance) {
      throw new BadRequestException('Insufficient balance');
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

  // Superadmin tools
  async getPendingPayouts() {
    return this.prisma.payout.findMany({
      where: { status: 'PENDING' },
      include: { mentor: { select: { fullName: true, telegramId: true } } }
    });
  }

  async approvePayout(id: string) {
    const payout = await this.prisma.payout.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: { mentor: true }
    });

    if (payout.mentor.telegramId) {
      this.telegramService.sendPayoutAlert(payout.mentor.telegramId, payout.amount).catch(() => {});
    }

    return payout;
  }

  async rejectPayout(id: string) {
    return this.prisma.payout.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
  }
}
