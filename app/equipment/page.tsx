import { Suspense } from 'react'

export default function EquipmentPage() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <h1>Equipment Page</h1>
    </Suspense>
  )
}
