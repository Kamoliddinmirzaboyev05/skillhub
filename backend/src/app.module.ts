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

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CoursesModule, ModulesModule, LessonsModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
