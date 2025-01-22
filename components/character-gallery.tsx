'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CharacterCard } from './character-card'
import { useSearchParams, useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { characters, factions } from '@/data/character'
import { useFavorites } from '@/hooks/useFavorites'

export default function CharacterGallery() {
  const [selectedFaction, setSelectedFaction] = useState('all')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const faction = searchParams.get('faction')
    const favoritesOnly = searchParams.get('favoritesOnly')
    if (faction) {
      setSelectedFaction(faction)
    }
    if (favoritesOnly) {
      setShowOnlyFavorites(favoritesOnly === 'true')
    }
  }, [searchParams])

  const filteredCharacters = characters.filter(
    character =>
      (selectedFaction === 'all' || character.faction === selectedFaction) &&
      (!showOnlyFavorites || favorites.includes(character.id)),
  )

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (favorites.includes(a.id) && !favorites.includes(b.id)) return -1
    if (!favorites.includes(a.id) && favorites.includes(b.id)) return 1
    return 0
  })

  const handleFactionChange = (value: string) => {
    setSelectedFaction(value)
    updateURL(value, showOnlyFavorites)
  }

  const handleFavoritesToggle = (checked: boolean) => {
    setShowOnlyFavorites(checked)
    updateURL(selectedFaction, checked)
  }

  const updateURL = (faction: string, favoritesOnly: boolean) => {
    const params = new URLSearchParams()
    if (faction !== 'all') params.set('faction', faction)
    if (favoritesOnly) params.set('favoritesOnly', 'true')
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">San Guo Sha Characters</h1>

        <div className="flex items-center gap-4 mb-4">
          <Select onValueChange={handleFactionChange} value={selectedFaction}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select faction" />
            </SelectTrigger>
            <SelectContent>
              {factions.map(faction => (
                <SelectItem key={faction.value} value={faction.value}>
                  {faction.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch
              id="favorites-mode"
              checked={showOnlyFavorites}
              onCheckedChange={handleFavoritesToggle}
            />
            <Label htmlFor="favorites-mode">Show only favorites</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sortedCharacters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={favorites.includes(character.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          {showOnlyFavorites
            ? 'No favorite characters found for the selected faction.'
            : 'No characters found for the selected faction.'}
        </p>
      )}
    </div>
  )
}
