import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(Role.MENTOR)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Request() req: any) {
    return this.coursesService.create(createCourseDto, req.user.id);
  }

  @Get()
  findAll(@Request() req: any) {
    if (req.user.role === 'MENTOR') {
      return this.coursesService.findAll(req.user.id);
    }
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Roles(Role.MENTOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Request() req: any) {
    return this.coursesService.update(id, updateCourseDto, req.user.id);
  }

  @Roles(Role.MENTOR)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.coursesService.remove(id, req.user.id);
  }

  @Post(':id/enroll')
  enrollStudent(@Param('id') id: string, @Request() req: any) {
    // Both student and superadmin can enroll
    return this.coursesService.enrollStudent(id, req.user.id);
  }
}
