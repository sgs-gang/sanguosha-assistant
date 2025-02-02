'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactElement } from 'react'
import NextLink from 'next/link'

export function TabNavigation(): ReactElement {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="characters">
          <NextLink href={`/characters`}>Characters</NextLink>
        </TabsTrigger>
        <TabsTrigger value="cards">
          <NextLink href={`/cards`}>Cards</NextLink>
        </TabsTrigger>
        <TabsTrigger value="equipment">
          <NextLink href={`/equipment`}>Equipment</NextLink>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
