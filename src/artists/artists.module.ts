import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, Database],
})
export class ArtistsModule {}
