import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';

@Module({
  imports: [
    TimeBlockModule,
    TaskModule,
    AuthModule,
    UserModule,
    PomodoroModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
