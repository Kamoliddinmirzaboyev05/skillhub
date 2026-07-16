import { Controller, Get, Param, UseGuards, Request, Ip } from '@nestjs/common';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('sign/:videoId')
  getSignedUrl(@Param('videoId') videoId: string, @Request() req: any, @Ip() ip: string) {
    // Ideally check if user has enrolled in the course that contains this video
    // For now, generate the token.
    
    // In production, we might want to bind the token to the user's IP address.
    const signedUrl = this.mediaService.generateSignedUrl(videoId, 60, ''); // IP binding is optional
    
    return {
      success: true,
      url: signedUrl,
      watermarkData: {
        fullName: req.user.fullName,
        email: req.user.email,
        ip: ip || '127.0.0.1'
      }
    };
  }
}
