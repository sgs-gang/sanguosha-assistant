import CharacterGallery from "@/components/character-gallery";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { faction?: string; favoritesOnly?: string };
}) {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <CharacterGallery />
    </Suspense>
  );
}
