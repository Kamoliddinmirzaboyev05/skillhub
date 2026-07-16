"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const courses_module_1 = require("./courses/courses.module");
const modules_module_1 = require("./modules/modules.module");
const lessons_module_1 = require("./lessons/lessons.module");
const media_module_1 = require("./media/media.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const certificates_module_1 = require("./certificates/certificates.module");
const admin_module_1 = require("./admin/admin.module");
const telegram_module_1 = require("./telegram/telegram.module");
const payouts_module_1 = require("./payouts/payouts.module");
const categories_module_1 = require("./categories/categories.module");
const settings_module_1 = require("./settings/settings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, users_module_1.UsersModule, auth_module_1.AuthModule, courses_module_1.CoursesModule, modules_module_1.ModulesModule, lessons_module_1.LessonsModule, media_module_1.MediaModule, quizzes_module_1.QuizzesModule, certificates_module_1.CertificatesModule, admin_module_1.AdminModule, telegram_module_1.TelegramModule, payouts_module_1.PayoutsModule, categories_module_1.CategoriesModule, settings_module_1.SettingsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map