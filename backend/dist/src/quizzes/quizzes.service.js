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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const certificates_service_1 = require("../certificates/certificates.service");
let QuizzesService = class QuizzesService {
    prisma;
    certificatesService;
    constructor(prisma, certificatesService) {
        this.prisma = prisma;
        this.certificatesService = certificatesService;
    }
    async submitAttempt(quizId, studentId, answers) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: { questions: true }
        });
        if (!quiz)
            throw new common_1.BadRequestException('Quiz not found');
        let correctCount = 0;
        for (const q of quiz.questions) {
            const studentAnswer = answers.find(a => a.questionId === q.id);
            if (studentAnswer && studentAnswer.optionId === q.correctOption) {
                correctCount++;
            }
        }
        const score = Math.round((correctCount / quiz.questions.length) * 100) || 0;
        const passed = score >= 70;
        const attempt = await this.prisma.quizAttempt.create({
            data: {
                quizId,
                studentId,
                score,
                passed,
            }
        });
        let certificate = null;
        if (passed) {
            certificate = await this.certificatesService.issueCertificate(quiz.courseId, studentId);
        }
        return { attempt, certificate };
    }
    async getQuiz(id) {
        return this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: { options: true }
                }
            }
        });
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        certificates_service_1.CertificatesService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map