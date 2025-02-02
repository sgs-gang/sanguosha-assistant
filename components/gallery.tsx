'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useFavorites } from '@/hooks/useFavorites'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import Image from 'next/image'
import { get } from 'lodash'
import { Filter } from '@/data/filter'

interface Props<T> {
  list: T[]
  filters: Filter<T>[]
  basePath: string
  Card: React.FC<CardProps<T>>
}

export interface CardProps<T> {
  basePath: string
  item: T
  isFavorite: boolean
  onToggleFavorite: (Slug: string) => void
}

export default function Gallery<T extends { Slug: string }>({
  list,
  filters,
  Card,
  basePath,
}: Props<T>) {
  const [selectedFilters, setSelectedFilters] = useState(
    filters.reduce(
      (acc, cur) => ({ ...acc, [cur.name]: cur.defaultValue }),
      {} as { [key: string]: string },
    ),
  )
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()
  const searchParams = useSearchParams()

  useEffect(() => {
    filters.forEach(({ name }) => {
      const value = searchParams.get(name)
      if (value) {
        setSelectedFilters(prev => ({ ...prev, [name]: value }))
      }
    })
    const favoritesOnly = searchParams.get('favoritesOnly')
    if (favoritesOnly) {
      setShowOnlyFavorites(favoritesOnly === 'true')
    }
  }, [filters, searchParams])

  const filteredList = list.filter(item => {
    return (
      Object.entries(selectedFilters).every(
        ([key, value]) => get(item, key) === value || value === 'all',
      ) &&
      (!showOnlyFavorites || favorites.includes(item.Slug))
    )
  })

  const handleAlignmentChange = (filterName: string, value: string) => {
    const updatedSelectedFilters = { ...selectedFilters, [filterName]: value }
    setSelectedFilters(updatedSelectedFilters)
    updateURL(updatedSelectedFilters, showOnlyFavorites)
  }

  const handleFavoritesToggle = (checked: boolean) => {
    setShowOnlyFavorites(checked)
    updateURL(selectedFilters, checked)
  }

  const updateURL = (
    selectedFilters: { [key: string]: string },
    favoritesOnly: boolean,
  ) => {
    const params = new URLSearchParams()
    Object.entries(selectedFilters).every(([key, value]) => {
      if (value !== 'all') params.set(key, value)
    })
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
          <Image
            src="/sanguosha-assistant/logo.png"
            width={1855}
            height={835}
            alt="logo"
          />
        </div>
        <div className="flex flex-col items-center gap-4 mb-4 ">
          {filters.map((filter, index) => (
            <ToggleGroup
              key={filter.name ? filter.name : index}
              type="single"
              value={selectedFilters[filter.name]}
              onValueChange={value =>
                handleAlignmentChange(filter.name, value || 'all')
              }
              className="flex gap-2 bg-white z-10 p-2"
            >
              {filter.options.map(option => {
                const isSelected = selectedFilters[filter.name] === option.value

                return (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className={`
                  py-2 flex items-center justify-center text-center
                  rounded-full w-[50px] h-[50px]
                  `}
                    style={{
                      backgroundColor: option.color,
                      color: '#fff',
                      outline: isSelected
                        ? `2px solid ${option.color}`
                        : '2px solid transparent',
                      outlineOffset: '2px',
                      transition: 'outline-color 0.2s ease-in-out',
                    }}
                  >
                    {option.label}
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
          ))}
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
        {filteredList.map(item => (
          <Card
            basePath={basePath}
            key={item.Slug}
            item={item}
            isFavorite={favorites.includes(item.Slug)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {filteredList.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          {showOnlyFavorites
            ? 'No favorite characters found.'
            : 'No characters found.'}
        </p>
      )}
    </div>
  )
}
