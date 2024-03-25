import { UUID } from 'src/common/interfaces';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'crypto';

export class Album {
  readonly id: UUID;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor({ name, year, artistId }: CreateAlbumDto) {
    this.id = randomUUID();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
