import { bookDTO } from './book.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async create(data: bookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async update(id: string, data: bookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('book does not exists!');
    }

    await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error('book does not exists!');
    }

    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
