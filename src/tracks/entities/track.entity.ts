import { randomUUID } from 'crypto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UUID } from 'src/common/interfaces';

export class Track {
  readonly id: UUID; // uuid v4
  name: string;
  artistId: UUID | null; // refers to Artisst
  albumId: UUID | null; // refers to Album
  duration: number; // integer number

  constructor({ name, duration, artistId, albumId }: CreateTrackDto) {
    this.id = randomUUID();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
