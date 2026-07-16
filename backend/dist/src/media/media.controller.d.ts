import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    getSignedUrl(videoId: string, req: any, ip: string): {
        success: boolean;
        url: string;
        watermarkData: {
            fullName: any;
            email: any;
            ip: string;
        };
    };
}
