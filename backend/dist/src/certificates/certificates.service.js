"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const PDFDocument = require('pdfkit');
let CertificatesService = class CertificatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async issueCertificate(courseId, studentId) {
        let cert = await this.prisma.certificate.findFirst({
            where: { courseId, studentId }
        });
        if (!cert) {
            cert = await this.prisma.certificate.create({
                data: {
                    verifyId: (0, uuid_1.v4)().substring(0, 8).toUpperCase(),
                    courseId,
                    studentId,
                }
            });
        }
        return cert;
    }
    async generatePdf(verifyId) {
        const cert = await this.prisma.certificate.findUnique({
            where: { verifyId },
            include: { course: true, student: true }
        });
        if (!cert)
            throw new Error('Certificate not found');
        return new Promise((resolve) => {
            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4',
            });
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
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
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map