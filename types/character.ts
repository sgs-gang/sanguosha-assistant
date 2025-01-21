export interface Character {
  id: number
  name: string
  faction: "shu" | "wei" | "wu" | "qun"
  imageUrl: string
  description?: string
}

