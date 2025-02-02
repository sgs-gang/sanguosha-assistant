import z from 'zod'
import data from './import/character.json'
import { extendedSchema } from '@/scripts/scraper/character'

export type Character = z.infer<typeof extendedSchema>

export const characters = extendedSchema.array().parse(data)

export const factions = [
  { value: 'all', label: 'All', color: '#000000' },
  { value: 'shu', label: 'Shu', color: '#A7614A' },
  { value: 'wei', label: 'Wei', color: '#444F7F' },
  { value: 'wu', label: 'Wu', color: '#789664' },
  { value: 'heroes', label: 'Hero', color: '#7B767C' },
  { value: 'demi-gods', label: 'Demi Gods', color: '#D0B260' },
]
