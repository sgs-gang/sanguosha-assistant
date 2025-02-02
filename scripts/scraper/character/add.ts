import * as cheerio from 'cheerio'
import { z } from 'zod'
import { extractBulletList } from '../lib/extractBulletList'
import { extractParagraphs } from '../lib/extractParagraphs'
import { getImageUrl } from '../lib/getImageUrl'
import { basicSchema, schema } from './schema'

export const LIST_URL =
  'https://docs.google.com/spreadsheets/d/1TpJgrXqAixnPKwR9oWuEgY3FnMNCtVImLQ5rDpYmRYY/export?format=csv'

export async function add(
  character: z.infer<typeof basicSchema>,
): Promise<z.infer<typeof schema>> {
  const body = await (await fetch(character.Link)).text()
  const $ = cheerio.load(body)
  const Name = $('.zfr3Q.duRjpb.CDt4Ke')
    .last()
    .text()
    .replace(/\n+/g, '')
    .trim()

  const RemoteImageUrl = $('img.CENy8b').attr('src')
  if (RemoteImageUrl == null) throw new Error('Image not found')

  const Slug = character.Link.split('/').slice(-1)[0]
  if (Slug == null) throw new Error('Slug not found')

  const Description = $('div.tyJCtd.mGzaTb.Depvyb.baZpAe').eq(2).text()
  if (Description == null)
    throw new Error('Description not found', { cause: character.Link })

  const Abilities: z.infer<typeof schema>['Abilities'] = []
  $('div.tyJCtd.mGzaTb.Depvyb.baZpAe')
    .eq(3)
    .find('ul li')
    .each((_i, li) => {
      const Ability: (typeof Abilities)[0] = {
        Name: {
          English: '',
          Chinese: '',
          Original: '',
        },
        Description: '',
        King: false,
      }
      const name = $(li).find('span.C9DxTc').first().text().trim()
      if (name == null) throw new Error('Ability name not found')
      Ability.Name = {
        English: name.replaceAll(/[^A-Za-z ]/g, '').trim(),
        Chinese: name.split(' ').at(-1) ?? '',
        Original: name,
      }
      $(li)
        .find('span.C9DxTc:not(:first-child)')
        .each((i, span) => {
          Ability.Description += $(span).text()
        })
      if (Ability.Description == '')
        throw new Error('Ability Description not found')

      if (Ability.Description.includes('King Ability')) {
        Ability.King = true
        Ability.Description.replace('King Ability: ', '')
      }

      Abilities.push(Ability)
    })

  const Clarifications: string[] = extractBulletList($, 'Clarification')
  const Strengths: string[] = extractBulletList($, 'Strengths')
  const Weaknesses: string[] = extractBulletList($, 'Weaknesses')
  const NotableCombinations: string[] = extractBulletList(
    $,
    'Notable Combinations',
  )
  const FinalRemarks: string[] = extractParagraphs($, 'Final Remarks')
  const RelationToHistory: string[] = extractParagraphs(
    $,
    'Relation to History',
  )

  return {
    ...character,
    Name: {
      English: Name.replaceAll(/[^A-Za-z ]/g, '').trim(),
      Chinese: Name.split(' ').at(-1) ?? '',
      Original: Name,
    },
    Description: {
      English: Description.replaceAll(/[^A-Za-z ]/g, '').trim(),
      Chinese: Description.split(' ').at(-1) ?? '',
      Original: Description,
    },
    Slug,
    Clarifications,
    Strengths,
    Weaknesses,
    NotableCombinations,
    FinalRemarks,
    RelationToHistory,
    ImageUrl: await getImageUrl($, 'character', Slug),
    Abilities,
  }
}
