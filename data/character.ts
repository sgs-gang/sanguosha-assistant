import z from 'zod'
import demiGods from './scraped/demi-gods.json'
import heroes from './scraped/heroes.json'
import shu from './scraped/shu.json'
import wei from './scraped/wei.json'
import wu from './scraped/wu.json'

const schema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    faction: z.union([
      z.literal('demi-gods'),
      z.literal('heroes'),
      z.literal('shu'),
      z.literal('wei'),
      z.literal('wu'),
    ]),
    imageUrl: z.string(),
    abilities: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        explanation: z.string().optional(),
        ruler: z.boolean().optional(),
        enforced: z.boolean().optional(),
      }),
    ),
    description: z.string().optional(),
    sourceUrl: z.string(),
  }),
)

export type Character = z.infer<typeof schema>[0]

export const characters: Character[] = [
  ...schema.parse(shu),
  ...schema.parse(wei),
  ...schema.parse(wu),
  ...schema.parse(heroes),
  ...schema.parse(demiGods),
]

export const factions = [
  { value: 'all', label: 'All', color: '#000000' },
  { value: 'shu', label: 'Shu', color: '#A7614A' },
  { value: 'wei', label: 'Wei', color: '#444F7F' },
  { value: 'wu', label: 'Wu', color: '#789664' },
  { value: 'heroes', label: 'Hero', color: '#7B767C' },
  { value: 'demi-gods', label: 'Demi Gods', color: '#D0B260' },
]
