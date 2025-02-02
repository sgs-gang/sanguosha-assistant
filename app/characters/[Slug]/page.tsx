import { metadata } from '@/app/layout'
import Character from '@/components/character'
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
    title: `${character.Name} | ${metadata.title}`,
    openGraph: {
      images: [character.ImageUrl],
    },
  }
}

export default function CharacterPage({ params }: Props) {
  return <Character slug={params.Slug} />
}
