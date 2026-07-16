import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { MediaModule } from './media/media.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AdminModule } from './admin/admin.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CoursesModule, ModulesModule, LessonsModule, MediaModule, QuizzesModule, CertificatesModule, AdminModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
