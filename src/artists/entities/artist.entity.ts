import { UUID } from 'src/common/interfaces';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'crypto';

export class Artist {
  readonly id: UUID;
  name: string;
  grammy: boolean;

  constructor({ name, grammy }: CreateArtistDto) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = grammy;
  }
}
