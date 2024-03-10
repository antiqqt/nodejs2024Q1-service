import { z } from 'zod';
import { CreateAlbumDto } from './create-album.dto';
import { updateAlbumSchema } from '../schema/albums.schema';

export class UpdateAlbumDto extends CreateAlbumDto implements z.infer<typeof updateAlbumSchema> {}
