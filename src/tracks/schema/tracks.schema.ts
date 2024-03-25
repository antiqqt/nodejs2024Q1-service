import { z } from 'zod';

export const createTrackSchema = z.object({
  name: z.string(),
  duration: z.number(),
  artistId: z.string().nullable(),
  albumId: z.string().nullable(),
});

export const updateTrackSchema = createTrackSchema;
