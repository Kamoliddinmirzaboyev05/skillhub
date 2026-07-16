import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

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
}
