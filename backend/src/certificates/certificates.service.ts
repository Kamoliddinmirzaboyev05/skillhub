import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async issueCertificate(courseId: string, studentId: string) {
    // Check if already exists
    let cert = await this.prisma.certificate.findFirst({
      where: { courseId, studentId }
    });

    if (!cert) {
      cert = await this.prisma.certificate.create({
        data: {
          verifyId: uuidv4().substring(0, 8).toUpperCase(),
          courseId,
          studentId,
        }
      });
    }
    return cert;
  }

  async generatePdf(verifyId: string): Promise<Buffer> {
    const cert = await this.prisma.certificate.findUnique({
      where: { verifyId },
      include: { course: true, student: true }
    });

    if (!cert) throw new Error('Certificate not found');

    return new Promise((resolve) => {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
      });
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Draw PDF
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
      doc.fontSize(40).fillColor('#2c3e50').text('Certificate of Completion', { align: 'center' });
      doc.moveDown();
      doc.fontSize(20).text('This is proudly presented to', { align: 'center' });
      doc.moveDown();
      doc.fontSize(30).fillColor('#2980b9').text(cert.student.fullName || 'Student', { align: 'center' });
      doc.moveDown();
      doc.fontSize(20).fillColor('#2c3e50').text('For successfully completing the course', { align: 'center' });
      doc.moveDown();
      doc.fontSize(25).fillColor('#e67e22').text(cert.course.title, { align: 'center' });
      doc.moveDown(2);
      doc.fontSize(12).fillColor('#7f8c8d').text(`Verification ID: ${cert.verifyId}`, { align: 'center' });
      doc.text(`Issued On: ${cert.issuedAt.toDateString()}`, { align: 'center' });
      
      doc.end();
    });
  }
}
