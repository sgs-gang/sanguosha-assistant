import './globals.css'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

import { TabNavigation } from '@/components/tab-navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <TabNavigation />
          {children}
        </Theme>
      </body>
    </html>
  )
}
