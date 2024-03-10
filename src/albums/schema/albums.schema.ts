import { z } from 'zod';

export const createAlbumSchema = z
  .object({
    name: z.string(),
    year: z.number(),
    artistId: z.string().nullable(),
  })
  .required();

export const updateAlbumSchema = createAlbumSchema.extend({});
