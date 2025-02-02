'use client'

import { Card as UiCard, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Equipment } from '@/data/equipment'
import { CardProps } from './gallery'
import { Card } from '@/data/card'

export function PlayingCard({
  basePath,
  item,
  isFavorite,
  onToggleFavorite,
}: CardProps<Equipment | Card>) {
  return (
    <UiCard className="overflow-hidden transition-transform hover:scale-105 relative">
      <button
        className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
        onClick={e => {
          e.preventDefault()
          onToggleFavorite(item.Slug)
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star
          className={
            isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
          }
        />
      </button>
      <Link href={`/${basePath}/${item.Slug}`}>
        <CardHeader className="p-0">
          <Image
            src={`/sanguosha-assistant/import/${item.ImageUrl}`}
            width={441}
            height={645}
            alt={item.Name.Original}
          />
        </CardHeader>
      </Link>
    </UiCard>
  )
}
