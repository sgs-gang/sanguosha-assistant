import CharacterCardWrapper from '@/components/character-card-wrapper'
import { characters } from '@/data/character'

export async function generateStaticParams() {
  return characters.map(({ id }) => ({ id }))
}

export default function CharacterPage({ params }: { params: { id: string } }) {
  return <CharacterCardWrapper id={params.id} />
}
