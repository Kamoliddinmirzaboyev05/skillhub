export declare class MediaService {
    private readonly SECURITY_KEY;
    private readonly STREAM_DOMAIN;
    private readonly LIBRARY_ID;
    generateSignedUrl(videoId: string, expiresInMinutes?: number, userIp?: string): string;
}
