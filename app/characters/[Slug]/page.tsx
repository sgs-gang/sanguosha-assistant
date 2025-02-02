import CharacterCardWrapper from '@/components/character-card-wrapper'
import { characters } from '@/data/character'

export async function generateStaticParams() {
  const chars = characters.map(({ Slug }) => ({ Slug }))
  console.log(chars)
}

export default function CharacterPage({
  params,
}: {
  params: { Slug: string }
}) {
  console.log(params.Slug)
  return <CharacterCardWrapper slug={params.Slug} />
}
