import { z } from 'zod';
import { updateTrackSchema } from '../schema/tracks.schema';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends CreateTrackDto implements z.infer<typeof updateTrackSchema> {}
