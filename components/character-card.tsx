'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Character } from '@/data/character'

interface CharacterCardProps {
  character: Character
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function CharacterCard({
  character,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 relative">
      <button
        className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
        onClick={e => {
          e.preventDefault()
          onToggleFavorite(character.id)
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star
          className={
            isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
          }
        />
      </button>
      <Link href={`/characters/${character.id}`}>
        <CardHeader className="p-0">
          <div className="aspect-[7/10] relative">
            <img
              src={
                character.imageUrl
                  ? `/sanguosha-assistant/characters/${character.imageUrl}`
                  : '/placeholder.svg'
              }
              alt={character.name}
              className="object-cover w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className="bg-white/50 p-4 absolute bottom-0 right-0 left-0 backdrop-blur-lg hidden md:flex">
          <h4 className="font-bold whitespace-nowrap text-ellipsis overflow-hidden text-center">
            {character.name}
          </h4>
        </CardContent>
      </Link>
    </Card>
  )
}
