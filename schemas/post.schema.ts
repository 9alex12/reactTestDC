import { z } from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),

  body: z
    .string()
    .min(1, 'El contenido es obligatorio')
    .max(500, 'Máximo 500 caracteres'),
});

export type PostFormValuesSchema = z.infer<typeof postSchema>;