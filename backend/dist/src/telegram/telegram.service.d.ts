import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class TelegramService implements OnModuleInit {
    private prisma;
    private bot;
    private readonly logger;
    private linkingCodes;
    constructor(prisma: PrismaService);
    onModuleInit(): void;
    generateLinkingCode(userId: string): string;
    sendNotification(telegramId: string, message: string): Promise<void>;
    sendCourseApprovedAlert(telegramId: string, courseName: string): Promise<void>;
    sendCourseRejectedAlert(telegramId: string, courseName: string): Promise<void>;
    sendPurchaseReceipt(telegramId: string, courseName: string, amount: number): Promise<void>;
    sendPayoutAlert(telegramId: string, amount: number): Promise<void>;
}
