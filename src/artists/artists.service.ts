import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/common/interfaces';

@Injectable()
export class ArtistsService {
  artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: UUID) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);

    this.artists.push(artist);
    return artist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = { ...artist, ...updateArtistDto };
    this.artists = this.artists.map((a) => (a.id === id ? updatedArtist : a));

    return updatedArtist;
  }

  remove(id: UUID) {
    const trackIndex = this.artists.findIndex((a) => a.id === id);
    if (trackIndex < 0) throw new NotFoundException('Artist not found');

    this.artists.splice(trackIndex, 1);
  }
}
