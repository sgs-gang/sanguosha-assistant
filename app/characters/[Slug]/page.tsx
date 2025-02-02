import CharacterCardWrapper from '@/components/character-card-wrapper'
import { characters } from '@/data/character'

export async function generateStaticParams() {
  return characters.map(({ Slug }) => ({ Slug }))
}

export default function CharacterPage({
  params,
}: {
  params: { Slug: string }
}) {
  return <CharacterCardWrapper slug={params.Slug} />
}
