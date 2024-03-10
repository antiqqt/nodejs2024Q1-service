import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/common/interfaces';
import { Database } from 'src/database/database.provider';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: Database) {}

  findAll() {
    return this.db.artists;
  }

  findOne(id: UUID) {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);

    this.db.artists.push(artist);
    return artist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = { ...artist, ...updateArtistDto };
    this.db.artists = this.db.artists.map((a) => (a.id === id ? updatedArtist : a));

    return updatedArtist;
  }

  remove(id: UUID) {
    const trackIndex = this.db.artists.findIndex((a) => a.id === id);
    if (trackIndex < 0) throw new NotFoundException('Artist not found');

    const [deletedArtist] = this.db.artists.splice(trackIndex, 1);
    this.removeReferences(deletedArtist.id);
  }

  private removeReferences(artistId: UUID) {
    this.db.tracks = this.db.tracks.map((t) =>
      t.artistId === artistId ? { ...t, artistId: null } : t,
    );

    this.db.albums = this.db.albums.map((a) =>
      a.artistId === artistId ? { ...a, artistId: null } : a,
    );

    if (this.db.favorites.artists.has(artistId)) this.db.favorites.artists.delete(artistId);
  }
}
