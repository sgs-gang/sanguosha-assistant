export interface Character {
  id: string
  name: string
  faction: 'shu' | 'wei' | 'wu' | 'heroes' | 'demi-gods'
  imageUrl: string
  abilities: {
    name: string
    description: string
    explanation?: string
    ruler?: true
    enforced?: true
  }[]
  description?: string
}
