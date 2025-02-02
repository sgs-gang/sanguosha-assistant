import * as cheerio from 'cheerio'
import { z } from 'zod'
import { extractBulletList } from '../lib/extractBulletList'
import { getImageUrl } from '../lib/getImageUrl'
import { basicSchema, schema } from './schema'

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/1es_Jo1Fi4GuYZYy-2zhgRJuhGKsyt2YS_BaYLtZ1vY8/export?format=csv'

export async function add(
  card: z.infer<typeof basicSchema>,
): Promise<z.infer<typeof schema>> {
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
    Name: {
      English: Name.replaceAll(/[^A-Za-z ]/g, '').trim(),
      Chinese: Name.split(' ').at(-1) ?? '',
      Original: Name,
    },
    Description,
    Slug,
    Clarifications,
    ImageUrl: await getImageUrl($, 'card', Slug),
  }
}
