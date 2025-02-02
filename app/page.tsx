import CharacterGallery from '@/components/gallery'

import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <CharacterGallery />
    </Suspense>
  )
}
