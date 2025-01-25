import { Character } from '@/data/character'
import { Crown, Gavel } from 'lucide-react'

interface CharacterAbilityProps {
  ability: Character['abilities'][0]
}

export default function CharacterAbility({ ability }: CharacterAbilityProps) {
  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-1xl font-bold mb-1">{ability.name}</h2>
      {ability.enforced === true || ability.ruler === true ? (
        <div className="flex items-center mt-0">
          {ability.enforced === true ? (
            <div className="flex items-center gap-1 rounded-md border border-slate-300 py-0.5 px-2.5 text-center text-sm transition-all shadow-sm text-slate-600">
              <Gavel size={16} />
              Enforced Ability
            </div>
          ) : (
            ''
          )}
          {ability.ruler === true ? (
            <div className="flex items-center gap-1 rounded-md border border-slate-300 py-0.5 px-2.5 text-center text-sm transition-all shadow-sm text-slate-600">
              <Crown size={16} />
              Ruler Ability
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <p className="mt-2">{ability.description}</p>

      {ability.explanation && (
        <p>
          <strong>Explanation:</strong> {ability.explanation}
        </p>
      )}
    </div>
  )
}
