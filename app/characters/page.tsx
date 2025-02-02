import CharacterGallery from '@/components/character-gallery'
import { Suspense } from 'react'

export default function CharacterPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <CharacterGallery />
    </Suspense>
  )
}
