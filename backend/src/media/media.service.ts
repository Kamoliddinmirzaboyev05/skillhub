import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class MediaService {
  private readonly SECURITY_KEY = process.env.BUNNY_SECURITY_KEY || 'BUNNY_API_KEY_PLACEHOLDER';
  private readonly STREAM_DOMAIN = process.env.BUNNY_STREAM_DOMAIN || 'iframe.mediadelivery.net';
  private readonly LIBRARY_ID = process.env.BUNNY_LIBRARY_ID || '123456';

  generateSignedUrl(videoId: string, expiresInMinutes: number = 60, userIp: string = '') {
    const expires = Math.floor(Date.now() / 1000) + (expiresInMinutes * 60);
    
    // Bunny Stream Token Security Signature
    // Signature = SHA256(securityKey + videoId + expires)
    const hashableBase = this.SECURITY_KEY + videoId + expires + userIp;
    const signature = crypto.createHash('sha256').update(hashableBase).digest('hex');

    // Return the secure iframe URL with the token
    return `https://${this.STREAM_DOMAIN}/embed/${this.LIBRARY_ID}/${videoId}?token=${signature}&expires=${expires}`;
  }
}
