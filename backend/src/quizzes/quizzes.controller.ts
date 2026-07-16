import { Controller, Post, Body, Param, Get, UseGuards, Request } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get(':id')
  getQuiz(@Param('id') id: string) {
    return this.quizzesService.getQuiz(id);
  }

  @Post(':id/submit')
  submitAttempt(
    @Param('id') id: string,
    @Body('answers') answers: { questionId: string, optionId: string }[],
    @Request() req: any
  ) {
    return this.quizzesService.submitAttempt(id, req.user.id, answers);
  }
}
