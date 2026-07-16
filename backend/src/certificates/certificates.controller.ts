import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import type { Response } from 'express';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get(':verifyId/pdf')
  async downloadPdf(@Param('verifyId') verifyId: string, @Res() res: Response) {
    try {
      const pdfBuffer = await this.certificatesService.generatePdf(verifyId);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificate-${verifyId}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });
      res.end(pdfBuffer);
    } catch (err) {
      res.status(404).send('Certificate not found');
    }
  }
}
