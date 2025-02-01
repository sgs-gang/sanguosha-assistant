import * as cheerio from 'cheerio'
import { createWriteStream, existsSync } from 'node:fs'
import { Character } from '@/data/character'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'
import colors from 'ansi-colors'
import { SingleBar } from 'cli-progress'
import { parse } from 'async-csv'
import { z } from 'zod'
import { chunk } from 'lodash'

async function saveImage(url: string, filename: string) {
  const path = `public/characters/${filename}`
  if (existsSync(path)) return
  const stream = createWriteStream(path)
  const { body } = await fetch(url)
  if (body == null) throw new Error('Failed to fetch image')
  await finished(Readable.fromWeb(body as ReadableStream<any>).pipe(stream))

  return
}

const characterSchema = z.object({
  Link: z.string().url(),
  Name: z.string(),
  Expansion: z.string(),
  Alignment: z.union([
    z.literal('Shu'),
    z.literal('Wei'),
    z.literal('Wu'),
    z.literal('Hero'),
    z.literal('God'),
    z.literal('Wraith'),
    z.literal('Demon'),
  ]),
  Ruler: z.boolean(),
  Health: z.number(),
  Gender: z.union([z.literal('Male'), z.literal('Female')]),
})

async function getCharacters() {
  const res = await fetch(
    'https://docs.google.com/spreadsheets/d/1TpJgrXqAixnPKwR9oWuEgY3FnMNCtVImLQ5rDpYmRYY/export?format=csv',
    {
      method: 'get',
      headers: {
        'content-type': 'text/csv;charset=UTF-8',
      },
    },
  )

  const data = await parse(await res.text())

  return characterSchema.array().parse(data)
}

async function addCharacter(
  character: z.infer<typeof characterSchema>,
): Promise<Character> {
  const body = await (await fetch(character.Link)).text()
  const $ = cheerio.load(body)
  const name = $('h2.post-title').text().replace(/\n+/g, '').trim()

  const imageUrl = $('div.post-body img').first().attr('src')
  if (imageUrl == null) throw new Error('Image not found')

  const slug = character.Link.match(/\/([^/]*)\.html$/)?.[1]
  if (slug == null) throw new Error('Slug not found')

  const description = $('div.post-body')
    .text()
    .trim()
    .replace(/\n+/g, '\n')
    .match(/Translated [Dd]escription:?\s*\n[“"]?(?<description>[^"”\n]*)["”]?/)
    ?.groups?.description
  if (description == null)
    throw new Error('Description not found', { cause: url })

  const abilities: Character['abilities'] = $('b')
    .filter(function () {
      return $(this).text().trim().startsWith('Character ability')
    })
    .map((_, element) => {
      const heading = $(element).text()
      const name =
        heading.match(/[“"](?<name>.*)["”]/)?.groups?.name?.trim() ??
        heading.split(/[“"]/)[1]?.trim() ??
        heading.split(/:/)[1]?.trim()
      if (name == null)
        throw new Error('Ability name not found', { cause: heading })

      // const [description, explanation] = $(element)
      //   .parent()
      //   .clone() //clone the element
      //   .children() //select all the children
      //   .remove() //remove all the children
      //   .end() //again go back to selected element
      //   .text()
      //   .trim()
      //   .replace(/\n+/g, '\n')
      //   .split('\n', 2)

      const [description, ...explanations] = $(element)
        .nextUntil('b:not(:has(> *)):not(:empty)')
        .text()
        .trim()
        .replace(/\n+/g, '\n')
        .split('\n')

      const enforced = heading.includes('[Enforced ability]')
      const ruler = heading.includes('[Ruler ability]')

      return {
        name,
        description,
        explanation: explanations.join('\n'),
        enforced,
        ruler,
      }
    })
    .toArray()

  const filename = `${slug}.jpg`
  await saveImage(imageUrl, filename)

  return {
    id: slug,
    name,
    description,
    faction,
    imageUrl: filename,
    abilities,
    sourceUrl: character.Link,
  }
}

async function main(): Promise<void> {
  const bar = new SingleBar({
    format: `${colors.cyan(
      '{bar}',
    )} {name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: true,
  })
  const characters = await getCharacters()

  bar.start(characters.length, 0)

  const chunks = chunk(characters, 10)

  for await (const chunk of chunks) {
    await Promise.all(chunk.map(character => await addCharacter(character)))
  }

  bar.stop()
}

main()
