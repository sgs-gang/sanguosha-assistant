import Character from '@/components/character'
import { characters } from '@/data/character'

export async function generateStaticParams() {
  return characters.map(({ Slug }) => ({ Slug }))
}

export default function CharacterPage({
  params,
}: {
  params: { Slug: string }
}) {
  return <Character slug={params.Slug} />
}
