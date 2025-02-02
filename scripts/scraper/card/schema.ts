import { z } from 'zod'

export const basicSchema = z.object({
  Link: z.string().url(),
  Name: z.string(),
  Expansion: z.string(),
  Type: z.union([
    z.literal('Basic'),
    z.literal('Tool'),
    z.literal('Delay Tool'),
  ]),
  Range: z
    .string()
    .optional()
    .transform(value => (value ? parseInt(value) : undefined)),
  Direction: z.preprocess(
    val => (val === '' ? undefined : val),
    z.enum(['Minus', 'Plus']).optional(),
  ),
  Total: z.string().transform(value => parseInt(value)),
  Number: z.string().transform(value => parseInt(value)),
  Spade: z.string().transform(value => (value != '' ? value.split(', ') : [])),
  Club: z.string().transform(value => (value != '' ? value.split(', ') : [])),
  Diamond: z
    .string()
    .transform(value => (value != '' ? value.split(', ') : [])),
  Heart: z.string().transform(value => (value != '' ? value.split(', ') : [])),
})

export const schema = basicSchema.extend({
  Slug: z.string(),
  ImageUrl: z.string(),
  Description: z.string(),
  Clarifications: z.array(z.string()),
})
