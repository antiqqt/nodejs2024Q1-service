import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { Database } from 'src/database/database.provider';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: Database) {}

  findAll() {
    return {
      artists: this.db.artists.filter((a) => this.db.favorites.artists.has(a.id)),
      albums: this.db.albums.filter((a) => this.db.favorites.albums.has(a.id)),
      tracks: this.db.tracks.filter((t) => this.db.favorites.tracks.has(t.id)),
    };
  }

  addTrack(id: UUID) {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) throw new UnprocessableEntityException();

    this.db.favorites.tracks.add(id);
  }

  removeTrack(id: UUID) {
    const isFavorite = this.db.favorites.tracks.has(id);
    if (!isFavorite) throw new NotFoundException();

    this.db.favorites.tracks.delete(id);
  }

  addAlbum(id: UUID) {
    const album = this.db.albums.find((a) => a.id === id);
    if (!album) throw new UnprocessableEntityException();

    this.db.favorites.albums.add(id);
  }

  removeAlbum(id: UUID) {
    const isFavorite = this.db.favorites.albums.has(id);
    if (!isFavorite) throw new NotFoundException();

    this.db.favorites.albums.delete(id);
  }

  addArtist(id: UUID) {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) throw new UnprocessableEntityException();

    this.db.favorites.artists.add(id);
  }

  removeArtist(id: UUID) {
    const isFavorite = this.db.favorites.artists.has(id);
    if (!isFavorite) throw new NotFoundException();

    this.db.favorites.artists.delete(id);
  }
}
