import Show from '@/components/show'
import { characters } from '@/data/character'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return characters.map(({ Slug }) => ({ Slug }))
}

interface Props {
  params: { Slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const Slug = (await params).Slug

  const character = characters.find(character => character.Slug === Slug)!

  return {
    title: `${character.Name} | San Guo Sha Assistant`,
    openGraph: {
      images: [character.ImageUrl],
    },
  }
}

export default function CharacterPage({ params }: Props) {
  const Slug = params.Slug

  const item = characters.find(character => character.Slug === Slug)

  if (!item) {
    return <div>404</div>
  }
  return <Show item={item} />
}
