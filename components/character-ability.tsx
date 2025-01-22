import { Character } from '@/data/character'
import { Crown, Gavel } from 'lucide-react'

interface CharacterAbilityProps {
  ability: Character['abilities'][0]
}

export default function CharacterAbility({ ability }: CharacterAbilityProps) {
  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-1xl font-bold mb-1">
        {ability.name}
        {ability.enforced === true ? <Gavel /> : ''}
        {ability.ruler === true ? <Crown /> : ''}
      </h2>
      <p className="mt-2">{ability.description}</p>

      {ability.explanation && (
        <p>
          <strong>Explanation:</strong> {ability.explanation}
        </p>
      )}
    </div>
  )
}
