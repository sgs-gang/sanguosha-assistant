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
        explanation: "For example, every time he undergoes judgement for LIGHTNING 闪电 during his turn, he can keep the judgement card that he flipped over. However if he uses ATTACK 杀 on a player that equipped EIGHT TRIGRAMS 八卦阵, Guo Jia cannot keep the judgement card for judgement of EIGHT TRIGRAMS because that card would be flipped over by the target player and not himself."
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
        description: "When you receive any damage, you can obtain 1 card (whether on-hand or equipped) from the player who is the source of the damage.",
        explanation: "In most cases, source of damage is the player who is currently in the action phase (that player's turn) that played an offensive move. This is true even if the damage was transmitted through IRON SHACKLES 铁索连环, or deflected of another character such as Xiao Qiao 小乔's \"Heavenly Scent 天香\" ability."
      },
      {
        name: "Demonic Talent 鬼才 (guǐ cái)",
        description: "After any judgement card has been flipped over, you can immediately play one of your on-hand cards to replace the judgement card.",
        explanation: "Note that Si Ma Yi cannot take back the original judgement card. Net effect is Si Ma Yi loses one on-hand card to change the judgement card."

      }
    ],
    description: "The Devil with eyes behind his head 狼顾之鬼 (láng gù zhī gǔi)"
  },
  {
    id: "5FD9D7DA-5731-4720-A362-8F8F31447E50",
    name: "Xià Hóu Dūn 夏侯惇",
    faction: "wei",
    imageUrl: "weixiahoudun.jpg",
    abilities: [
      {
        name: "An Eye for an Eye 刚烈 (gāng liè)",
        description: "Every instance you suffer damage, you can flip a judgement card. If the judgement is not the suit of \"hearts\", the source player that caused the damage can choose 1 of 2 options.\n\nOption 1: Lose 1 unit of health\n\nOption 2: Discard any 2 on-hand cards."
      }
    ],
    description: "One-eyed Demon 独眼的罗刹 (dú yǎn dè luó chà)"
  },
  {
    id: "81ED479-E63D-4742-AE6B-DFA017508047",
    name: "Xú Chǔ 许褚",
    faction: "wei",
    imageUrl: "weixuzhu.jpg",
    abilities: [
      {
        name: "Bare-Chested 裸衣 (luǒ yī)",
        description: "You can choose to draw 1 card less in your drawing phase. If you to do so, any ATTACK 杀 and DUEL 决斗 that you use in the action phase results in 1 additional unit of damage to your opponent.",
        explanation: 'Note that if Xu Chu loses the DUEL, he only needs lose 1 unit. But if he wins, the victim loses 2 units.'
      }
    ],
    description: "Insane Tiger 虎痴 (hǔ chī)"
  }
]
;
