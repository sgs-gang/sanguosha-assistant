export interface Character {
  id: string;
  name: string;
  faction: "shu" | "wei" | "wu" | "heroes" | "demi-gods";
  imageUrl: string;
  abilities: {
    name: string;
    description: string;
    ruler?: true;
    enforced?: true;
  }[];
  description?: string;
  explanation?: string;
}
