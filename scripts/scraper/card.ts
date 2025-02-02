import * as cheerio from 'cheerio'
import { z } from 'zod'
import { extractBulletList } from './lib/extractBulletList'
import { getImageUrl } from './lib/getImageUrl'

export const schema = z.object({
  Link: z.string().url(),
  Name: z.string(),
  Expansion: z.string(),
  Type: z.union([
    z.literal('Basic'),
    z.literal('Tool'),
    z.literal('Delay Tool'),
  ]),
  Range: z
    .string()
    .optional()
    .transform(value => (value ? parseInt(value) : undefined)),
  Direction: z.preprocess(
    val => (val === '' ? undefined : val),
    z.enum(['Minus', 'Plus']).optional(),
  ),
  Total: z.string().transform(value => parseInt(value)),
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
})

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/1es_Jo1Fi4GuYZYy-2zhgRJuhGKsyt2YS_BaYLtZ1vY8/export?format=csv'

export async function add(
  card: z.infer<typeof schema>,
): Promise<z.infer<typeof extendedSchema>> {
  const body = await (await fetch(card.Link)).text()
  const $ = cheerio.load(body)
  const Name = $('.zfr3Q.duRjpb.CDt4Ke')
    .last()
    .text()
    .replace(/\n+/g, '')
    .trim()

  const Slug = card.Link.split('/').slice(-1)[0]
  if (Slug == null) throw new Error('Slug not found')

  const Description = $(
    '.hJDwNd-AhqUyc-OiUrBf.Ft7HRd-AhqUyc-OiUrBf.jXK9ad.D2fZ2.zu5uec.wHaque.g5GTcb',
  )
    .last()
    .text()
    .trim()
    .replace(/\n+/g, '\n')
  if (Description == null)
    throw new Error('Description not found', { cause: card.Link })

  const Clarifications: string[] = extractBulletList($, 'Clarification')

  return {
    ...card,
    Name,
    Description,
    Slug,
    Clarifications,
    ImageUrl: await getImageUrl($, 'card', Slug),
  }
}
