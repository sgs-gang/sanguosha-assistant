import { Character } from '@/data/character'

interface CharacterAbilityProps {
  ability: Character['abilities'][0]
}

export default function CharacterAbility({ ability }: CharacterAbilityProps) {
  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-1xl font-bold">{ability.name}</h2>
      <p>{ability.description}</p>
      {ability.explanation && (
        <p>
          <strong>Explanation:</strong> {ability.explanation}
        </p>
      )}
      {ability.enforced && <p>Enforced</p>}
    </div>
  )
}
