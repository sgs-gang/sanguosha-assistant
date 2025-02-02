'use client'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { Character } from '@/data/character'
import CharacterAbility from './character-ability'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import Image from 'next/image'
import { Equipment } from '@/data/equipment'
import { Card } from '@/data/card'

interface ShowProps {
  item: Character | Equipment | Card
}

export default function Show({ item }: ShowProps) {
  const { favorites, toggleFavorite } = useFavorites()

  const isFavorite = favorites.includes(item.Slug)

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 items-center md:items-stretch mb-4 md:mb-0">
        <div className="block md:hidden w-24">
          <div className="aspect-[7/10] relative">
            <Image
              src={`/sanguosha-assistant/import/${item.ImageUrl}`}
              width={441}
              height={645}
              alt={item.Name.Original}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl">{item.Name.English}</h1>
          {item.Description && (
            <h2 className="text-lg">
              {typeof item.Description === 'string'
                ? item.Description
                : item.Description.English}
            </h2>
          )}
          <div className="flex flex-row items-center mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(item.Slug)}
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
              src={`/sanguosha-assistant/import/${item.ImageUrl}`}
              width={441}
              height={645}
              alt={item.Name.Original}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 md:flex-1">
          {'Abilities' in item &&
            item.Abilities.map((ability, index) => (
              <CharacterAbility key={index} ability={ability} />
            ))}
          <Accordion type="single" collapsible>
            <AccordionItem value="Clarifications">
              <AccordionTrigger>Clarifications</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                  {item.Clarifications.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            {'Strengths' in item && (
              <AccordionItem value="Strengths">
                <AccordionTrigger>Strengths</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                    {item.Strengths.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            {'Weaknesses' in item && (
              <AccordionItem value="Weaknesses">
                <AccordionTrigger>Weaknesses</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                    {item.Weaknesses.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            {'NotableCombinations' in item && (
              <AccordionItem value="NotableCombinations">
                <AccordionTrigger>Notable Combinations</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-outside ml-5 flex flex-col space-y-2">
                    {item.NotableCombinations.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            {'FinalRemarks' in item && (
              <AccordionItem value="FinalRemarks">
                <AccordionTrigger>Final Remarks</AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-2">
                  {item.FinalRemarks.map(item => (
                    <p key={item}>{item}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
            {'RelationToHistory' in item && (
              <AccordionItem value="RelationToHistory">
                <AccordionTrigger>Relation To History</AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-2">
                  {item.RelationToHistory.map(item => (
                    <p key={item}>{item}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
