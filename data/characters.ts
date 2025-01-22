import { Character } from '@/types/character'
import { shu } from './faction/shu'
import { wei } from './faction/wei'
import { heroes } from './faction/heroes'
import { wu } from './faction/wu'

export const characters: Character[] = [...shu, ...wei, ...wu, ...heroes]

export const factions = [
  { value: 'all', label: 'All Factions' },
  { value: 'shu', label: 'Shu Kingdom (Red)' },
  { value: 'wei', label: 'Wei Kingdom (Blue)' },
  { value: 'wu', label: 'Wu Kingdom (Green)' },
  { value: 'heroes', label: 'Heros (Grey)' },
  { value: 'demi-gods', label: 'Demi Gods (Gold)' },
]
