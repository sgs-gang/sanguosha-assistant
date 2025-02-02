import Gallery from '@/components/gallery'
import { PlayingCard } from '@/components/playing-card'
import { equipments, filters } from '@/data/equipment'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Equipment | San Guo Sha Assistant',
}

export default function EquipmentPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Gallery
        basePath="equipment"
        list={equipments}
        filters={filters}
        Card={PlayingCard}
      />
    </Suspense>
  )
}
