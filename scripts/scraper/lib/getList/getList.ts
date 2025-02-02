import { z } from 'zod'
import { parse } from 'async-csv'

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

  const data = await parse(await res.text(), { columns: true })
  data.splice(-2)

  return schema.array().parse(data)
}
