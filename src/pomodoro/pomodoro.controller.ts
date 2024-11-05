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
import { PomodoroService } from './pomodoro.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto';

@Auth()
@Controller('pomodoro-timer')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @HttpCode(200)
  @Get('today')
  async getTodaySession(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getTodaySession(userId);
  }

  @HttpCode(200)
  @Post()
  async create(@CurrentUser('id') userId: string) {
    return this.pomodoroService.create(userId);
  }

  @HttpCode(200)
  @Patch('round/:id')
  async updateRound(@Body() dto: PomodoroRoundDto, @Param('id') id: string) {
    return this.pomodoroService.updateRound(dto, id);
  }

  @HttpCode(200)
  @Patch(':id')
  async update(
    @Body() dto: PomodoroSessionDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.pomodoroService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteSession(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroService.deleteSession(id, userId);
  }
}
