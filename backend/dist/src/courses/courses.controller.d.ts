import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto, req: any): Promise<{
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
    findAll(req: any): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            name: string;
            id: string;
            parentId: string | null;
            slug: string;
        };
        modules: {
            id: string;
            title: string;
            courseId: string;
            order: number;
        }[];
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CourseClient<({
        modules: ({
            lessons: {
                id: string;
                title: string;
                duration: number;
                type: import("@prisma/client").$Enums.LessonType;
                order: number;
                content: string | null;
                videoUrl: string | null;
                isPreview: boolean;
                moduleId: string;
            }[];
        } & {
            id: string;
            title: string;
            courseId: string;
            order: number;
        })[];
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCourseDto: UpdateCourseDto, req: any): import("@prisma/client").Prisma.Prisma__CourseClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string, req: any): import("@prisma/client").Prisma.Prisma__CourseClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    enrollStudent(id: string, req: any): Promise<{
        student: {
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
        status: import("@prisma/client").$Enums.EnrollmentStatus;
        progress: number;
        courseId: string;
        studentId: string;
    }>;
}
