import { PrismaService } from '../prisma/prisma.service';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        commissionRate: number;
        heroTitle: string | null;
        heroSubtitle: string | null;
        faqJson: string | null;
    }>;
    updateSettings(data: {
        commissionRate?: number;
        heroTitle?: string;
        heroSubtitle?: string;
        faqJson?: string;
    }): Promise<{
        id: string;
        updatedAt: Date;
        commissionRate: number;
        heroTitle: string | null;
        heroSubtitle: string | null;
        faqJson: string | null;
    }>;
}
