import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: UUID) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({ where: { id }, data: updateAlbumDto });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }

  async remove(id: UUID) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Album not found');
    }
  }

  // private removeReferences(albumId: UUID) {
  //   this.db.tracks = this.db.tracks.map((t) =>
  //     t.albumId === albumId ? { ...t, albumId: null } : t,
  //   );

  //   if (this.db.favorites.albums.has(albumId)) this.db.favorites.albums.delete(albumId);
  // }
}
