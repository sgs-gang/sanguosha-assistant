import { Character } from '@/types/character'

export const heroes: Character[] = [
  {
    id: 'E1B80610-8599-44CA-88EF-859A5A4D7697',
    name: 'Diāo Chán 貂蝉',
    faction: 'heroes',
    imageUrl: 'qundiaochan.jpg',
    abilities: [
      {
        name: 'Seed of Animosity 离间 (lí jiān)',
        description:
          'During your action phase, you can discard one card (either on-hand or equipped) and select two male characters to undergo DUEL 决斗 with each other. This ability cannot be neutralized using NEGATE 无懈可击. Limited to one use per turn. \n Note that Diao Chan must select one of the male characters to be the first to use ATTACK 杀 on the other male character. If this first character does not or is unable to use ATTACK, he will suffer 1 unit of damage and the ability ends (the other male character need not use ATTACK).',
      },
      {
        name: 'Envious Moon 闭月 (bì yuè)',
        description:
          'In the end of your turn, you can draw one additional card from the deck.',
      },
    ],
    description:
      'The Dancer with Unrivaled Beauty 绝世的舞姬 (jué shì dè wǔ jì)',
  },
]
