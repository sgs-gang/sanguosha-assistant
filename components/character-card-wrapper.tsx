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
  id: string
}

export default function CharacterCardWrapper({
  id,
}: CharacterCardWrapperProps) {
  const character = characters.find(c => c.id === id)
  const { favorites, toggleFavorite } = useFavorites()

  if (!character) {
    notFound()
  }

  const isFavorite = favorites.includes(character.id)

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">{character.name}</CardTitle>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(character.id)}
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
                character.imageUrl
                  ? `/sanguosha-assistant/characters/${character.imageUrl}`
                  : '/placeholder.svg'
              }
              alt={character.name}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          {character.description && (
            <p className="text-lg mb-4">{character.description}</p>
          )}

          {character.abilities.map((ability, index) => (
            <CharacterAbility key={index} ability={ability} />
          ))}

          <Button asChild>
            <Link href="/">Back to Gallery</Link>
          </Button>
          <Button asChild>
            <Link href={character.sourceUrl} target="_blank">
              Open Source
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
