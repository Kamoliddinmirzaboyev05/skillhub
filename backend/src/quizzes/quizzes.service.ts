import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CertificatesService } from '../certificates/certificates.service';

@Injectable()
export class QuizzesService {
  constructor(
    private prisma: PrismaService,
    private certificatesService: CertificatesService
  ) {}

  async submitAttempt(quizId: string, studentId: string, answers: { questionId: string, optionId: string }[]) {
    // 1. Fetch quiz with questions and correct options
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    });

    if (!quiz) throw new BadRequestException('Quiz not found');

    // 2. Auto-grade
    let correctCount = 0;
    for (const q of quiz.questions) {
      const studentAnswer = answers.find(a => a.questionId === q.id);
      if (studentAnswer && studentAnswer.optionId === q.correctOption) {
        correctCount++;
      }
    }

    const score = Math.round((correctCount / quiz.questions.length) * 100) || 0;
    const passed = score >= 70; // 70% to pass

    // 3. Save Attempt
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quizId,
        studentId,
        score,
        passed,
      }
    });

    // 4. Issue Certificate if passed
    let certificate = null;
    if (passed) {
      certificate = await this.certificatesService.issueCertificate(quiz.courseId, studentId);
    }

    return { attempt, certificate };
  }

  async getQuiz(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });
  }
}
