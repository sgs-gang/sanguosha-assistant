import * as cheerio from 'cheerio'
import { createWriteStream, existsSync } from 'node:fs'
import { Character } from '@/data/character'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'
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
  Health: z.string().transform(value => Number(value)),
  Gender: z
    .union([z.literal('Male'), z.literal('Female')])
    .transform(value => value.toLowerCase()),
})

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/1TpJgrXqAixnPKwR9oWuEgY3FnMNCtVImLQ5rDpYmRYY/export?format=csv'

export async function add(
  character: z.infer<typeof schema>,
): Promise<Character> {
  const name = character.Name
  const slug = character.Name.toLowerCase().replace(/\s+/g, '-')
  const gender = character.Gender

  const body = await (await fetch(character.Link)).text()
  const $ = cheerio.load(body)

  const description = $('div.tyJCtd.mGzaTb.Depvyb.baZpAe').text()

  console.log(description)

  const imageUrl = $('img.CENy8b').attr('src')
  // if (imageUrl == null) throw new Error('Image not found')

  const filename = `${slug}.jpg`
  // await saveImage(imageUrl, filename)

  return {
    id: slug,
    name,
    gender,
    description,
    // faction,
    imageUrl: filename,
    // abilities,
    sourceUrl: character.Link,
  }
}
