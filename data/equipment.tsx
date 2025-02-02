import z from 'zod'
import data from './import/equipment.json'
import { schema } from '@/scripts/scraper/equipment/schema'
import { Filter } from './filter'
import { Shield, Swords, Shovel, Magnet } from 'lucide-react'

export type Equipment = z.infer<typeof schema>

export const equipments = schema.array().parse(data)

export const filters: Filter<Equipment>[] = [
  {
    name: 'Type',
    defaultValue: 'all',
    options: [
      { value: 'all', label: 'All', color: '#000000' },
      { value: 'Weapon', label: <Swords />, color: '#A7614A' },
      { value: 'Armor', label: <Shield />, color: '#444F7F' },
      { value: 'Horse', label: <Magnet />, color: '#789664' },
      { value: 'Treasure', label: <Shovel />, color: '#7B767C' },
    ],
  },
]
