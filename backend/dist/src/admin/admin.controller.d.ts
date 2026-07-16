import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
        users: number;
        courses: number;
        gmv: number;
    }>;
    getPendingCourses(): Promise<({
        mentor: {
            email: string;
            fullName: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string | null;
        description: string | null;
        price: number;
        status: import("@prisma/client").$Enums.CourseStatus;
        thumbnail: string | null;
        promoVideo: string | null;
        categoryId: string;
        mentorId: string;
    })[]>;
    approveCourse(id: string): Promise<{
        mentor: {
            id: string;
            email: string;
            password: string;
            fullName: string | null;
            role: import("@prisma/client").$Enums.Role;
            telegramId: string | null;
            profilePic: string | null;
            isBanned: boolean;
            refreshToken: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string | null;
        description: string | null;
        price: number;
        status: import("@prisma/client").$Enums.CourseStatus;
        thumbnail: string | null;
        promoVideo: string | null;
        categoryId: string;
        mentorId: string;
    }>;
    rejectCourse(id: string): Promise<{
        mentor: {
            id: string;
            email: string;
            password: string;
            fullName: string | null;
            role: import("@prisma/client").$Enums.Role;
            telegramId: string | null;
            profilePic: string | null;
            isBanned: boolean;
            refreshToken: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string | null;
        description: string | null;
        price: number;
        status: import("@prisma/client").$Enums.CourseStatus;
        thumbnail: string | null;
        promoVideo: string | null;
        categoryId: string;
        mentorId: string;
    }>;
    getUsers(): Promise<{
        id: string;
        email: string;
        fullName: string | null;
        role: import("@prisma/client").$Enums.Role;
        isBanned: boolean;
        createdAt: Date;
    }[]>;
    toggleBan(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        fullName: string | null;
        role: import("@prisma/client").$Enums.Role;
        telegramId: string | null;
        profilePic: string | null;
        isBanned: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
