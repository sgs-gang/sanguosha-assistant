import * as cheerio from 'cheerio'
import { createWriteStream, existsSync } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'
import { z } from 'zod'
import { extractBulletList } from './lib/extractBulletList'
import { extractParagraphs } from './lib/extractParagraphs'

async function saveImage(url: string, filename: string) {
  const path = `public/equipments/${filename}`
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
  Type: z.union([
    z.literal('Weapon'),
    z.literal('Armor'),
    z.literal('Horse'),
    z.literal('Treasure'),
  ]),
  Range: z
    .string()
    .optional()
    .transform(value => (value ? parseInt(value) : undefined)),
  Direction: z.preprocess(
    val => (val === '' ? undefined : val),
    z.enum(['Minus', 'Plus']).optional(),
  ),
  Number: z.string().transform(value => parseInt(value)),
  Spade: z.string().transform(value => (value != '' ? value.split(', ') : [])),
  Club: z.string().transform(value => (value != '' ? value.split(', ') : [])),
  Diamond: z
    .string()
    .transform(value => (value != '' ? value.split(', ') : [])),
  Heart: z.string().transform(value => (value != '' ? value.split(', ') : [])),
})

export const extendedSchema = schema.extend({
  Slug: z.string(),
  ImageUrl: z.string(),
  Description: z.string(),
  Clarifications: z.array(z.string()),
  NotableCombinations: z.array(z.string()),
  FinalRemarks: z.array(z.string()),
  RelationToHistory: z.array(z.string()),
})

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/15IrssRjwJQrH1GfrzLR0Q8fA0Q6vJqZgvU5Wpkc8FOE/export?format=csv'

export async function add(
  equipment: z.infer<typeof schema>,
): Promise<z.infer<typeof extendedSchema>> {
  const body = await (await fetch(equipment.Link)).text()
  const $ = cheerio.load(body)
  const Name = $('.zfr3Q.duRjpb.CDt4Ke')
    .last()
    .text()
    .replace(/\n+/g, '')
    .trim()

  const RemoteImageUrl = $('img.CENy8b').attr('src')
  if (RemoteImageUrl == null) throw new Error('Image not found')

  const Slug = equipment.Link.split('/').slice(-1)[0]
  if (Slug == null) throw new Error('Slug not found')

  const Description = $(
    '.hJDwNd-AhqUyc-OiUrBf.Ft7HRd-AhqUyc-OiUrBf.jXK9ad.D2fZ2.zu5uec.wHaque.g5GTcb',
  )
    .last()
    .text()
    .trim()
    .replace(/\n+/g, '\n')
  if (Description == null)
    throw new Error('Description not found', { cause: equipment.Link })

  const Clarifications: string[] = extractBulletList($, 'Clarification')
  const NotableCombinations: string[] = extractBulletList(
    $,
    'Notable Combinations',
  )
  const FinalRemarks: string[] = extractParagraphs($, 'Final Remarks')
  const RelationToHistory: string[] = extractParagraphs(
    $,
    'Relation To History',
  )

  const Filename = `${Slug}.jpg`
  await saveImage(RemoteImageUrl, Filename)

  return {
    ...equipment,
    Name,
    Description,
    Slug,
    Clarifications,
    NotableCombinations,
    FinalRemarks,
    RelationToHistory,
    ImageUrl: `/equipments/${Filename}`,
  }
}
