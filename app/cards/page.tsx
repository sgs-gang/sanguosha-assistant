import Gallery from '@/components/gallery'
import { PlayingCard } from '@/components/playing-card'
import { cards, filters } from '@/data/card'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Cards | San Guo Sha Assistant',
}

export default function EquipmentPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Gallery
        basePath="cards"
        list={cards}
        filters={filters}
        Card={PlayingCard}
      />
    </Suspense>
  )
}
