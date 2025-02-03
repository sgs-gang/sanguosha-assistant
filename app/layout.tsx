import './globals.css'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

import { TabNavigation } from '@/components/tab-navigation'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Suspense>
            <TabNavigation />
          </Suspense>
          {children}
        </Theme>
      </body>
    </html>
  )
}
