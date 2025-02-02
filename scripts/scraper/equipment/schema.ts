import { z } from 'zod'

export const basicSchema = z.object({
  Link: z.string().url(),
  Name: z.string(),
  Expansion: z.string(),
  Type: z.union([
    z.literal('Weapon'),
    z.literal('Armor'),
    z.literal('Horse'),
    z.literal('Treasure'),
  ]),
  Range: z
    .string()
    .optional()
    .transform(value => (value ? parseInt(value) : undefined)),
  Direction: z.preprocess(
    val => (val === '' ? undefined : val),
    z.enum(['Minus', 'Plus']).optional(),
  ),
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
  NotableCombinations: z.array(z.string()),
  FinalRemarks: z.array(z.string()),
  RelationToHistory: z.array(z.string()),
  Range: z.number().optional(),
  Direction: z.enum(['Minus', 'Plus']).optional(),
  Number: z.number(),
  Spade: z.array(z.string()),
  Club: z.array(z.string()),
  Diamond: z.array(z.string()),
  Heart: z.array(z.string()),
})
