import z from 'zod'
import data from './import/card.json'
import { schema } from '@/scripts/scraper/equipment/schema'

export type Equipment = z.infer<typeof schema>

export const equipments = schema.array().parse(data)
