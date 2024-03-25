import { Module } from '@nestjs/common';
import { Database } from './database.provider';

@Module({
  exports: [Database],
  providers: [Database],
})
export class DatabaseModule {}
