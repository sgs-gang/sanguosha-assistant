'use client'

import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { characters } from '@/data/character'
import CharacterAbility from './character-ability'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import Image from 'next/image'

interface CharacterCardWrapperProps {
  slug: string
}

export default function CharacterCardWrapper({
  slug,
}: CharacterCardWrapperProps) {
  const character = characters.find(({ Slug }) => Slug === slug)
  const { favorites, toggleFavorite } = useFavorites()

  if (!character) {
    notFound()
  }

  const isFavorite = favorites.includes(character.Slug)

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 items-center md:items-stretch mb-4 md:mb-0">
        <div className="block md:hidden w-24">
          <div className="aspect-[7/10] relative">
            <Image
              src={`/sanguosha-assistant/import/${character.ImageUrl}`}
              width={441}
              height={645}
              alt={character.Name.Original}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl">{character.Name.English}</h1>
          {character.Description && (
            <h2 className="text-lg">{character.Description.English}</h2>
          )}
          <div className="flex flex-row items-center mb-2">
            <Breadcrumb className="grow">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/sanguosha-assistant/characters">
                    Characters
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{character.Name.English}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
                  isFavorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-400'
                }
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
        <div className="flex-1 md:flex-1">
          <div className="hidden md:block aspect-[7/10] relative mb-4">
            <Image
              src={`/sanguosha-assistant/import/${character.ImageUrl}`}
              width={441}
              height={645}
              alt={character.Name.Original}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 md:flex-1">
          {character.Abilities.map((ability, index) => (
            <CharacterAbility key={index} ability={ability} />
          ))}
          <Accordion type="single" collapsible>
            <AccordionItem value="Clarifications">
              <AccordionTrigger>Clarifications</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                  {character.Clarifications.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Strengths">
              <AccordionTrigger>Strengths</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                  {character.Strengths.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Weaknesses">
              <AccordionTrigger>Weaknesses</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                  {character.Weaknesses.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="NotableCombinations">
              <AccordionTrigger>Notable Combinations</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                  {character.NotableCombinations.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="FinalRemarks">
              <AccordionTrigger>Final Remarks</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                {character.FinalRemarks.map(item => (
                  <p key={item}>{item}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="RelationToHistory">
              <AccordionTrigger>Relation To History</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                {character.RelationToHistory.map(item => (
                  <p key={item}>{item}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
