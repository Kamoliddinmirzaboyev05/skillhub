import { PrismaService } from '../prisma/prisma.service';
export declare class CertificatesService {
    private prisma;
    constructor(prisma: PrismaService);
    issueCertificate(courseId: string, studentId: string): Promise<{
        id: string;
        courseId: string;
        studentId: string;
        verifyId: string;
        issuedAt: Date;
    }>;
    generatePdf(verifyId: string): Promise<Buffer>;
}
