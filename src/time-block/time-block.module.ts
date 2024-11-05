import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimeBlockController } from './time-block.controller';
import { TimeBlockService } from './time-block.service';

@Module({
  imports: [],
  controllers: [TimeBlockController],
  providers: [TimeBlockService, PrismaService],
})
export class TimeBlockModule {}
