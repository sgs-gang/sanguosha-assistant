import Show from '@/components/show'
import { cards } from '@/data/card'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return cards.map(({ Slug }) => ({ Slug }))
}

interface Props {
  params: { Slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const Slug = (await params).Slug

  const card = cards.find(card => card.Slug === Slug)!

  return {
    title: `${card.Name} | San Guo Sha Assistant`,
    openGraph: {
      images: [card.ImageUrl],
    },
  }
}

export default function CardPage({ params }: Props) {
  const Slug = params.Slug

  const item = cards.find(card => card.Slug === Slug)

  if (!item) {
    return <div>404</div>
  }
  return <Show item={item} />
}
