import z from 'zod'
import data from './import/card.json'
import { schema } from '@/scripts/scraper/card/schema'

export type Card = z.infer<typeof schema>

export const cards = schema.array().parse(data)
