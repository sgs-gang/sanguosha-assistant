import z from 'zod'
import data from './import/card.json'
import { extendedSchema } from '@/scripts/scraper/equipment'

export type Equipment = z.infer<typeof extendedSchema>

export const equipments = extendedSchema.array().parse(data)
