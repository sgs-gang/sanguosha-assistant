import * as cheerio from 'cheerio'
import { z } from 'zod'
import { extractBulletList } from '../lib/extractBulletList'
import { extractParagraphs } from '../lib/extractParagraphs'
import { getImageUrl } from '../lib/getImageUrl'
import { basicSchema, schema } from './schema'
import { each } from 'lodash'

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

  let Abilities: { Name: string; Description: string; King: boolean }[] = []
  $('div.tyJCtd.mGzaTb.Depvyb.baZpAe')
    .eq(3)
    .find('ul li')
    .each((i, li) => {
      let Ability: {
        Name: string
        Description: string
        King: boolean
      } = { Name: '', Description: '', King: false }
      const name = $(li).find('span.C9DxTc').first().text().trim()
      if (name == null) throw new Error('Ability name not found')
      Ability.Name = name
      $(li)
        .find('span.C9DxTc:not(:first-child)')
        .each((i, span) => {
          Ability.Description += $(span).text().trim()
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
    ...character,
    Name,
    Description,
    Slug,
    Clarifications,
    NotableCombinations,
    FinalRemarks,
    RelationToHistory,
    ImageUrl: await getImageUrl($, 'character', Slug),
    Abilities,
  }
}
