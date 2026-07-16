"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const telegram_service_1 = require("../telegram/telegram.service");
let CoursesService = class CoursesService {
    prisma;
    telegramService;
    constructor(prisma, telegramService) {
        this.prisma = prisma;
        this.telegramService = telegramService;
    }
    async create(createCourseDto, mentorId) {
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
    findAll(mentorId) {
        return this.prisma.course.findMany({
            where: mentorId ? { mentorId } : undefined,
            include: { category: true, modules: true }
        });
    }
    findOne(id) {
        return this.prisma.course.findUnique({
            where: { id },
            include: { modules: { include: { lessons: true } } },
        });
    }
    update(id, updateCourseDto, mentorId) {
        return this.prisma.course.update({
            where: { id, mentorId },
            data: updateCourseDto,
        });
    }
    remove(id, mentorId) {
        return this.prisma.course.delete({
            where: { id, mentorId },
        });
    }
    async enrollStudent(courseId, studentId) {
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.prisma.$transaction(async (tx) => {
            const existing = await tx.enrollment.findUnique({
                where: { studentId_courseId: { studentId, courseId } }
            });
            if (existing) {
                throw new Error('You are already enrolled in this course.');
            }
            await tx.payment.create({
                data: {
                    studentId,
                    courseId,
                    amount: course.price,
                    provider: 'MOCK_PAY',
                    status: 'SUCCESS'
                }
            });
            const enrollment = await tx.enrollment.create({
                data: {
                    courseId,
                    studentId,
                    status: 'ACTIVE'
                },
                include: { student: true }
            });
            if (enrollment.student.telegramId) {
                this.telegramService.sendPurchaseReceipt(enrollment.student.telegramId, course.title, course.price).catch(() => { });
            }
            return enrollment;
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        telegram_service_1.TelegramService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map