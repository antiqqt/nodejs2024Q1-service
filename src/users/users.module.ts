import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Database],
})
export class UsersModule {}
