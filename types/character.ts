export interface Character {
  id: number;
  name: string;
  faction: "shu" | "wei" | "wu" | "heroes" | "demi-gods";
  imageUrl: string;
  abilities: { name: string; description: string }[];
  description?: string;
}
