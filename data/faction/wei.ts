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
          explanation: "Example 1 - When he is the target of ATTACK 杀, Cao Cao can choose not use DODGE 闪, suffer the 1 unit of damage, and acquire the ATTACK card that was used. \n\nExample 2 - When he is recipient of fire damage that has been transmitted via IRON SHACKLES 铁索连环, he receives the card that caused the fire damage even though he was not the initial target. \nExample 3 (complex scenario) - When he uses DODGE to evade an ATTACK but the attacker has equipped Stone Cleaving Axe 贯石斧 and chooses to discard 2 cards to cause damage anyways, Cao Cao suffers the damage but cannot pick up BOTH of the cards that were discarded to cause the damage. This is because the card that causes the damage is the ATTACK and not the discarded cards. Contrast this to the Serpent Halberd 丈八蛇矛, where the 2 cards used in that instance represents an ATTACK card, and thus Cao Cao can pick up both of those cards if he suffers damage."
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
  },
  {
    id: "D54E3881-09A0-49FB-9457-448596EB88E7",
    name: "Guō Jiā 郭嘉",
    faction: "wei",
    imageUrl: "weiguojia.jpg",
    abilities: [
      {
        name: "Envy of Heaven 天妒 (tiān dù)",
        description: "You can obtain any judgement card that you flip over.",
        explanation: "(For example, every time he undergoes judgement for LIGHTNING 闪电 during his turn, he can keep the judgement card that he flipped over. However if he uses ATTACK 杀 on a player that equipped EIGHT TRIGRAMS 八卦阵, Guo Jia cannot keep the judgement card for judgement of EIGHT TRIGRAMS because that card would be flipped over by the target player and not himself.)"
      },
      {
        name: "Bequeathed Strategy 遗计 (yí jì)",
        description: "For every 1 unit of damage that you receive, you can draw 2 cards from the deck. You can then choose to give away one, two, or none of these 2 cards to any player."
      }
    ],
    description: "The oracle who died young 早终的先知 (zao zhong de xian zhi)",
  },
  {
    id: "B411B662-10B2-422A-B581-5E05E771FB64",
    name: "Sī Mǎ Yì 司马懿",
    faction: "wei",
    imageUrl: "weisimayi.jpg",
    abilities: [
      {
        name:"Retaliation 反馈 (fǎn kuì)",
        description: "When you receive any damage, you can obtain 1 card (whether on-hand or equipped) from the player who is the source of the damage."
      }
    ]
  }
]
;
