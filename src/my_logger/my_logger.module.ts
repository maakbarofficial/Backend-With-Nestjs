import { Module } from '@nestjs/common';
import { MyLoggerService } from './my_logger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService]
})
export class MyLoggerModule { }
