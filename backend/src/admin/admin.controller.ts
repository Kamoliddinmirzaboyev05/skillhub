import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPERADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('courses/pending')
  getPendingCourses() {
    return this.adminService.getPendingCourses();
  }

  @Post('courses/:id/approve')
  approveCourse(@Param('id') id: string) {
    return this.adminService.approveCourse(id);
  }

  @Post('courses/:id/reject')
  rejectCourse(@Param('id') id: string) {
    return this.adminService.rejectCourse(id);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Post('users/:id/toggle-ban')
  toggleBan(@Param('id') id: string) {
    return this.adminService.toggleBan(id);
  }
}
