import { Character } from "@/types/character";
import { shu } from "./faction/shu";

export const characters: Character[] = [...shu];

export const factions = [
  { value: "all", label: "All Factions" },
  { value: "shu", label: "Shu Kingdom (Red)" },
  { value: "wei", label: "Wei Kingdom (Blue)" },
  { value: "wu", label: "Wu Kingdom (Green)" },
  { value: "heroes", label: "Heros (Grey)" },
  { value: "demi-gods", label: "Demi Gods (Gold)" },
];
