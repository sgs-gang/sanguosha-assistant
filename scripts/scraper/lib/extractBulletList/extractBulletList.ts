import * as cheerio from 'cheerio'

export function extractBulletList(
  $: cheerio.CheerioAPI,
  title: string,
): string[] {
  const elements = $('.qUO6Ue').filter(function () {
    return $(this).text().startsWith(title)
  })

  const list: string[] = []

  elements.find('ul li').each((_, element) => {
    list.push($(element).text())
  })

  return list
}
