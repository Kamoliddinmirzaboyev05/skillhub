import { TelegramService } from './telegram.service';
export declare class TelegramController {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    generateLinkCode(req: any): {
        success: boolean;
        linkUrl: string;
        code: string;
    };
}
