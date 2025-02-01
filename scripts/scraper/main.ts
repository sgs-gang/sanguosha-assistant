import colors from 'ansi-colors'
import { SingleBar } from 'cli-progress'
import { chunk } from 'lodash'
import {
  LIST_URL as CHARACTER_LIST_URL,
  schema as characterSchema,
  add as addCharacter,
} from './character'
import {
  LIST_URL as EQUIPMENT_LIST_URL,
  schema as equipmentSchema,
  add as addEquipment,
} from './equipment'
import {
  LIST_URL as CARD_LIST_URL,
  schema as cardSchema,
  add as addCards,
} from './card'
import { z } from 'zod'
import { getList } from './lib/getList'

async function pull<T>(
  listUrl: string,
  schema: z.ZodType<T>,
  addItem: (item: T) => Promise<unknown>,
): Promise<void> {
  const bar = new SingleBar({
    format: `${colors.cyan(
      '{bar}',
    )} {name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: true,
  })
  const items = await getList(listUrl, schema)

  bar.start(items.length, 0)
  const chunks = chunk(items, 10)
  for await (const chunk of chunks) {
    await Promise.all(
      chunk.map(async item => {
        await addItem(item)
        bar.increment()
      }),
    )
  }
  bar.stop()
}

async function main(): Promise<void> {
  // await pull(CHARACTER_LIST_URL, characterSchema, addCharacter)
  await pull(EQUIPMENT_LIST_URL, equipmentSchema, addEquipment)
  // await pull(CARD_LIST_URL, cardSchema, addCards)
}

main()
