import { z } from 'zod';
import { createAlbumSchema } from '../schema/albums.schema';

export class CreateAlbumDto implements z.infer<typeof createAlbumSchema> {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
