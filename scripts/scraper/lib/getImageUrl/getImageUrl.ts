import * as cheerio from 'cheerio'
import { createWriteStream, existsSync } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ReadableStream } from 'node:stream/web'

export async function getImageUrl(
  $: cheerio.CheerioAPI,
  type: string,
  slug: string,
): Promise<string> {
  const url = $('img.CENy8b').attr('src')
  if (url == null) throw new Error('Image not found')

  const path = `/${type}/${slug}.jpg`
  const dirPath = `public/import${path}`
  if (existsSync(dirPath)) return path
  const stream = createWriteStream(dirPath)
  const { body } = await fetch(url)
  if (body == null) throw new Error('Failed to fetch image')
  await finished(Readable.fromWeb(body as ReadableStream).pipe(stream))

  return path
}
