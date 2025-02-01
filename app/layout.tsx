import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'San Guo Sha Assistant',
  description: 'Helping you understand the game better',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
