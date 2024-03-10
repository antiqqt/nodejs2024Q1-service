import { z } from 'zod';

export const createArtistSchema = z
  .object({
    name: z.string(),
    grammy: z.boolean(),
  })
  .required();

export const updateArtistSchema = createArtistSchema.extend({});
