import colors from 'ansi-colors'
import { SingleBar } from 'cli-progress'
import { chunk } from 'lodash'
import { writeFile } from 'node:fs'
import {
  basicSchema as characterBasicSchema,
  schema as characterSchema,
} from './character/schema'
import {
  LIST_URL as CHARACTER_LIST_URL,
  add as addCharacter,
} from './character/add'
import {
  basicSchema as equipmentBasicSchema,
  schema as equipmentSchema,
} from './equipment/schema'
import {
  LIST_URL as EQUIPMENT_LIST_URL,
  add as addEquipment,
} from './equipment/add'
import {
  basicSchema as cardBasicSchema,
  schema as cardSchema,
} from './card/schema'
import { LIST_URL as CARD_LIST_URL, add as addCards } from './card/add'
import { z } from 'zod'
import { getList } from './lib/getList'

async function pull<T extends z.ZodTypeAny, R extends z.ZodTypeAny>(
  name: string,
  listUrl: string,
  basicSchema: T,
  schema: R,
  addItem: (item: z.infer<T>) => Promise<z.infer<R>>,
): Promise<void> {
  const bar = new SingleBar({
    format: `${colors.cyan(
      '{bar}',
    )} ${name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  })
  const items = await getList(listUrl, basicSchema)

  bar.start(items.length, 0)
  const chunks = chunk(items, 1)
  const writeableItems: R[] = []
  for await (const chunk of chunks) {
    const results = await Promise.all(
      chunk.map(async item => {
        const extendedItem = await addItem(item)
        schema.parse(extendedItem)
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
  await pull(
    'character',
    CHARACTER_LIST_URL,
    characterBasicSchema,
    characterSchema,
    addCharacter,
  )
  await pull(
    'equipment',
    EQUIPMENT_LIST_URL,
    equipmentBasicSchema,
    equipmentSchema,
    addEquipment,
  )
  await pull('card', CARD_LIST_URL, cardBasicSchema, cardSchema, addCards)
}

main()
