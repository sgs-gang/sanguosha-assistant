import z from 'zod'
import data from './import/card.json'
import { schema } from '@/scripts/scraper/card/schema'
import { Filter } from './filter'
import { Book, Wrench, Timer } from 'lucide-react'

export type Card = z.infer<typeof schema>

export const cards = schema.array().parse(data)

export const filters: Filter<Card>[] = [
  {
    name: 'Type',
    defaultValue: 'all',
    options: [
      { value: 'all', label: 'All', color: '#000000' },
      { value: 'Basic', label: <Book />, color: '#A7614A' },
      { value: 'Tool', label: <Wrench />, color: '#444F7F' },
      { value: 'Delay Tool', label: <Timer />, color: '#789664' },
    ],
  },
]
