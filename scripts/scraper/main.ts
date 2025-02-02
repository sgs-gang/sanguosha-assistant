import colors from 'ansi-colors'
import { SingleBar } from 'cli-progress'
import { chunk } from 'lodash'
import { writeFile } from 'node:fs'
import {
  LIST_URL as CHARACTER_LIST_URL,
  schema as characterSchema,
  extendedSchema as characterExtendedSchema,
  add as addCharacter,
} from './character'
import {
  LIST_URL as EQUIPMENT_LIST_URL,
  schema as equipmentSchema,
  extendedSchema as equipmentExtendedSchema,
  add as addEquipment,
} from './equipment'
import {
  LIST_URL as CARD_LIST_URL,
  schema as cardSchema,
  extendedSchema as cardExtendedSchema,
  add as addCards,
} from './card'
import { z } from 'zod'
import { getList } from './lib/getList'

async function pull<T, R>(
  name: string,
  listUrl: string,
  schema: z.ZodType<T>,
  extendedSchema: z.ZodType<R>,
  addItem: (item: T) => Promise<R>,
): Promise<void> {
  const bar = new SingleBar({
    format: `${colors.cyan(
      '{bar}',
    )} ${name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  })
  const items = await getList(listUrl, schema)

  bar.start(items.length, 0)
  const chunks = chunk(items, 1)
  const writeableItems: R[] = []
  for await (const chunk of chunks) {
    const results = await Promise.all(
      chunk.map(async item => {
        const extendedItem = await addItem(item)
        bar.increment()
        return extendedItem
      }),
    )
    writeableItems.push(...results)
  }

  writeFile(
    `data/import/${name}.json`,
    JSON.stringify(writeableItems, null, 2),
    function (err) {
      if (err) throw err
    },
  )
  bar.stop()
}

async function main(): Promise<void> {
  // await pull('character', CHARACTER_LIST_URL, characterSchema, characterExtendedSchema, addCharacter)
  await pull(
    'equipment',
    EQUIPMENT_LIST_URL,
    equipmentSchema,
    equipmentExtendedSchema,
    addEquipment,
  )
  await pull('card', CARD_LIST_URL, cardSchema, cardExtendedSchema, addCards)
}

main()
