import { Character } from "@/types/character";

export const shu: Character[] = [
  {
    id: "5A5046AE-FCB1-471B-8C16-D575359A75A0",
    name: "Liú Bèi 刘备",
    faction: "shu",
    imageUrl: "/sanguosha-assistant/characters/shualiubei.jpg",
    abilities: [
      {
        name: "Benevolence 仁德 (rén dé)",
        description:
          "You can give any amount of on-hand cards to any amount of players in his turn. If the total number of cards given away is 2 or more, you regain 1 unit of health.",
      },
      {
        name: "Rouse 激将 (jī jiàng)",
        description:
          "You can ask any Shu 蜀 character that is in play to use an ATTACK 杀 card for you.",
        ruler: true,
      },
    ],
    description:
      "The ambitious leader in tumultuous times 乱世的枭雄 (luàn shì dè xiāo xióng)",
  },
  {
    id: "5591521C-AF88-47C0-A2B7-644AF465D8C5",
    name: "Elder Zhūgě Liàng 暮年诸葛亮",
    faction: "shu",
    imageUrl: "/sanguosha-assistant/characters/shualaozhuge.jpg",
    abilities: [
      {
        name: "Star Gazing 观星 (guān xīng)",
        description:
          "At the beginning of your turn, you can view X number of cards from the top of the deck (X equals to the number of players still in play with X having maximum of 5). Of these X cards, you can choose any number of cards to place at the top or at the bottom of the pile. You can also rearrange the order of the cards.",
      },
      {
        name: "Empty City 空城 (kōng chéng)",
        description:
          "When you have no cards on hand, you cannot become the target of ATTACK 杀 or DUEL 决斗.",
        enforced: true,
      },
    ],
    description:
      "Prime minister who has passed his prime 迟暮的丞相 (chí mù dè chéng xiàng)",
  },
];
