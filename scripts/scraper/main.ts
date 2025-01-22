import * as cheerio from 'cheerio'
import { writeFile, createWriteStream, existsSync } from 'node:fs'
import { Character } from '@/data/character'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'
import colors from 'ansi-colors'
import { MultiBar } from 'cli-progress'

async function saveImage(url: string, filename: string) {
  const path = `public/characters/${filename}`
  if (existsSync(path)) return
  const stream = createWriteStream(path)
  const { body } = await fetch(url)
  if (body == null) throw new Error('Failed to fetch image')
  await finished(Readable.fromWeb(body as ReadableStream<any>).pipe(stream))

  return
}
async function performScraping(url: string) {
  return await (await fetch(url)).text()
}

async function getCharacterUrls() {
  const data = await performScraping(
    'https://sanguoshaenglish.blogspot.com/p/all-characters.html',
  )

  const characterLinks: Record<string, string[]> = {
    shu: [],
    wei: [],
    wu: [],
    heroes: [],
    demiGods: [],
  }
  const $ = cheerio.load(data)
  $('div.separator')
    .eq(0)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`,
    )
    .each((_i, element) => {
      const href = $(element)
        .attr('href')
        ?.replace(/^http:\/\//, 'https://')
      if (href != null) characterLinks.shu.push(href)
    })

  $('div.separator')
    .eq(1)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`,
    )
    .each((_i, element) => {
      const href = $(element).attr('href')
      if (href != null) characterLinks.wei.push(href)
    })

  $('div.separator')
    .eq(2)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`,
    )
    .each((_i, element) => {
      const href = $(element).attr('href')
      if (href != null) characterLinks.wu.push(href)
    })

  $('div.separator')
    .eq(3)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`,
    )
    .each((_i, element) => {
      const href = $(element).attr('href')
      if (href != null) characterLinks.heroes.push(href)
    })

  $('div.separator')
    .eq(4)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`,
    )
    .each((_i, element) => {
      const href = $(element).attr('href')
      if (href != null) characterLinks.demiGods.push(href)
    })

  return characterLinks
}

async function addCharacter(
  url: string,
  faction: Character['faction'],
): Promise<Character> {
  const body = await performScraping(url)
  const $ = cheerio.load(body)
  const name = $('h2.post-title').text().replace(/\n+/g, '').trim()

  const imageUrl = $('div.post-body img').first().attr('src')
  if (imageUrl == null) throw new Error('Image not found')

  // const text = $('div.post-body').text()
  const slug = url.match(/\/([^/]*)\.html$/)?.[1]
  if (slug == null) throw new Error('Slug not found')

  const filename = `${slug}.jpg`
  await saveImage(imageUrl, filename)

  return {
    id: slug,
    name,
    faction,
    imageUrl: filename,
    // text,
    abilities: [],
  }
}

async function pullCharacters(
  urls: string[],
  faction: Character['faction'],
  multibar: MultiBar,
) {
  const progress = multibar.create(
    urls.length,
    0,
    { name: faction },
    { clearOnComplete: true },
  )
  const characters: Character[] = []
  for (const url of urls) {
    const character = await addCharacter(url, faction)
    progress.increment()
    characters.push(character)
  }
  writeFile(
    `data/scraped/${faction}.json`,
    JSON.stringify(characters, null, 2),
    function (err) {
      if (err) throw err
    },
  )
  progress.stop()
}

async function main(): Promise<void> {
  const multibar = new MultiBar({
    format: `${colors.cyan(
      '{bar}',
    )} {name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: true,
  })
  const characterURLs = await getCharacterUrls()
  await Promise.all([
    pullCharacters(characterURLs.shu, 'shu', multibar),
    pullCharacters(characterURLs.wei, 'wei', multibar),
    pullCharacters(characterURLs.wu, 'wu', multibar),
    pullCharacters(characterURLs.heroes, 'heroes', multibar),
    pullCharacters(characterURLs.demiGods, 'demi-gods', multibar),
  ])
  multibar.stop()
}

main()
