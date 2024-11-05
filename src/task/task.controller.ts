import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskDto } from './dto/task.dto';

@Auth()
@Controller('user-tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @HttpCode(200)
  @Get()
  async getAll(@CurrentUser('id') userId: string) {
    return this.taskService.getAll(userId);
  }

  @HttpCode(200)
  @Post()
  async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
    return this.taskService.create(dto, userId);
  }

  @HttpCode(200)
  @Patch(':id')
  async update(
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.taskService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
