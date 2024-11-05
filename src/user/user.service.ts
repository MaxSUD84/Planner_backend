import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
import { UserDto } from './dto/user.dto';
import { startOfDay, subDays } from 'date-fns';
import { stat } from 'fs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });

    delete user.password;
    return user;
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(dto: AuthDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
      },
    });
    delete user.password;
    return user;
  }

  async update(id: string, dto: UserDto) {
    let data = dto;
    if (dto.password) {
      data = {
        ...data,
        password: await hash(dto.password),
      };
    }
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
    delete user.password;
    return user;
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const tasks = await this.prisma.task.findMany({
      where: {
        userId: id,
      },
    });

    const totalTasks = tasks.length;

    const completedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: todayStart.toISOString(),
          lte: new Date(),
        },
      },
    });

    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: weekStart.toISOString(),
        },
      },
    });

    return {
      user: profile,
      statistics: [
        { label: 'Total tasks', value: totalTasks },
        { label: 'Completed tasks', value: completedTasks },
        { label: 'Today tasks', value: todayTasks },
        { label: 'Week tasks', value: weekTasks },
      ],
    };
  }
}
