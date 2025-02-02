import { Suspense } from 'react'

export default function CardsPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <h1>Card Page</h1>
    </Suspense>
  )
}
