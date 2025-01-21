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
  },
  {
    id: "D54E3881-09A0-49FB-9457-448596EB88E7",
    name: "Guō Jiā 郭嘉",
    faction: "wei",
    imageUrl: "weiguojia.jpg",
    abilities: [
      {
        name: "Envy of Heaven 天妒 (tiān dù)",
        description: "You can obtain any judgement card that you flip over. \n "
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
