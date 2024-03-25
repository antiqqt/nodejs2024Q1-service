import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: UUID) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: new Track(createTrackDto) });
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');

    return await this.prisma.track.update({ where: { id }, data: updateTrackDto });
  }

  async remove(id: UUID) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Track not found');
    }
  }
}
