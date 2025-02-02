import z from 'zod'
import data from './import/card.json'
import { extendedSchema } from '@/scripts/scraper/card'

export type Card = z.infer<typeof extendedSchema>

export const cards = extendedSchema.array().parse(data)
