import { PrismaService } from '../prisma/prisma.service';
import { CertificatesService } from '../certificates/certificates.service';
export declare class QuizzesService {
    private prisma;
    private certificatesService;
    constructor(prisma: PrismaService, certificatesService: CertificatesService);
    submitAttempt(quizId: string, studentId: string, answers: {
        questionId: string;
        optionId: string;
    }[]): Promise<{
        attempt: {
            id: string;
            createdAt: Date;
            studentId: string;
            score: number;
            passed: boolean;
            quizId: string;
        };
        certificate: any;
    }>;
    getQuiz(id: string): Promise<({
        questions: ({
            options: {
                id: string;
                text: string;
                questionId: string;
            }[];
        } & {
            id: string;
            text: string;
            quizId: string;
            correctOption: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }) | null>;
}
