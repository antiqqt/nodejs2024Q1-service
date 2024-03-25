import { z } from 'zod';
import { updateArtistSchema } from '../schema/artists.schema';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto
  extends CreateArtistDto
  implements z.infer<typeof updateArtistSchema> {}
