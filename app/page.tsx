import CharacterGallery from "../character-gallery"

export default function Home({
  searchParams,
}: {
  searchParams: { faction?: string; favoritesOnly?: string }
}) {
  return <CharacterGallery />
}

