import * as cheerio from 'cheerio'
import { z } from 'zod'
import { extractBulletList } from '../lib/extractBulletList'
import { extractParagraphs } from '../lib/extractParagraphs'
import { getImageUrl } from '../lib/getImageUrl'
import { basicSchema, schema } from './schema'

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/15IrssRjwJQrH1GfrzLR0Q8fA0Q6vJqZgvU5Wpkc8FOE/export?format=csv'

export async function add(
  equipment: z.infer<typeof basicSchema>,
): Promise<z.infer<typeof schema>> {
  const body = await (await fetch(equipment.Link)).text()
  const $ = cheerio.load(body)
  const Name = $('.zfr3Q.duRjpb.CDt4Ke')
    .last()
    .text()
    .replace(/\n+/g, '')
    .trim()

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

  return {
    ...equipment,
    Name,
    Description,
    Slug,
    Clarifications,
    NotableCombinations,
    FinalRemarks,
    RelationToHistory,
    ImageUrl: await getImageUrl($, 'character', Slug),
  }
}
