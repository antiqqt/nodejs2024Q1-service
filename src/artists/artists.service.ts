import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/common/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: UUID) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: new Artist(createArtistDto) });
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...artist, ...updateArtistDto },
    });

    return updatedArtist;
  }

  async remove(id: UUID) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Artist not found');
    }
  }
}
