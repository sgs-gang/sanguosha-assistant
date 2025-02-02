import z from 'zod'
import data from './import/character.json'
import { schema } from '@/scripts/scraper/character/schema'

export type Character = z.infer<typeof schema>

export const characters = schema.array().parse(data)

export const factions = [
  { value: 'all', label: 'All', color: '#000000' },
  { value: 'Shu', label: 'Shu', color: '#A7614A' },
  { value: 'Wei', label: 'Wei', color: '#444F7F' },
  { value: 'Wu', label: 'Wu', color: '#789664' },
  { value: 'Hero', label: 'Hero', color: '#7B767C' },
  { value: 'God', label: 'Gods', color: '#D0B260' },
]
