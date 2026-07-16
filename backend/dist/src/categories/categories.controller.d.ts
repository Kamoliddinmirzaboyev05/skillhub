import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        parentId: string | null;
        slug: string;
    }[]>;
    create(body: {
        name: string;
        slug: string;
    }): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        name: string;
        id: string;
        parentId: string | null;
        slug: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: {
        name: string;
        slug: string;
    }): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        name: string;
        id: string;
        parentId: string | null;
        slug: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        name: string;
        id: string;
        parentId: string | null;
        slug: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
