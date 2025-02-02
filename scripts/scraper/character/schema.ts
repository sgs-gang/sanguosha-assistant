import { z } from 'zod'

export const basicSchema = z.object({
  Link: z.string().url(),
  Name: z.string(),
  Expansion: z.string(),
  Alignment: z.union([
    z.literal('Shu'),
    z.literal('Wei'),
    z.literal('Wu'),
    z.literal('Hero'),
    z.literal('God'),
    z.literal('Wraith'),
    z.literal('Demon'),
  ]),
  Ruler: z.string().transform(value => (value === 'TRUE' ? true : false)),
  Health: z.string().transform(value => parseInt(value)),
  Gender: z.union([z.literal('Male'), z.literal('Female')]),
})

export const schema = basicSchema.extend({
  Name: z.object({
    English: z.string(),
    Chinese: z.string(),
    Original: z.string(),
  }),
  Slug: z.string(),
  ImageUrl: z.string(),
  Description: z.object({
    English: z.string(),
    Chinese: z.string(),
    Original: z.string(),
  }),
  Clarifications: z.array(z.string()),
  NotableCombinations: z.array(z.string()),
  FinalRemarks: z.array(z.string()),
  RelationToHistory: z.array(z.string()),
  Strengths: z.array(z.string()),
  Weaknesses: z.array(z.string()),
  Health: z.number(),
  Ruler: z.boolean(),
  Abilities: z.array(
    z.object({
      Name: z.object({
        English: z.string(),
        Chinese: z.string(),
        Original: z.string(),
      }),
      Description: z.string(),
      King: z.boolean(),
    }),
  ),
})
