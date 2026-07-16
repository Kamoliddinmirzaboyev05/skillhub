import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const usersCount = await this.prisma.user.count();
    const coursesCount = await this.prisma.course.count();
    const payments = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESS' }
    });
    
    return {
      users: usersCount,
      courses: coursesCount,
      gmv: payments._sum.amount || 0,
    };
  }

  async getPendingCourses() {
    return this.prisma.course.findMany({
      where: { status: 'REVIEW' },
      include: { mentor: { select: { fullName: true, email: true } } }
    });
  }

  async approveCourse(id: string) {
    return this.prisma.course.update({
      where: { id },
      data: { status: 'PUBLISHED' }
    });
  }

  async rejectCourse(id: string) {
    return this.prisma.course.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isBanned: true,
        createdAt: true,
      }
    });
  }

  async toggleBan(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    
    return this.prisma.user.update({
      where: { id },
      data: { isBanned: !user.isBanned }
    });
  }
}
