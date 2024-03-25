import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { transformExcludeIsFavorite } from './favorites.utils';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const favorites = await Promise.all([
      this.prisma.album.findMany({ where: { isFavorite: true } }),
      this.prisma.artist.findMany({ where: { isFavorite: true } }),
      this.prisma.track.findMany({ where: { isFavorite: true } }),
    ]);

    return {
      albums: favorites[0].map(transformExcludeIsFavorite),
      artists: favorites[1].map(transformExcludeIsFavorite),
      tracks: favorites[2].map(transformExcludeIsFavorite),
    };
  }

  async addTrack(id: UUID) {
    try {
      await this.prisma.track.update({ where: { id }, data: { isFavorite: true } });
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrack(id: UUID) {
    try {
      await this.prisma.track.update({ where: { id }, data: { isFavorite: false } });
    } catch {
      throw new NotFoundException();
    }
  }

  async addAlbum(id: UUID) {
    try {
      await this.prisma.album.update({ where: { id }, data: { isFavorite: true } });
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async removeAlbum(id: UUID) {
    try {
      await this.prisma.album.update({ where: { id }, data: { isFavorite: false } });
    } catch {
      throw new NotFoundException();
    }
  }

  async addArtist(id: UUID) {
    try {
      await this.prisma.artist.update({ where: { id }, data: { isFavorite: true } });
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtist(id: UUID) {
    try {
      await this.prisma.artist.update({ where: { id }, data: { isFavorite: false } });
    } catch {
      throw new NotFoundException();
    }
  }
}
