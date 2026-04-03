import { z } from 'zod';

export const vinSchema = z.object({
  vin: z
    .string()
    .min(1, 'VIN is required')
    .length(17, 'VIN must be exactly 17 characters')
    .regex(/^[A-Z0-9]+$/, 'VIN must contain only uppercase letters and numbers')
});

export type VinFormData = z.infer<typeof vinSchema>;