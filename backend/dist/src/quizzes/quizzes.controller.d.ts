import { QuizzesService } from './quizzes.service';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
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
    submitAttempt(id: string, answers: {
        questionId: string;
        optionId: string;
    }[], req: any): Promise<{
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
}
