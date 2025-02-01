import colors from 'ansi-colors'
import { SingleBar } from 'cli-progress'
import { chunk } from 'lodash'
import { getList as getCharacters, addItem as addCharacter } from './character'

async function main(): Promise<void> {
  const bar = new SingleBar({
    format: `${colors.cyan(
      '{bar}',
    )} {name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: true,
  })
  const characters = await getCharacters()

  bar.start(characters.length, 0)
  const chunks = chunk(characters, 10)
  for await (const chunk of chunks) {
    await Promise.all(
      chunk.map(async character => {
        await addCharacter(character)
        bar.increment()
      }),
    )
  }
  bar.stop()
}

main()
