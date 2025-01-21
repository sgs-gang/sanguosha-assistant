import type { Character } from "../types/character"

export const characters: Character[] = [
  {
    id: 1,
    name: "Liu Bei",
    faction: "shu",
    imageUrl: "placeholder.svg?height=400&width=280",
    description: "The warlord and founding emperor of Shu Han",
  },
  {
    id: 2,
    name: "Guan Yu",
    faction: "shu",
    imageUrl: "placeholder.svg?height=400&width=280",
    description: "The God of War, sworn brother of Liu Bei",
  },
  // Add more characters...
]

export const factions = [
  { value: "all", label: "All Factions" },
  { value: "shu", label: "Shu Kingdom" },
  { value: "wei", label: "Wei Kingdom" },
  { value: "wu", label: "Wu Kingdom" },
  { value: "qun", label: "Qun (Others)" },
]

