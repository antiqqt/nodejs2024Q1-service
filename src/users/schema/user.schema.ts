import { z } from 'zod';

export const createUserSchema = z
  .object({
    login: z.string(),
    password: z.string(),
  })
  .required();

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
  })
  .required();
