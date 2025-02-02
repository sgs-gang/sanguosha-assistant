import { ReactElement } from 'react'

export interface Filter<T> {
  name: keyof T & string
  defaultValue: string
  options: { value: string; label: string | ReactElement; color?: string }[]
}
