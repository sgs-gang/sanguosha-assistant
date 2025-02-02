'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactElement } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'

export function TabNavigation(): ReactElement {
  const searchParams = useSearchParams()
  const params = searchParams.toString()

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="characters">
          <NextLink href={`/characters?${params}`}>Characters</NextLink>
        </TabsTrigger>
        <TabsTrigger value="cards">
          <NextLink href={`/cards?${params}`}>Cards</NextLink>
        </TabsTrigger>
        <TabsTrigger value="equipment">
          <NextLink href={`/equipment?${params}`}>Equipment</NextLink>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
