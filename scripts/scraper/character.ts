import * as cheerio from 'cheerio'
import { createWriteStream, existsSync } from 'node:fs'
import { Character } from '@/data/character'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'
import { parse } from 'async-csv'
import { z } from 'zod'

async function saveImage(url: string, filename: string) {
  const path = `public/characters/${filename}`
  if (existsSync(path)) return
  const stream = createWriteStream(path)
  const { body } = await fetch(url)
  if (body == null) throw new Error('Failed to fetch image')
  await finished(Readable.fromWeb(body as ReadableStream<any>).pipe(stream))

  return
}

export const schema = z.object({
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
  Ruler: z
    .union([z.literal('FALSE'), z.literal('TRUE')])
    .transform(value => (value === 'TRUE' ? true : false)),
  Health: z.string().transform(value => value.replace(/,/g, '')),
  Gender: z
    .union([z.literal('Male'), z.literal('Female')])
    .transform(value => value.toLowerCase()),
})

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/1TpJgrXqAixnPKwR9oWuEgY3FnMNCtVImLQ5rDpYmRYY/export?format=csv'

export async function add(
  character: z.infer<typeof schema>,
): Promise<Character> {
  const body = await (await fetch(character.Link)).text()
  const $ = cheerio.load(body)
  const name = $('h2.post-title').text().replace(/\n+/g, '').trim()

  const imageUrl = $('div.post-body img').first().attr('src')
  if (imageUrl == null) throw new Error('Image not found')

  const slug = character.Name.toLowerCase().replace(/\s+/g, '-')

  const description = $('div.post-body')
    .text()
    .trim()
    .replace(/\n+/g, '\n')
    .match(/Translated [Dd]escription:?\s*\n[“"]?(?<description>[^"”\n]*)["”]?/)
    ?.groups?.description
  if (description == null)
    throw new Error('Description not found', { cause: character.Link })

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
