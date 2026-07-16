import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(name: string, slug: string) {
    return this.prisma.category.create({
      data: { name, slug }
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  update(id: string, name: string, slug: string) {
    return this.prisma.category.update({
      where: { id },
      data: { name, slug }
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id }
    });
  }
}
