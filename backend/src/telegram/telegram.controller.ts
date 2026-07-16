import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('telegram')
@UseGuards(JwtAuthGuard)
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('link-code')
  generateLinkCode(@Request() req: any) {
    const code = this.telegramService.generateLinkingCode(req.user.id);
    return {
      success: true,
      linkUrl: `https://t.me/proacademy_test_bot?start=${code}`,
      code
    };
  }
}
