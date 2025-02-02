import Show from '@/components/show'
import { equipments } from '@/data/equipment'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return equipments.map(({ Slug }) => ({ Slug }))
}

interface Props {
  params: { Slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const Slug = (await params).Slug

  const equipment = equipments.find(equipment => equipment.Slug === Slug)!

  return {
    title: `${equipment.Name} | San Guo Sha Assistant`,
    openGraph: {
      images: [equipment.ImageUrl],
    },
  }
}

export default function EquipmentPage({ params }: Props) {
  const Slug = params.Slug

  const item = equipments.find(equipment => equipment.Slug === Slug)

  if (!item) {
    return <div>404</div>
  }
  return <Show item={item} />
}
