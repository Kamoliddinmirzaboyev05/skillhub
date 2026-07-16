import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService
  ) {}

  async create(createCourseDto: CreateCourseDto, mentorId: string) {
    return this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        price: createCourseDto.price || 0,
        categoryId: createCourseDto.categoryId,
        mentorId,
      },
    });
  }

  findAll(mentorId?: string) {
    return this.prisma.course.findMany({
      where: mentorId ? { mentorId } : undefined,
      include: { category: true, modules: true }
    });
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { modules: { include: { lessons: true } } },
    });
  }

  update(id: string, updateCourseDto: UpdateCourseDto, mentorId: string) {
    return this.prisma.course.update({
      where: { id, mentorId },
      data: updateCourseDto,
    });
  }

  remove(id: string, mentorId: string) {
    return this.prisma.course.delete({
      where: { id, mentorId },
    });
  }

  async enrollStudent(courseId: string, studentId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
        status: 'ACTIVE'
      },
      include: { student: true }
    });

    // Mock payment successful, create payment record
    await this.prisma.payment.create({
      data: {
        studentId,
        courseId,
        amount: course.price,
        provider: 'MOCK_PAY',
        status: 'SUCCESS'
      }
    });

    if (enrollment.student.telegramId) {
      await this.telegramService.sendPurchaseReceipt(enrollment.student.telegramId, course.title, course.price);
    }

    return enrollment;
  }
}
