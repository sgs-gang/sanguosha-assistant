import { Character } from "@/types/character";
import { describe } from "node:test";

export const wu: Character[] = [
    {
        id: "69DE9AE4-2ABC-4259-858F-9EA9FA549E6E",
        name: "Sūn Quán 孙权",
        faction: "wu",
        imageUrl: "wusunquan.jpg",
        abilities: [
          {
            name: "Balance of Power 制衡 (zhì héng)",
            description:
              "During your action phase, you can discard any number of cards (both on-hand or equipped) and draw the same number of new cards from the deck. Limited to once per turn.",
          },
          {
            name: "[Ruler ability] [Enforced ability] Rescued 救援 (jiù yuán)",
            description:
              "When you are rescued from the brink of death by other Wu characters via the use of PEACH 桃, you recover 1 additional unit of health (from zero health to two units of health).",
            enforced: true,
          },
        ],
        description:
          "Young and Virtuous Ruler 年轻的贤君 (nián qīng dè xián jūn)",
      },
  {
    id: "AFDCBF8E-6B81-496D-80BA-1A81172796EF",
    name: "Dà Qiáo 大乔",
    faction: "wu",
    imageUrl: "wudaqiao.jpg",
    abilities: [
      {
        name: "National Colours 国色 (guó sè)",
        description:
        "During your action phase, you can choose to use any card (both on-hand or equipped) with a 'diamond' suit as jail.",
      },
      {
        name: "Displacement 流离 (liú lí)",
        description:
          "Whenever you become the target of ATTACK 杀, you can discard any card and divert the ATTACK to a player within your attacking range. This player cannot be the original player that used the ATTACK card.",
      },
    ],
    description:
      "The Flower of few words 矜持之花 (jīn chí zhī huā)",
  },
  {
    id: "2F6E63D-1747-4BE7-92C9-20D610731810",
    name: "Gān Níng 甘宁",
    faction: "wu",
    imageUrl: "wuganning.jpg",
    abilities: [
      {
        name: "Surprise Raid 奇袭 (qí xí)",
        description:
        "During your action phase, you can choose to use any of your cards (both on-hand and equipped) with 'clubs' and 'spades' suit as BREAK.",
      },
    ],
    description:
      "The Pirate with Silk Sails 锦帆游侠 (jǐn fān yóu xiá)",
  },
  {
    id: "08788834-C6AF-435F-98F8-E26029575654",
    name: "Huáng Gài 黄盖",
    faction: "wu",
    imageUrl: "wuhuanggai.jpg",
    abilities: [
      {
        name: "Trojan Flesh 苦肉 (kǔ ròu)",
        description:
        "During your action phase, you can choose to lose 1 unit of health and draw 2 more cards from the deck. This ability can be used repeatedly in a turn.",
      },
    ],
    description:
      "Sacrificing the Flesh for the Country 轻身为国 (qīng shēn wèi guó)",
  },
  {
    id: "5BF12D6-7B36-423E-B2D0-7A3634226B78",
    name: "Lǚ Méng 吕蒙",
    faction: "wu",
    imageUrl: "wulumeng.jpg",
    abilities: [
      {
        name: "Self-Mastery 克己 (kè jǐ)",
        description:
        "If you did not use any ATTACK 杀 cards during your action phase, you can skip the discard phase.",
        explanation: "This means he need not discard any cards despite having more cards than he has health units. Note that the use of ATTACK outside of his turn (such as in response to BARBARIANS 南蛮入侵) does not require him to discard his cards either."
      },
    ],
    description:
      "Crossing the river in White Robes 白衣渡江 (bái yī dù jiāng)",
  },
  {
    id: "74EAF479-372D-4EF3-A27B-5D8D8AFD7B0A",
    name: "Lù Xùn 陆逊",
    faction: "wu",
    imageUrl: "wuluxun.jpg",
    abilities: [
      {
        name: "[Enforced ability] Humility 谦逊 (qiān xùn)",
        enforced: true,
        description:
        "You cannot become the target of STEAL and BLAZE.",
        explanation: "Note that this is different from those tools being 'ineffective'. Lu Xun simply cannot be targeted at all for these two tools. Therefore if you accidentally used these cards on Lu Xun, take it back into your hand and use it on someone else. Do not discard them since you are not considered to have even used them at all."
      },
      {
        name: "One after another 连营 (lián yíng)",
        description: "Whenever you lose or use your last on-hand card, you can immediately draw one card from the deck.",
        explanation: "This means Lu Xun will always have at least one card on hand at all times.)"

      },
    ],
    description:
      "The meek scholar with Valiant talents 儒生雄才 (rú shēng xióng cái)",
  },
  {
    id: "2E0F59D9-8749-491B-B935-158B894443AA",
    name: "Sūn Shàng Xiāng 孙尚香",
    faction: "wu",
    imageUrl: "wusunshangxiang.jpg",
    abilities: [
      {
        name: "Marriage 结姻 (jié yīn)",
        description:
        "During your action phase, you can choose to discard 2 on-hand cards and pick any male character that is not at full-health. By doing so, both the male character and yourself will recover 1 unit of health each. Limited to only 1 use per turn.",
      }, 
      {
        name: "Warrior Lady 枭姬 (xiāo jī)",
        description: "Whenever any equipped card is removed from your equipped items area, you can immediately draw 2 cards from the deck.",
        explanation: "2 cards can be drawn for each equipped card that is removed. This applies also to changing the equipped item (ie: replacing one weapon with another weapon)"
      }
    ],
    description:
      "The lady with bow and arrows 弓腰姬 (gōng yāo jī)",
  },
  {
    id: "9077770D-8DA5-4D6F-82AC-49938C68C30F",
    name: "Zhōu Yú 周瑜",
    faction: "wu",
    imageUrl: "wuzhouyu.jpg",
    abilities: [
      {
        name: "Dashing Hero 英姿 (yīng zī)",
        description:
        "You can draw 1 additional card during your drawing phase.",
        explanation: "This means he can draw 3 cards from the deck instead of 2 at every turn."
      }, 
      {
        name: "Sow Dissension 反间 (fǎn jiàn)",
        description: "During the action phase, you can ask any one player to guess a suit (eg: hearts, diamonds, clubs or spades). This player while then have to pick one of your  on-hand cards and show it to everyone. If the selected card has the same suit as that which the player guessed, nothing happens. If it is not the same suit, the player loses one unit of health. Regardless of the result, the player will always get to keep that card which he or she picked. Limited to one use per turn.",
      }
    ],
    description:
      "Supreme Commander-in-Chief 大都督 (dà dū dū)",
  },
  {
    id: "F26870D1-35A8-4F7D-BFB3-DBE67E593C77",
    name: "Tài Shǐ Cí 太史慈",
    faction: "wu",
    imageUrl: "wutaishici.jpg",
    abilities: [
      {
        name: "Justice of Heaven 天义 (tiān yì)",
        description:
        "During your action phase, you can conduct Points Duel 拼点 with any other character. Limited to one use per turn.",
        explanation: "If you win the Points Duel - \n1. You will have unlimited attacking ran ge \n2. You can use 1 additional ATTACK 杀 card in that turn \n3. Each ATTACK can target 1 additional character."
      },
    ],
    description:
      "Ardent and Loyal Warrior 笃烈之士 (dǔ liè zhī shì)",
  },
  {
    id: "5046D6FE-FF7E-4585-94B1-2A10C4C1E8F8",
    name: "Xiǎo Qiáo 小乔",
    faction: "wu",
    imageUrl: "wuxiaoqiao.jpg",
    abilities: [
      {
        name: "Heavenly Scent 天香 (tiān xiāng)",
        description:
        "Whenever you receive any damage, you can choose to pass the damage on to any other player by discarding an on-hand card that has a suit of 'hearts'. The victim that receives the damage gets to draw X number of cards from the deck, X being the total amount of health loss (measured from the character's maximum health level) after the deflection.",
        explanation: "Xiao Qiao is left unscathed once the damage is passed to another player. For example, Xiao Qiao receives 2 units of damage and she discards ONE on-hand card of 'hearts' suit to pass the damage on to Zhang Fei 张飞 (who currently has 2 units of health left with a maximum health of 4). Zhang Fei loses 2 units of health due to damage passed by Xiao Qiao, however he does not get to draw 4 cards (Max health = 4, subtract current health = 0, equals 4 cards to draw) until he has been rescued from the brink of death."
      },
      {
        name: "[Enforced ability] Youthful Beauty 红颜 (hóng yán)",
        enforced: true,
        description: "You will always regard all cards with a suit of 'spades' as the suit of 'hearts'.",
        explanation: "This effectively means that her 'Heavenly Scent' ability will also work if she discards a 'spade' since it is regarded as a 'heart'. This also means that LIGHTNING will NEVER strike her since she is the one that conducts the judgement for LIGHTNING and it requires 'spades' to strike. An additional bonus is that she has a stronger chance of overcoming JAIL since judgement card of 'spades' will equal to 'hearts'.",
      },
    ],
    description:
      "The Unconventional Flower 矫情之花 (jiǎo qíng zhī huā)",
  },
  {
    id: "66E091F5-84AB-4525-B09B-1440470FBC66",
    name: "Zhōu Tài 周泰",
    faction: "wu",
    imageUrl: "wuzhoutai.jpg",
    abilities: [
      {
        name: "Refuting Death 不屈 (bù qū)",
        description:
        "When your health reaches zero (brink of death), one playing card must be flipped from the deck and placed on your character card. You not considered dead at this point and the game continues. Whenever you lose an additional unit of health from here on, an additional card will be further added on top of your character card. As long as none of these cards have the same 'number' (ie: from ace to king), you will remain alive. Whenever there is a card or more placed on your character card, you will always be considered as being on the 'brink of death'.",      },
    ],
    description:
      "Body scarred like a Battle record 历战之躯 (lì zhàn zhī qū)",
  },
  {
    id: "FA3DC054-58EE-41DE-86D9-1A39C90D1836",
    name: "Sūn Jiān 孙坚",
    faction: "wu",
    imageUrl: "wusunjian.jpg",
    abilities: [
      {
        name: "Lingering Spirit 英魂 (yīng hún)",
        description: "In the beginning of every turn, you can carry out either of the options listed below if you are not at maximum health (X represents the number of units of health you have lost thus far). Pick one other player to carry out one of the following options: \n1. Draw X cards, then discard 1 card.\n2. Draw 1 card, then discard X cards.\nLimited to one use per turn.",
      },
    ],
    description:
      "Emperor of Vigorous Combat 武烈帝 (wǔ liè dì)",
  },
  {
    id: "8C793340-3799-4496-BE95-6F40EDB49D3C",
    name: "Lǔ Sù 鲁肃",
    faction: "wu",
    imageUrl: "wulusu.jpg",
    abilities: [
      {
        name: "Altruism 好施 (hào shī)",
        description:
        "In the drawing phase, you can choose to draw 2 more cards (total of 4 cards). If you have more than 5 on-hand cards as a result, you must give half of your on-hand cards (rounded down to a whole number) to the player with the least amount of on-hand cards (excluding yourself).",
      },
      {
        name: "Alliance 缔盟 (dì méng)",
        description: "During your action phase, you can choose to force 2 players (other than yourself) to exchange their entire set of on-hand cards by discarding X number of cards, X being the difference between the number of on-hand cards between these 2 players. Limited to one use per turn."
      },
    ],
    description:
      "The Maverick Diplomat 独断的外交家 (dú duàn dè wài jiāo jiā)",
  },
];
