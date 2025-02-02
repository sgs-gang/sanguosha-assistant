'use client'
import './globals.css'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  function handleClick(value: string) {
    router.push(`/${value}`)
  }
  return (
    <html lang="en">
      <body>
        <Theme>
          <Tabs
            defaultValue="account"
            className="w-full"
            onValueChange={handleClick}
          >
            <TabsList className="w-full">
              <TabsTrigger value="characters">Characters</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
            </TabsList>
          </Tabs>
          {children}
        </Theme>
      </body>
    </html>
  )
}
