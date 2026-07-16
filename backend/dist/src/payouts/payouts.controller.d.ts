import { PayoutsService } from './payouts.service';
export declare class PayoutsController {
    private readonly payoutsService;
    constructor(payoutsService: PayoutsService);
    getMentorFinancials(req: any): Promise<{
        totalRevenue: number;
        mentorCut: number;
        availableBalance: number;
        payouts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PayoutStatus;
            mentorId: string;
            amount: number;
            cardInfo: string | null;
            receiptId: string | null;
        }[];
    }>;
    requestPayout(req: any, body: {
        amount: number;
        cardInfo: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PayoutStatus;
        mentorId: string;
        amount: number;
        cardInfo: string | null;
        receiptId: string | null;
    }>;
    getPendingPayouts(): Promise<({
        mentor: {
            fullName: string | null;
            telegramId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PayoutStatus;
        mentorId: string;
        amount: number;
        cardInfo: string | null;
        receiptId: string | null;
    })[]>;
    approvePayout(id: string): Promise<{
        mentor: {
            id: string;
            email: string;
            password: string;
            fullName: string | null;
            role: import("@prisma/client").$Enums.Role;
            telegramId: string | null;
            profilePic: string | null;
            isBanned: boolean;
            refreshToken: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PayoutStatus;
        mentorId: string;
        amount: number;
        cardInfo: string | null;
        receiptId: string | null;
    }>;
    rejectPayout(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.PayoutStatus;
        mentorId: string;
        amount: number;
        cardInfo: string | null;
        receiptId: string | null;
    }>;
}
