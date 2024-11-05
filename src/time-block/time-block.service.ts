import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimeBlockDto } from './dto/time-block.dto';

@Injectable()
export class TimeBlockService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.timeBlock.findMany({
      where: { userId },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async create(dto: TimeBlockDto, userId: string) {
    return this.prisma.timeBlock.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(
    dto: Partial<TimeBlockDto>,
    timeBlockId: string,
    userId: string,
  ) {
    return this.prisma.timeBlock.update({
      where: {
        userId,
        id: timeBlockId,
      },
      data: dto,
    });
  }

  async delete(timeBlockId: string) {
    return this.prisma.timeBlock.delete({
      where: {
        id: timeBlockId,
      },
    });
  }

  async updateOrder(ids: string[] = []) {
    return this.prisma.$transaction(async (tx) => {
      let order = 0;
      const newOrders = [];
      for (const id of ids) {
        const newOrder = await tx.timeBlock.update({
          where: {
            id,
          },
          data: { order },
        });
        order++;
        newOrders.push(newOrder);
      }
      // const newOrder = ids.map(
      //   async (id, order) =>
      //     await tx.timeBlock.update({
      //       where: {
      //         id,
      //       },
      //       data: { order },
      //     }),
      // );
      // console.dir(newOrders);
      return newOrders;
    });
  }
}
