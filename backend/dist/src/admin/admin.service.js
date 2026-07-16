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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const telegram_service_1 = require("../telegram/telegram.service");
let AdminService = class AdminService {
    prisma;
    telegramService;
    constructor(prisma, telegramService) {
        this.prisma = prisma;
        this.telegramService = telegramService;
    }
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
    async approveCourse(id) {
        const course = await this.prisma.course.update({
            where: { id },
            data: { status: 'PUBLISHED' },
            include: { mentor: true }
        });
        if (course.mentor.telegramId) {
            await this.telegramService.sendCourseApprovedAlert(course.mentor.telegramId, course.title);
        }
        return course;
    }
    async rejectCourse(id) {
        const course = await this.prisma.course.update({
            where: { id },
            data: { status: 'REJECTED' },
            include: { mentor: true }
        });
        if (course.mentor.telegramId) {
            await this.telegramService.sendCourseRejectedAlert(course.mentor.telegramId, course.title);
        }
        return course;
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
    async toggleBan(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.user.update({
            where: { id },
            data: { isBanned: !user.isBanned }
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        telegram_service_1.TelegramService])
], AdminService);
//# sourceMappingURL=admin.service.js.map