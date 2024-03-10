import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { UUID } from 'src/common/interfaces';
import { Database } from 'src/database/database.provider';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: Database) {}

  findAll() {
    return this.db.albums;
  }

  findOne(id: UUID) {
    const album = this.db.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);

    this.db.albums.push(album);
    return album;
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException('Album not found');

    const updatedAlbum = { ...album, ...updateAlbumDto };
    this.db.albums = this.db.albums.map((a) => (a.id === id ? updatedAlbum : a));

    return updatedAlbum;
  }

  remove(id: UUID) {
    const trackIndex = this.db.albums.findIndex((a) => a.id === id);
    if (trackIndex < 0) throw new NotFoundException('Album not found');

    const [deletedAlbum] = this.db.albums.splice(trackIndex, 1);
    this.removeReferences(deletedAlbum.id);
  }

  private removeReferences(albumId: UUID) {
    this.db.tracks = this.db.tracks.map((t) =>
      t.albumId === albumId ? { ...t, albumId: null } : t,
    );
  }
}
