import { CharacterCard } from '@/components/character-card'
import Gallery from '@/components/gallery'
import { characters, filters } from '@/data/character'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Characters | San Guo Sha Assistant',
}

export default function CharacterPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Gallery
        basePath="characters"
        list={characters}
        filters={filters}
        Card={CharacterCard}
      />
    </Suspense>
  )
}
