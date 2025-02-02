import { z } from 'zod'
import { parse } from 'async-csv'
import { get, isEqual } from 'lodash'

export async function getList<T>(
  url: string,
  schema: z.ZodType<T>,
): Promise<T[]> {
  const res = await fetch(url, {
    method: 'get',
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    },
  })

  const data = await parse(await res.text(), {
    columns: true,
    skip_empty_lines: true,
  })

  return schema.array().parse(
    data.filter(
      value =>
        !isEqual(value, {
          Link: '',
          Name: '',
          Expansion: '',
          Alignment: '',
          Ruler: 'FALSE',
          Health: '',
          Gender: '',
        }) && get(value, 'Link') !== '',
    ),
  )
}
