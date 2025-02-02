import CharacterGallery from '@/components/character-gallery'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Characters | San Guo Sha Assistant',
}

export default function CharacterPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <CharacterGallery />
    </Suspense>
  )
}
