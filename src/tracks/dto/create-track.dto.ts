import { z } from 'zod';
import { createTrackSchema } from '../schema/tracks.schema';
import { UUID } from 'src/common/interfaces';

export class CreateTrackDto implements z.infer<typeof createTrackSchema> {
  readonly name: string;
  readonly duration: number;
  readonly artistId: UUID | null;
  readonly albumId: UUID | null;
}
