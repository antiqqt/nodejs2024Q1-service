import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async indAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.favoritesService.removeArtist(id);
  }
}
