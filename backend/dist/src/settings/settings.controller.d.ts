import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        commissionRate: number;
        heroTitle: string | null;
        heroSubtitle: string | null;
        faqJson: string | null;
    }>;
    updateSettings(body: any): Promise<{
        id: string;
        updatedAt: Date;
        commissionRate: number;
        heroTitle: string | null;
        heroSubtitle: string | null;
        faqJson: string | null;
    }>;
}
