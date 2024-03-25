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
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.albumsService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createAlbumSchema))
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body(new ZodValidationPipe(updateAlbumSchema))
    updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.albumsService.remove(id);
  }
}
