import type { CommandInteraction } from 'discord.js'
import { Command } from '@sapphire/framework'
import { fetch } from '@sapphire/fetch'

export class OwOCommand extends Command {
  public constructor(context: Command.Context) {
    super(context, {
      name: 'testing',
      description: 'Literally just says owo.',
      chatInputCommand: {
        register: true,
        idHints: ['917169348236410910'],
      },
    })
  }

  public async chatInputRun(interaction: CommandInteraction) {
    const member = interaction.options.getMember('member', true)
    const res = await fetch<Kawaii>(
      'https://kawaii.red/api/gif/hug/token=546475331067052032.Jns9QFMJMbYuBW1KG6qd/'
    )

    await interaction.reply(`${res.response}, ${member}`)
  }
}

export interface Kawaii {
  response: string
}
