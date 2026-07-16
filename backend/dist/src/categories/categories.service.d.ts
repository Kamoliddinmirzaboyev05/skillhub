import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string, slug: string): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        name: string;
        id: string;
        parentId: string | null;
        slug: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        parentId: string | null;
        slug: string;
    }[]>;
    update(id: string, name: string, slug: string): import("@prisma/client").Prisma.Prisma__CategoryClient<{
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
