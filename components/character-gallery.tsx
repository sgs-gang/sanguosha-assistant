'use client'

import { useState, useEffect } from 'react'
import { CharacterCard } from './character-card'
import { useSearchParams } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { characters, alignments } from '@/data/character'
import { useFavorites } from '@/hooks/useFavorites'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

export default function CharacterGallery() {
  const [selectedAlignment, setSelectedAlignment] = useState('all')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()
  const searchParams = useSearchParams()

  useEffect(() => {
    const alignment = searchParams.get('alignment')
    const favoritesOnly = searchParams.get('favoritesOnly')
    if (alignment) {
      setSelectedAlignment(alignment)
    }
    if (favoritesOnly) {
      setShowOnlyFavorites(favoritesOnly === 'true')
    }
  }, [searchParams])

  const filteredCharacters = characters.filter(
    character =>
      (selectedAlignment === 'all' ||
        character.Alignment === selectedAlignment) &&
      (!showOnlyFavorites || favorites.includes(character.Slug)),
  )

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (favorites.includes(a.Slug) && !favorites.includes(b.Slug)) return -1
    if (!favorites.includes(a.Slug) && favorites.includes(b.Slug)) return 1
    return 0
  })

  const handleAlignmentChange = (value: string) => {
    setSelectedAlignment(value)
    updateURL(value, showOnlyFavorites)
  }

  const handleFavoritesToggle = (checked: boolean) => {
    setShowOnlyFavorites(checked)
    updateURL(selectedAlignment, checked)
  }

  const updateURL = (alignment: string, favoritesOnly: boolean) => {
    const params = new URLSearchParams()
    if (alignment !== 'all') params.set('alignment', alignment)
    if (favoritesOnly) params.set('favoritesOnly', 'true')
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`,
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-64 pb-4">
          <img src="/sanguosha-assistant/logo.png" />
        </div>
        <div className="flex flex-col items-center gap-4 mb-4 ">
          <ToggleGroup
            type="single"
            value={selectedAlignment}
            onValueChange={value => handleAlignmentChange(value || 'all')}
            className="flex gap-2 bg-white z-10 p-2"
          >
            {alignments.map(alignment => {
              const isSelected = selectedAlignment === alignment.value

              return (
                <ToggleGroupItem
                  key={alignment.value}
                  value={alignment.value}
                  className={`
                  py-2 flex items-center justify-center text-center
                  rounded-full w-[50px] h-[50px]
                  `}
                  style={{
                    backgroundColor: alignment.color,
                    color: '#fff',
                    outline: isSelected
                      ? `2px solid ${alignment.color}`
                      : 'none',
                    outlineOffset: isSelected ? '2px' : '0',
                  }}
                >
                  {alignment.label}
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

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4">
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
