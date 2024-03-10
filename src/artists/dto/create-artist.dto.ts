import { z } from 'zod';
import { createArtistSchema } from '../schema/artists.schema';

export class CreateArtistDto implements z.infer<typeof createArtistSchema> {
  readonly name: string;
  readonly grammy: boolean;
}
