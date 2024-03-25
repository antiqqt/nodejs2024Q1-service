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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { createTrackSchema, updateTrackSchema } from './schema/tracks.schema';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTrackSchema))
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body(new ZodValidationPipe(updateTrackSchema))
    updateTrackDto: UpdateTrackDto,
  ) {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.tracksService.remove(id);
  }
}
