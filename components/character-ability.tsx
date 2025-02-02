import { Character } from '@/data/character'
import { Crown } from 'lucide-react'

interface CharacterAbilityProps {
  ability: Character['Abilities'][0]
}

export default function CharacterAbility({ ability }: CharacterAbilityProps) {
  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-1xl font-bold mb-1">{ability.Name.English}</h2>
      {ability.King === true ? (
        <div className="flex items-center mt-0">
          <div className="flex items-center gap-1 rounded-md border border-slate-300 py-0.5 px-2.5 text-center text-sm transition-all shadow-sm text-slate-600">
            <Crown size={16} />
            Ruler Ability
          </div>
        </div>
      ) : (
        ''
      )}
      <p className="mt-2">{ability.Description}</p>
    </div>
  )
}
