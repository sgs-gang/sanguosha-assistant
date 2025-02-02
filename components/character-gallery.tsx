'use client'

import { useState, useEffect } from 'react'
import { CharacterCard } from './character-card'
import { useSearchParams, useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { characters, factions } from '@/data/character'
import { useFavorites } from '@/hooks/useFavorites'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

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
      (selectedFaction === 'all' || character.Alignment === selectedFaction) &&
      (!showOnlyFavorites || favorites.includes(character.Slug)),
  )

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (favorites.includes(a.Slug) && !favorites.includes(b.Slug)) return -1
    if (!favorites.includes(a.Slug) && favorites.includes(b.Slug)) return 1
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
    <div className="container mx-auto p-4 ">
      <div className="flex flex-col items-center mb-8">
        <div className="w-64 pb-4">
          <img src="/sanguosha-assistant/logo.png" />
        </div>
        <div className="flex flex-col items-center gap-4 mb-4 ">
          <ToggleGroup
            type="single"
            value={selectedFaction}
            onValueChange={value => handleFactionChange(value || 'all')}
            className="flex gap-2 bg-white z-10 p-2"
          >
            {factions.map(faction => {
              const isSelected = selectedFaction === faction.value

              return (
                <ToggleGroupItem
                  key={faction.value}
                  value={faction.value}
                  className={`
             py-2 flex flex-1 items-center justify-center text-center
              transition-transform duration-200 ease-in
              rounded-full w-[50px] h-[50px]
              ${isSelected ? 'scale-110' : 'scale-100'}
            `}
                  style={{
                    backgroundColor: faction.color,
                    color: isSelected ? 'white' : 'white',
                  }}
                >
                  {faction.label}
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
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

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sortedCharacters.map(character => (
          <CharacterCard
            key={character.Slug}
            character={character}
            isFavorite={favorites.includes(character.Slug)}
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
