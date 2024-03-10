import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, Database],
})
export class AlbumsModule {}
