import { Character } from "@/types/character";

export const wei: Character[] = [
  {
    id: "D00B9CFE-76B9-4C81-A85F-5A6EACCF740D",
    name: "Cáo Cāo 曹操",
    faction: "wei",
    imageUrl: "weicaocao.jpg",
    abilities: [
      {
        name: "Villainous Hero 奸雄 (jiān xióng)",
        description:
          "You can immediately acquire the card (or cards) that resulted in you suffering damage.",
      },
      {
        name: "Royal Escort 护驾 (hù jià)",
        description:
          "You can ask any Wei character 魏将 to use DODGE on your behalf where applicable.",
        ruler: true,
      },
    ],
    description:
      "Warrior Emperor of the Kingdom of Wei 魏武帝 (wèi wǔ dì)",
      explanation: [
        {
          name: "Example 1",
          description: "When he is the target of ATTACK 杀, Cao Cao can choose not use DODGE 闪, suffer the 1 unit of damage, and acquire the ATTACK card that was used."
        },
        {
          name: "Example 2",
          description: " When he is recipient of fire damage that has been transmitted via IRON SHACKLES 铁索连环, he receives the card that caused the fire damage even though he was not the initial target."
        },
        {
          name: "Example 3",
          description: "When he uses DODGE to evade an ATTACK but the attacker has equipped Stone Cleaving Axe 贯石斧 and chooses to discard 2 cards to cause damage anyways, Cao Cao suffers the damage but cannot pick up BOTH of the cards that were discarded to cause the damage. This is because the card that causes the damage is the ATTACK and not the discarded cards. Contrast this to the Serpent Halberd 丈八蛇矛, where the 2 cards used in that instance represents an ATTACK card, and thus Cao Cao can pick up both of those cards if he suffers damage."
        }
      ]
  },
];
