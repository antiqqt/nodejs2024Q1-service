import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { ZodValidationPipe } from 'src/validation/zod-validation-pipe';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { createAlbumSchema, updateAlbumSchema } from './schema/albums.schema';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.albumsService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createAlbumSchema))
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body(new ZodValidationPipe(updateAlbumSchema))
    updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.albumsService.remove(id);
  }
}
