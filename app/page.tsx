import CharacterGallery from "../components/character-gallery";

export default function Home({
  searchParams,
}: {
  searchParams: { faction?: string; favoritesOnly?: string };
}) {
  return <CharacterGallery />;
}
