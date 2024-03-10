import { Injectable } from '@nestjs/common';
import type { Album } from 'src/albums/entities/album.entity';
import type { Artist } from 'src/artists/entities/artist.entity';
import type { Track } from 'src/tracks/entities/track.entity';
import type { User } from 'src/users/entities/user.entity';

@Injectable()
export class Database {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}
