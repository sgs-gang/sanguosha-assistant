import { Character } from "@/types/character";

export const wei: Character[] = [
  {
    id: "D00B9CFE-76B9-4C81-A85F-5A6EACCF740D",
    name: "Cáo Cāo 曹操",
    faction: "wei",
    imageUrl: "/sanguosha-assistant/characters/shualiubei.jpg",
    abilities: [
      {
        name: "Villainous Hero 奸雄 (jiān xióng)",
        description:
          "You can immediately acquire the card (or cards) that resulted in you suffering damage.",
      },
      {
        name: "Rouse 激将 (jī jiàng)",
        description:
          "You can ask any Shu 蜀 character that is in play to use an ATTACK 杀 card for you.",
        ruler: true,
      },
    ],
    description:
      "Warrior Emperor of the Kingdom of Wei 魏武帝 (wèi wǔ dì)",
  }
];
