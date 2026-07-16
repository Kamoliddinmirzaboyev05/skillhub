import { CertificatesService } from './certificates.service';
import type { Response } from 'express';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    downloadPdf(verifyId: string, res: Response): Promise<void>;
}
