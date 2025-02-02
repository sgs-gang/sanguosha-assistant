'use client'

import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { characters } from '@/data/character'
import CharacterAbility from './character-ability'

interface CharacterCardWrapperProps {
  slug: string
}

export default function CharacterCardWrapper({
  slug,
}: CharacterCardWrapperProps) {
  const character = characters.find(c => c.Slug === slug)
  const { favorites, toggleFavorite } = useFavorites()

  if (!character) {
    notFound()
  }

  const isFavorite = favorites.includes(character.Slug)

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">{character.Name}</CardTitle>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(character.Slug)}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Star
              className={
                isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              }
            />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="aspect-[7/10] relative mb-4">
            <img
              src={
                character.ImageUrl
                  ? `/sanguosha-assistant/import/${character.ImageUrl}`
                  : '/placeholder.svg'
              }
              alt={character.Name}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          {character.Description && (
            <p className="text-lg mb-4">{character.Description}</p>
          )}

          {character.Abilities.map((ability, index) => (
            <CharacterAbility key={index} ability={ability} />
          ))}

          <Button asChild>
            <Link href="/">Back to Gallery</Link>
          </Button>
          <Button asChild>
            <Link href={character.Link} target="_blank">
              Open Source
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
