import { z } from 'zod'
import { schema } from './schema'

const alignments = ['Shu', 'Wei', 'Wu', 'Hero', 'God', 'Wraith', 'Demon']

export function sort(character: z.infer<typeof schema>): string {
  const index = alignments.indexOf(character.Alignment)
  return `${index >= 0 ? index : alignments.length}:${character.Name}`
}
